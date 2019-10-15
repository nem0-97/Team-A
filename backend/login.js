/**Login */
const bcrypt = require('bcrypt')

exports.hashPass = function (pass){
    return bcrypt.hashSync(pass, 10);// 10 rounds
}

exports.passIsHash = function(pass, hash){
    return bcrypt.compareSync(pass,hash);//works but w have not starteed hashing passwords before putting theem into thee database yet
}