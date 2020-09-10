import { cleanEnv, str } from 'envalid';

export default function validateEnv() {
  cleanEnv(process.env, { MONGODB_URI: str() });
}
