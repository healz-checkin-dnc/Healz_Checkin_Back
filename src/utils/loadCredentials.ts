import { readFileSync } from "fs";
import { join } from "path";

export interface GoogleCredentials {
  client_email: string;
  private_key: string;
}

export function loadCredentials(): GoogleCredentials {
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    try {
      return JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    } catch {
      throw new Error("Variável GOOGLE_CREDENTIALS_JSON está mal formatada");
    }
  }

  try {
    const path = join(process.cwd(), "credentials.json");
    const file = readFileSync(path, "utf8");
    return JSON.parse(file);
  } catch {
    throw new Error("Credenciais Google não encontradas");
  }
}
