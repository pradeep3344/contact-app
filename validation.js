class Validation {
    static checkString(str) {
      if (typeof str !== "string" || str.trim() === "") {
        throw new Error("Invalid string input");
      }
    }
  
    static checkNumber(num) {
      if (typeof num !== "number") {
        throw new Error("Invalid number input");
      }
    }
  }
  
  module.exports = Validation;
  