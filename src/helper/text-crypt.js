const CryptoJS = require('crypto-js');

export const encryptWithAES = (text, passphrase) => {
    return text.length === 44 ? text : CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decryptWithAES = (ciphertext, passphrase) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return ciphertext.length !== 44 ? ciphertext : originalText;
};

export const encryptListWithAES = (textArray = [], passphrase) => {
    return textArray.map(text => encryptWithAES(text, passphrase));
}
export const decryptListWithAES = (textArray = [], passphrase) => {
    return textArray.map(ciphertext => decryptWithAES(ciphertext, passphrase));
}