const CryptoJS = require('crypto-js');

export const encryptWithAES = (text, passphrase) => {
    return text.length === 44 ? text : CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decryptWithAES = (ciphertext, passphrase) => {
    if (ciphertext.length !== 44)
        return ciphertext;
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

export const encryptListWithAES = (textArray = [], passphrase) => {
    return textArray.map(text => encryptWithAES(text, passphrase));
}
export const decryptListWithAES = (textArray = [], passphrase) => {
    return textArray.map(ciphertext => decryptWithAES(ciphertext, passphrase));
}

export const encryptPhraseFromPayload = (payload) => {
    const result = JSON.parse(JSON.stringify(payload))
    if (payload?.phrase?.length > 0) {
        result.phrase = encryptListWithAES(result.phrase, payload.password)
    }
    return result;
}

export const decryptPhraseFromPayload = (payload) => {
    const result = JSON.parse(JSON.stringify(payload))
    if (payload?.phrase?.length > 0) {
        result.phrase = decryptListWithAES(result.phrase, payload.password)
    }
    return result;
}