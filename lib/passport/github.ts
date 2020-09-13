import { Strategy as GithubStrategy } from 'passport-github';
import { SuperGrid9kUser } from '../../models/User';
import appConfig from '../appConfig';
export interface GithubJsonObject {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username?: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
export interface GithubSession {
  _json: GithubJsonObject;
}
// STATICALLY configure the Github strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Github API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be exposed in the request as `req.user`
// in api handlers after authentication.
const strategy = new GithubStrategy(appConfig.github, (accessToken, refreshToken, githubProfile, cb) => {
  // Right now, the user's Github profile is supplied as the user
  // record. In a production-quality application, the Github profile should
  // be associated with an app-specific user record in app persistence,
  // which allows for account linking and authentication with other identity providers.

  // Upsert user here
  console.log(accessToken, refreshToken, githubProfile);

  // see https://github.com/jaredhanson/passport-github/blob/master/lib/strategy.js#L40
  // see https://gitlab.com/andycunn/canvass/blob/f3f03859b3de66f30d7703a4c5d2f44f7c724f67/api/app.js#L118
  // for an example
  cb(null, githubProfile);
});

export default strategy;

export function githubSessionToUserObj(session?: GithubJsonObject): SuperGrid9kUser {
  if (!session) return;

  return {
    _id: String(session.id),
    username: session.login,
    email: session.email,
    tbn: session.avatar_url,
    bio: session.bio,
  };
}
