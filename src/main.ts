import express, { json } from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://healz-checkin-front.vercel.app',
  methods: ['POST', 'GET'],
}));
app.use(json());

const spreadsheetId = process.env.SPREADSHEET_ID;
if (!spreadsheetId) {
  console.error('🚨 SPREADSHEET_ID não está definido no .env');
  process.exit(1);
}

async function getSheetsService() {
  // Autenticação automática via variável GOOGLE_APPLICATION_CREDENTIALS
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

app.get('/fetch-user', (req: Request, res: Response) => {
  const token = req.query.token;

  if (token === 'abc123') {
    return res.json({
      name: 'Maria Teste',
      cpf: '12345678900',
      birthDate: '1990-01-01',
      phoneNumber: '11999999999',
      zipCode: '12345678',
      street: 'Rua Fictícia',
      complement: 'apto 5',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
    });
  }

  res.status(404).json({ error: 'Token inválido' });
});

app.post('/api/send-form', async (req, res) => {
  console.log('📨 POST /send-form received');
  console.log('📦 Body:', req.body);

  const {
    name,
    cpf,
    birthDate,
    phoneNumber,
    zipCode,
    street,
    complement,
    number,
    city,
    state,
  } = req.body;

  try {
    const sheets = await getSheetsService();
    console.log('📄 Sheets service ready');

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:J',
      valueInputOption: 'RAW',
      requestBody: {
        values: [
          [
            name,
            cpf,
            birthDate,
            phoneNumber,
            zipCode,
            street,
            complement,
            number,
            city,
            state,
          ],
        ],
      },
    });

    res.status(200).json({ message: 'Dados salvos com sucesso!' });
  } catch (err: unknown) {
    console.error('❌ Erro no envio:', err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao enviar os dados.' });
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));


