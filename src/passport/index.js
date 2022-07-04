import passport from 'passport';
import {local, jwt} from './strategies';

export default () => {
  // local strategy 사용
  passport.use(local);
  passport.use(jwt);
};
