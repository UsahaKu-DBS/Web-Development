export const isAuthenticated = () => {
  return !!localStorage.getItem('user'); // cek apakah user tersimpan
};
