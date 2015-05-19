"use strict";
import AES from "crypto-js/aes";
import cryptoJsEncUtf8 from "crypto-js/enc-utf8";

module.exports = (token) => {
  if (token) {
    const decrypted = AES.decrypt(token, "Thohh3quohgh0u");
    console.log(decrypted);
    return {
      headers: {
        Accept: "application/vnd.github.moondragon.text+json",
        Authorization: `token ${decrypted.toString(cryptoJsEncUtf8)}`
      }
    };
  } else {
    return {
      headers: {
        Accept: "application/vnd.github.moondragon.text+json"
      }
    };
  }
};
