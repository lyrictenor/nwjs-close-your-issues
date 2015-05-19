"use strict";
import AES from "crypto-js/aes";
import cryptoJsEncUtf8 from "crypto-js/enc-utf8";

module.exports = (value, phrase) => {
  if(!value) {
    return value;
  }
  return AES.decrypt(value, phrase).toString(cryptoJsEncUtf8);
};
