///////////////////////////////////////////////////////////////////////////////
//       This file provides methods to interact directly with the
//       users 'database' and localStorage.
///////////////////////////////////////////////////////////////////////////////

class UserRepository {
  constructor() {
    this.USERS_KEY = "users";
    this.CURRENT_USER_KEY = "USER";
  }

  // Initialises users only if it doesn't exist in localStorage already
  initUsers() {
    if (localStorage.getItem(this.USERS_KEY) === null) {
      this.updateUsers([]);
    }
  }

  // Retrieves desired user via the account name
  /**
   *
   * @param {*} account
   * @returns {user} if user found,
   * @returns {string} empty string if no account
   */
  searchUser(account) {
    const users = this.getAllUsers();

    for (const user of users) {
      const accountFound =
        user.email === account.email || user.username === account.username;
      if (accountFound) {
        return user;
      }
    }
    return "";
  }

  // Adds new user to user 'database'
  addUser(account) {
    const users = this.getAllUsers();

    users.push(account);
    this.updateUsers(users);
  }

  // Deletes desired user via the account name
  deleteUser(account) {
    const users = this.getAllUsers();
    const filteredUsers = users.filter(
      (user) => user.username !== account.username
    );
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.updateUsers(filteredUsers);
  }

  // Modifies current user details and user 'database' with changed user
  // information
  modifyUser(modify) {
    const users = this.getAllUsers();

    for (const user of users) {
      const accountFound = user.username === modify.username;

      if (accountFound) {
        user.username = modify.newName;
        user.email = modify.email;
        user.headline = modify.headline;
        user.bio = modify.bio;
        user.interests = modify.interests;

        this.updateUsers(users);
        this.setCurrentSession(user);
        return;
      }
    }
  }

  // Set current user into localStorage
  setCurrentSession(account) {
    const currentUser = this.searchUser(account);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(currentUser));
  }

  // Retrieves current user from localStorage
  getCurrentUser() {
    return localStorage.getItem(this.CURRENT_USER_KEY);
  }

  // Helper method that retrieves user 'database'
  getAllUsers() {
    return JSON.parse(localStorage.getItem(this.USERS_KEY));
  }

  // Updates entire user 'database'
  // Should pass in the whole 'database' with any changes done to it and not
  // just a single user
  updateUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }
}

export default UserRepository;
