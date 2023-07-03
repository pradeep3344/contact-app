class ContactInfo {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
  
    static newContactInfo(type, value) {
      if (typeof value !== "number") {
        throw new Error("ContactInfo value must be a number");
      }
  
      return new ContactInfo(type, value);
    }
  }
  
  module.exports = ContactInfo;
  