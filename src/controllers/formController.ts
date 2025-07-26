import type { Request, Response } from 'express';
import { appendToSheet } from '../services/sheetsService.js';

export async function handleFormSubmit(req: Request, res: Response) {
  const {
    name, cpf, birthDate, phoneNumber,
    zipCode, street, complement, number,
    city, state,
  } = req.body;

  try {
    // Note que o appendToSheet espera um array de arrays (linhas)
    await appendToSheet([[
      name, cpf, birthDate, phoneNumber,
      zipCode, street, complement, number,
      city, state,
    ]]);

    res.status(200).json({ message: 'Dados salvos com sucesso!' });
  } catch (error) {
    console.error('❌ Erro no envio:', error);
    res.status(500).json({ error: 'Erro ao salvar os dados.' });
  }
}
