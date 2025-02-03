
const jwt = require('jsonwebtoken');
const token = jwt.sign({ _id:"yy" }, "seceretkey");

console.log(token);
