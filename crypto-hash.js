const crypto=require('crypto');
const cryptoHash=(...inputs)=>{
    const hash =crypto.createHash('sha256');    
    hash.update(inputs.sort().join('-'));
    const hashValue=hash.digest('hex');
    return hashValue;
}

module.exports= cryptoHash;