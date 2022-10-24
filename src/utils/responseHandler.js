function responseHandler(response) {
  if (response.ok) {
    return response.json();
  } else if (response.status < 400) {
    throw new Error(`${response.status} / Redirects 에러가 발생했습니다.`);
  } else if (response.status < 500) {
    throw new Error(`${response.status} / Client쪽에서 에러가 발생했습니다.`);
  } else if (response.status < 600) {
    throw new Error(`${response.status} / Server쪽에서 에러가 발생했습니다.`);
  }
}
