export const getLocalStorageToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const setLocalStorageToken = (token: string) => {
  localStorage.setItem("token", token);
};
