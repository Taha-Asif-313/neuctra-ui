// api/generate.js (or serverless entry point)
import express from "express";
import cors from "cors";
import "dotenv/config";

import uiRoutes from "./routes/uiRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// API Route
app.use("/api/ui", uiRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

const port = Number(process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`neuctra-ui-api listening on http://localhost:${port}`);
});