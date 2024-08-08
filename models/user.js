const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true }
    },
    {Timestamp : true, versionKey : false}
);
const Users = mongoose.model('Users',userSchema)
module.exports = Users;
// module.exports = mongoose.model('Users', users);