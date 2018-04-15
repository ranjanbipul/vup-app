import * as UserActions from './user';
import * as ListAction from './lists';

export const ActionCreators = Object.assign({},
  UserActions,
  ListAction,
);
