import * as dotenv from 'dotenv';

dotenv.config();

export const spreadsheetId = process.env.SPREADSHEET_ID;

if (!spreadsheetId) {
  console.error("🚨 SPREADSHEET_ID não está definido no .env");
  process.exit(1);
}
