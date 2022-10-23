async function responseHandler(response) {
  if (response.ok) {
    return await response.json();
  }

  if (String(response.status)[0] === "4") {
    throw new Error(`${response.status} / Client쪽에서 에러가 발생했습니다.`);
  }

  if (String(response.status)[0] === "5") {
    throw new Error(`${response.status} / Server쪽에서 에러가 발생했습니다.`);
  }
}
