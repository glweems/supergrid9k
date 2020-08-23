import 'dotenv/config';
import 'colors';
import App from './app';
import validateEnv from './utils/validateEnv';
import Routes from './routes';

validateEnv();

const app = new App(Routes);

app.listen();
