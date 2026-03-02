import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Route API pour le ChatBot (Sécurisée)
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "Clé API manquante sur le serveur." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: "user", parts: [{ text: req.body.systemInstruction || "" }] },
          ...history,
          { role: "user", parts: [{ text: message }] }
        ],
      });

      const response = await model;
      res.json({ text: response.text });
    } catch (error) {
      console.error("Erreur Backend AI:", error);
      res.status(500).json({ error: "Erreur lors de la génération de la réponse." });
    }
  });

  // Middleware Vite pour le développement
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // En production, servir les fichiers statiques
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur Sanofi Hub prêt sur http://localhost:${PORT}`);
  });

  return app;
}

const appPromise = startServer();
export default appPromise;
