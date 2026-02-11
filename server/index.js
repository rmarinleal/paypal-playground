import "./config/env.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import paypalRoutes from "./routes/paypal.routes.js";
import braintreeRoutes from "./routes/braintree.routes.js";
import adyenRoutes from "./routes/adyen.routes.js";
import vaultRoutes from "./routes/vault.routes.js";

const app = express();
const port = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", paypalRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", adyenRoutes);
app.use("/api", vaultRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "..", "client", "dist");

app.use(express.static(clientDistPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

