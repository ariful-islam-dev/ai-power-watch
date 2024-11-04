
const bcrypt = require('bcryptjs');
// @ Hashing password

const hashing = async (password,  saltRound) => {
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

// @ Maching password
const matching = async (row, password) => {
    return await bcrypt.compare(row, password);
}

module.exports = { hashing, matching }