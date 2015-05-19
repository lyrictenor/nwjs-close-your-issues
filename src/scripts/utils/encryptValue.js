"use strict";
import AES from "crypto-js/aes";
module.exports = (value, phrase) => {
  if(!value) {
    return value;
  }
  return AES.encrypt(value, phrase).toString();
};
