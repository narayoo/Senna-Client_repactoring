export function isId(value) {
  const rE = /^[0-9a-z]+$/;
  return rE.test(value);
}
export function isPassword(value) {
  const rE = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,10}$/;
  return rE.test(value);
}