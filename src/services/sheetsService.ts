import { google } from 'googleapis';
import { loadCredentials } from '../utils/loadCredentials.js';
import { spreadsheetId } from '../config/google.js';

export async function appendToSheet(values: any[][]) {
  const credentials = loadCredentials();

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key.replace(/\\n/g, "\n"),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  await auth.authorize();

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'A:J',
    valueInputOption: 'RAW',
    requestBody: {
      values,
    },
  });
}
