function adminRequired(req, res, next) {
  if (req.user.role !== 'admin') {
    console.log('관리자 계정으로 로그인해주세요.');
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '관리자만 사용할 수 있는 서비스입니다.',
    });
    return;
  }
  next();
}

export {adminRequired};
