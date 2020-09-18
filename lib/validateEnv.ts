import { cleanEnv, str } from 'envalid';

export default function validateEnv() {
  cleanEnv(process.env, {
    MONGO_URL: str(),
  });
}
