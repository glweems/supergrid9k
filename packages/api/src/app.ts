import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as Passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import User from './models/users.model';
import { connectionOptions, connectionUri } from './utils/connection';
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

Passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:5000/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ githubId: profile.id }, function (err: any, user: any) {
        return cb(err, user);
      });
    }
  )
);

export interface AppProps {
  Routes: Routes[];
  listeningMsg?: string;
}
class App {
  public app: express.Application;

  public port: string | number;

  public env: boolean;

  constructor({ Routes: routes }: AppProps) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV === 'production';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger('combined'));
      this.app.use(cors({ origin: '*', credentials: true }));
    } else {
      this.app.use(logger('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(Passport.initialize());
    this.app.use(Passport.session());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private async connectToDatabase() {
    return mongoose.connect(connectionUri, connectionOptions);
  }
}

export default App;
