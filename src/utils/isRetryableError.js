const isRetryableError = (err) => {
  if (!err) {
    return false;
  }
  const isAxiosError = !!err?.isAxiosError;
  if (isAxiosError) {
    if (err.code === 'ERR_CANCELED') {
      return false;
    }
    if (!err.response) {
      return true;
    }
    const status = Number(err.response.status);
    return Number.isFinite(status) && status >= 500;
  }
  return false;
};

export default isRetryableError;
