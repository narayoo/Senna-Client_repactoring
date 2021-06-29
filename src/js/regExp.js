export function isId(value) {
  const rE = /^[0-9a-z]+$/;
  return rE.test(value); // 형식에 맞는 경우 true 리턴
}
export function isPassword(value) {
  const rE = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,10}$/; //  6 ~ 10자 영문, 숫자 조합
  return rE.test(value); // 형식에 맞는 경우 true 리턴
}