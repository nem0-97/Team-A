/**Login */
const bcrypt = require('bcrypt')

//Hash a string passed in
exports.hashPass = function (pass){
    return bcrypt.hashSync(pass, 10);// 10 rounds
}

//Check if a string matches the hash passed in with it
exports.passIsHash = function(pass, hash){
    return bcrypt.compareSync(pass,hash);
}