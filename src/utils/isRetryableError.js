const isRetryableError = (err) => {
  if (!err) {
    return false;
  }
  const isAxiosError = !!err?.isAxiosError;
  if (isAxiosError) {
    // 요청 취소는 재시도 대상이 X
    if (err.code === 'ERR_CANCELED') {
      return false;
    }
    // 응답이 없으면(네트워크/타임아웃 등) 재시도 대상 O
    if (!err.response) {
      return true;
    }
    // 서버 오류(5xx)는 재시도 대상으로 O
    const status = Number(err.response.status);
    return Number.isFinite(status) && status >= 500;
  }
  return false;
};

export default isRetryableError;
