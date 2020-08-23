import IndexRoute from './index.route';
import UsersRoute from './users.route';
import AuthRoute from './auth.route';
import GridRoute from './grid.route';

const Routes = [new IndexRoute(), new UsersRoute(), new AuthRoute(), new GridRoute()];

export default Routes;
