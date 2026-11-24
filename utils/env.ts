import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  baseURL: process.env.BASE_URL || 'https://magang.dikahadir.com/absen/login',
  baseOrigin: (process.env.BASE_URL || 'https://magang.dikahadir.com').replace(/\/absen\/login\/?$/, ''),
  pkwt: {
    email: process.env.PKWT_EMAIL || '',
    password: process.env.PKWT_PASSWORD || '',
  },
  mitra: {
    email: process.env.MITRA_EMAIL || '',
    password: process.env.MITRA_PASSWORD || '',
  },
};
