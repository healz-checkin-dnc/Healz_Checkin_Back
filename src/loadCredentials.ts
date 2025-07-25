import { readFileSync } from "fs";
import { join } from "path";

export function loadCredentials() {
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    return JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
  }

  try {
    const path = join(process.cwd(), "credentials.json");
    const file = readFileSync(path, "utf8");
    return JSON.parse(file);
  } catch {
    throw new Error("Credenciais Google não encontradas");
  }
}
