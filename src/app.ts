import express from "express";
import path from "path";
import fs from "fs";
import { connectDb } from "./db/connection";
import { errorHandler } from "./helpers/errorHandler";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";
import userTypeRoutes from "./routes/userType.routes";
import stockRoutes from "./routes/stock.routes";
import paymentRoutes from "./routes/payment.routes";
import paymentTypeRoutes from "./routes/paymentType.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import favoriteRoutes from "./routes/favorite.routes";
import 'dotenv/config';

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/", (_req, res) => {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  const htmlPath = path.join(process.cwd(), "src", "views", "index.html");
  const template = fs.readFileSync(htmlPath, "utf8");
  const html = template.replace("{{PORT}}", String(port));
  res.type("html").send(html);
});

// Docs: http://localhost:<port>/docs/v1
const docsPath = path.join(process.cwd(), "docs");
app.use("/docs/v1", express.static(docsPath));

// API routes: /api/v1
app.use("/api/v1", authRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", userTypeRoutes);
app.use("/api/v1", stockRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", paymentTypeRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", favoriteRoutes);

app.use(errorHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });

export default app;
