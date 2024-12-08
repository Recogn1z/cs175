export interface AuthUser {
  username: string;
  isLoggedIn: boolean;
}

export const auth = {
  register(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
      return false;
    }
    users[username] = { password };
    localStorage.setItem('users', JSON.stringify(users));
    this.login(username, password);
    return true;
  },

  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]?.password === password) {
      localStorage.setItem('currentUser', JSON.stringify({ username, isLoggedIn: true }));
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser(): AuthUser | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
};