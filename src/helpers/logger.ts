import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "src", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const errorLogPath = path.join(logDir, "error.log");

export function logError(message: string): void {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(errorLogPath, line, { encoding: "utf8" });
}
