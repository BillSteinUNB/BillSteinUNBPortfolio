const STORAGE_KEY = 'gr_tracksense_auth';

export const authService = {
  login: (email: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, token: 'mock-jwt-token' }));
        resolve(true);
      }, 1500); // Simulate API delay
    });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEY);
  },

  getUser: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
};