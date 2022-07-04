import {Strategy} from 'passport-jwt';
import {userModel} from '../../db';

const headerExtractor = (req) => {
  // req 의 cookies 에서 token 사용하기
  const token = req.headers['authorization']?.split(' ')[1];
  return token;
};

const opts = {
  secretOrKey: process.env.JWT_SECRET_KEY, // ./utils/jwt 의 secret 사용하기
  jwtFromRequest: headerExtractor,
};

const jwt = new Strategy(opts, async (user, done) => {
  const findUser = await userModel.findById(user.userId);
  try {
    if (findUser) {
      done(null, {
        userId: findUser._id,
        role: findUser.role,
      });
      return;
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
});

export {jwt};

