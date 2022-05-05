const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const encrypt = (password) => {
  let bcPassword = bcrypt.hashSync(password, salt);
  return bcPassword;
};

const decrypt = (password, bcPassword) => {
  let compare = bcrypt.compareSync(password, bcPassword);
  return compare;
};

module.exports = {
  encrypt,
  decrypt,
};
