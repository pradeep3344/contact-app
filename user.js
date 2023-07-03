const Contact = require("./contact");
const Validation = require("./validation");

class User {
  static allUser = [];

  constructor(name, username, isAdmin) {
    this.name = name;
    this.username = username;
    this.isAdmin = isAdmin;
    this.isStaff = !isAdmin;
    this.contacts = [];
  }

  static findUser(username) {
    Validation.checkString(username);

    for (let index = 0; index < User.allUser.length; index++) {
      if (User.allUser[index].username === username) {
        return [true, index];
      }
    }
    return [false, -1];
  }

  static newAdmin(name, username) {
    Validation.checkString(name);
    Validation.checkString(username);

    let [isUserExist, indexOfUserFound] = User.findUser(username);
    if (isUserExist) {
      throw new Error("Username Already Exists");
    }

    const admin = new User(name, username, true);
    User.allUser.push(admin);
    return admin;
  }

  newUser(name, username) {
    Validation.checkString(name);
    Validation.checkString(username);

    if (!this.isAdmin) {
      throw new Error("Unauthorized");
    }

    let [isUserExist, indexOfUserFound] = User.findUser(username);
    if (isUserExist) {
      throw new Error("Username Already Exists");
    }

    const user = new User(name, username, false);
    User.allUser.push(user);
    return user;
  }

  getAllUser() {
    if (!this.isAdmin) {
      throw new Error("Unauthorized");
    }
    return User.allUser;
  }

  updateUser(username, parameter, newValue) {
    Validation.checkString(username);
    Validation.checkString(parameter);
    Validation.checkString(newValue);

    if (!this.isAdmin) {
      throw new Error("Unauthorized");
    }

    let [isUserExist, indexOfUserFound] = User.findUser(username);
    if (!isUserExist) {
      throw new Error("Username Does Not Exist");
    }

    switch (parameter) {
      case "name":
        User.allUser[indexOfUserFound].updateName(newValue);
        break;
      case "username":
        User.allUser[indexOfUserFound].updateUsername(newValue);
        break;
      default:
        throw new Error("Invalid Parameter");
    }
  }

  updateName(newName) {
    Validation.checkString(newName);
    this.name = newName;
  }

  updateUsername(newUsername) {
    Validation.checkString(newUsername);

    let [isUserExist, indexOfUserFound] = User.findUser(newUsername);
    if (isUserExist) {
      throw new Error("Username Already Exists");
    }

    this.username = newUsername;
  }

  deleteUser(username) {
    Validation.checkString(username);

    if (!this.isAdmin) {
      throw new Error("Unauthorized");
    }

    let [isUserExist, indexOfUserFound] = User.findUser(username);
    if (!isUserExist) {
      throw new Error("Username Does Not Exist");
    }

    User.allUser.splice(indexOfUserFound, 1);
  }

  // Contacts
  getContact(cName) {
    for (let index = 0; index < this.contacts.length; index++) {
      if (this.contacts[index].cName === cName) {
        return this.contacts[index];
      }
    }
    throw new Error(`${cName} is not a contact of ${this.name}`);
  }

  findContact(cName) {
    for (let index = 0; index < this.contacts.length; index++) {
      if (this.contacts[index].cName === cName) {
        return [true, index];
      }
    }
    return [false, -1];
  }

  newContact(cName) {
    Validation.checkString(cName);

    if (this.isAdmin) {
      throw new Error("Admin Cannot Create Contacts");
    }

    let [isContactExist, indexOfContact] = this.findContact(cName);
    if (isContactExist) {
      throw new Error("Contact Already Exists");
    }

    const newContact = Contact.newContact(cName);
    this.contacts.push(newContact);
    return newContact;
  }

  updateContact(cName, newContactName) {
    Validation.checkString(cName);
    Validation.checkString(newContactName);

    if (this.isAdmin) {
      throw new Error("Admin Cannot Update Contacts");
    }

    let [isContactExist, indexOfContact] = this.findContact(cName);
    if (!isContactExist) {
      throw new Error("Contact Does Not Exist");
    }

    this.contacts[indexOfContact].cName = newContactName;
  }

  deleteContact(cName) {
    Validation.checkString(cName);
    if (this.isAdmin) {
      throw new Error("Admin Cannot Delete Contacts");
    }

    let [isContactExist, indexOfContact] = this.findContact(cName);
    if (!isContactExist) {
      throw new Error("Contact Does Not Exist");
    }

    this.contacts.splice(indexOfContact, 1);
  }
}

module.exports = User;
