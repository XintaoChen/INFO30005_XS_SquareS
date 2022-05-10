const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const encrypt = (password) => {
  let bcPassword = bcrypt.hashSync(password, salt);
  return bcPassword;
};

const compare = (password, bcPassword) => {
  let result = bcrypt.compareSync(password, bcPassword);
  return result;
};

module.exports = {
  encrypt,
  compare,
};
