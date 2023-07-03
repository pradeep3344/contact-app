const ContactInfo = require("./contactInfo");
const Validation = require("./validation");

class Contact {
  constructor(cName) {
    this.cName = cName;
    this.contactInfos = [];
  }

  static newContact(cName) {
    Validation.checkString(cName);
    return new Contact(cName);
  }

  getContactInfo(type) {
    let infos = this.contactInfos;

    for (let index = 0; index < infos.length; index++) {
      if (infos[index].type === type) {
        return [true, index];
      }
    }
    return [false, -1];
  }

  addContactInfo(type, value) {
    Validation.checkString(type);
    Validation.checkNumber(value);

    let [isContactTypeExist, indexOfContactType] = this.getContactInfo(type);
    if (isContactTypeExist) {
      throw new Error(`${type} ContactType Already Exists`);
    }

    const newInfo = ContactInfo.newContactInfo(type, value);
    this.contactInfos.push(newInfo);
  }

  deleteContactInfo(type) {
    Validation.checkString(type);

    let [isContactTypeExist, indexOfContactType] = this.getContactInfo(type);
    if (!isContactTypeExist) {
      throw new Error(`${type} ContactType Does Not Exist`);
    }

    this.contactInfos.splice(indexOfContactType, 1);
  }

  updateContactInfo(type, value) {
    Validation.checkNumber(value);
    Validation.checkString(type);

    let [isContactTypeExist, indexOfContactType] = this.getContactInfo(type);
    if (!isContactTypeExist) {
      throw new Error(`${type} ContactType Does Not Exist`);
    }

    this.contactInfos[indexOfContactType].value = value;
  }

  getAllContactInfos() {
    return this.contactInfos;
  }

  deleteAllContactInfo() {
    this.contactInfos = [];
  }
}

module.exports = Contact;
