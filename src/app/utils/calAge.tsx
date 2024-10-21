const calAge = (date: Date): number => {
  const today = new Date();
  const birthYear = date.getFullYear();
  const birthMonth = date.getMonth();
  const birthDay = date.getDay();

  let age = today.getFullYear() - birthYear;

  if (
    today.getMonth() < birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() < birthDay)
  ) {
    age -= 1;
  }
  return age;
};
export default calAge;
