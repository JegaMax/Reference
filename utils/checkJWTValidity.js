const checkJWTValidity = () => {
  const accessToken = localStorage.getItem('accessToken');
  const iat = localStorage.getItem('iat');
  const exp = localStorage.getItem('exp');

  if (accessToken && exp && iat) {
    const today = new Date().getTime();
    const expiresAt = parseInt(exp) * 1000;

    if (expiresAt > today) {
      return { accessToken, iat: Number(iat), exp: Number(exp) };
    }
  }

  return false;
};

export default checkJWTValidity;
