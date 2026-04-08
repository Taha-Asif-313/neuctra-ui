import { createAgent } from "../lib/agent.js";

// controllers/uiController.js
let agent;

export const generateUI = async (req, res) => {
  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    if (!agent) {
      agent = await createAgent();
    }

    const result = await agent.call({
      input: prompt,
    });

    res.json({
      code: result.output,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error:
        err?.message ||
        "Something went wrong while generating UI. Check API configuration.",
    });
  }
};