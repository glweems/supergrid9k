import { cleanEnv, port, str } from 'envalid';

export default function validateEnv() {
  return cleanEnv(process.env, {
    API_URL: str(),
    MONGODB_URI: str(),
  });
}
