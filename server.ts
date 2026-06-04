/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Lazy-initialize Gemini client to avoid crashing if GEMINI_API_KEY is not ready
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      throw new Error('GEMINI_API_KEY environment variable is missing or has placeholder value');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// REST API for Brainstorming & Mind Mapping
app.post('/api/brainstorm', async (req, res) => {
  try {
    const { action, nodeTitle, nodeContent, contextNodes } = req.body;

    if (!nodeTitle) {
       res.status(400).json({ success: false, error: 'Target node title is required.' });
       return;
    }

    const ai = getGeminiClient();
    const systemInstruction = 
      "You are an elite cognitive brainstorming partner and structured mind-mapping co-creator. " +
      "Your aim is to flesh out complex diagrams, design software workflows, prompt rich writing outlines, " +
      "and expand abstract thoughts into actionable, clearly labeled branches. " +
      "Provide high-depth, creative, and strictly logical contributions.";

    let contextString = '';
    if (contextNodes && contextNodes.length > 0) {
      contextString = `Here is the surrounding context map nodes:\n` +
        contextNodes.map((n: any) => `- [${n.type.toUpperCase()}] "${n.title}": ${n.content || ''}`).join('\n');
    }

    if (action === 'expand' || action === 'questions') {
      // Structured JSON expansion
      const responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { 
              type: Type.STRING, 
              description: 'A punchy, creative title of the branch or child concept (2-5 words).' 
            },
            description: { 
              type: Type.STRING, 
              description: 'A 1-2 sentence detailed explanation, specification, or answer representing this node.' 
            },
            type: { 
              type: Type.STRING, 
              description: "Categorization. Must be one of: 'concept', 'question', 'task', 'insight'." 
            },
            label: { 
              type: Type.STRING, 
              description: "A 1-3 word relationship description describing the link from the parent to this new node (e.g. 'Part of', 'Solves', 'Requires', 'Contradicts')." 
            }
          },
          required: ['title', 'description', 'type', 'label']
        }
      };

      let prompt = '';
      if (action === 'expand') {
        prompt = `Flesh out the node titled "${nodeTitle}" (Description/Details: "${nodeContent || 'No description provided'}") into 3 to 4 related subnodes or logical child concept branches.\n${contextString}`;
      } else {
        prompt = `Generate 3 to 4 deep, provocative, and highly analytical questions related directly to the node titled "${nodeTitle}" (Description/Details: "${nodeContent || 'No description provided'}"). These questions will hook onto the parent mind map node.\n${contextString}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema,
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Empthy response returned from Gemini API');
      }

      const subNodes = JSON.parse(responseText.trim());
      res.json({ success: true, subNodes });
    } else {
      // Markdown generation instructions
      let prompt = '';
      if (action === 'details') {
        prompt = `Write a comprehensive, premium, markdown-formatted technical description or detailed summary of the concept "${nodeTitle}" (Short Context: "${nodeContent || 'No description'}") which the user can read in a side panel. Avoid generic filler. Direct, structured paragraphs with bullet points.\n${contextString}`;
      } else if (action === 'alternatives') {
        prompt = `Brainstorm a list of creative alternatives, opposing counter-narratives, and divergent points of view related to "${nodeTitle}" (Context: "${nodeContent || 'No description'}"). Format in markdown with bold headers.\n${contextString}`;
      } else if (action === 'summarize') {
        prompt = `Synthesize all the surrounding nodes connected to "${nodeTitle}" (Context: "${nodeContent || 'No description'}") into a cohesive markdown report. Extract core themes, find actionable next steps, and build a unified synopsis.\n${contextString}`;
      } else {
        res.status(400).json({ success: false, error: `Unsupported action type: ${action}` });
        return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: { systemInstruction }
      });

      res.json({ success: true, text: response.text });
    }
  } catch (error: any) {
    console.error('Gemini proxy error:', error);
    res.status(500).json({ success: false, error: error.message || 'An error occurred during call execution' });
  }
});

const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Development mode with Vite dev server as middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-Stack dev server online at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Encountered crash starting server:', err);
  process.exit(1);
});
