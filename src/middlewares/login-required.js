import passport from 'passport';

function loginRequired(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers['authorization']?.split(' ')[1];
  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!userToken || userToken === 'null') {
    console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });

    return;
  }

  return passport.authenticate('jwt', {session: false}, function(err, user, info) {
    if (err || user === false) {
      return res.status(403).json({
        result: 'forbidden-approach',
        reason: '정상적인 토큰이 아닙니다.',
      });
    }

    req.user = user;
    next();
  })(req, res, next);
}

export {loginRequired};
