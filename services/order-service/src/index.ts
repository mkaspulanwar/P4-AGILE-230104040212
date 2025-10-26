import express, { type ErrorRequestHandler } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import {
  httpLogger,
  correlationId,
  requireBearer,
  validate,
  CreateOrderSchema,
  errorHandler,
} from '../../../utils';
import { randomUUID } from 'node:crypto';

const orders: any[] = []; // <--- TAMBAHKAN BARIS INI
const app = express();

/** 1) Correlation ID dulu (agar walau JSON rusak) */
app.use(correlationId);

/** 2) Security headers + structured logging */
app.use(helmet());
app.use(httpLogger);

/** 3) JSON parser + handler khusus parse error (500 -> 400 BAD_JSON) */
app.use(express.json({ limit: '100kb' }));
const jsonParseErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  // Cek apakah error merupakan SyntaxError atau memiliki status 400
  // SyntaxError adalah tipe error yang paling umum dilempar oleh body-parser saat JSON rusak.
  if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
      return res.status(400).json({ message: 'Invalid JSON', code: 'BAD_JSON' });
  }

  // Cek kondisi lama (sebagai fallback/jika properti err.type masih ada)
  if (err?.type === 'entity.parse.failed' || err?.status === 400) {
      return res.status(400).json({ message: 'Invalid JSON', code: 'BAD_JSON' });
  }
  
  return next(err);
};
app.use(jsonParseErrorHandler);

/** 4) Auth + Rate limit */
app.use(requireBearer);
app.use(rateLimit({ windowMs: 60000, max: 60, standardHeaders: true, legacyHeaders: false }));

/** 5) Routes */
const routes: any[] = [];
// ... (Bagian routes akan dilanjutkan di baris berikutnya, tetapi tidak ada di gambar ini)
app.post('/orders', validate(CreateOrderSchema), (req, res) => {
  const { productId, quantity } = (req as any).validated;
  const order = { id: randomUUID(), productId, quantity, createdAt: new Date().toISOString() };
  orders.push(order);
  res.status(201).json(order);
});

/** 6) Error handler terakhir */
app.use(errorHandler);

export default app;