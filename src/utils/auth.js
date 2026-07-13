export const saveAdmin = (token, user) => {
  localStorage.setItem("adminToken", token);
  localStorage.setItem("adminUser", JSON.stringify(user));
};

export const getAdmin = () => {
  return JSON.parse(localStorage.getItem("adminUser") || "{}");
};

export const getToken = () => {
  return localStorage.getItem("adminToken");
};

export const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
};