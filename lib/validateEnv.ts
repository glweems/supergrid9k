import { cleanEnv, str } from 'envalid';

export default function validateEnv() {
  cleanEnv(process.env, {
    MONGODB_URI: str(),
    GITHUB_CLIENT_ID: str(),
    GITHUB_CLIENT_SECRET: str(),
  });
}
