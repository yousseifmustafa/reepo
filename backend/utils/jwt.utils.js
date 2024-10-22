
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { email: user.email, id: user._id }, 
        '02e5956d3704f69dafa38242d91f27fa838519895f3ca16d5c820f96864456aa', 
        { expiresIn: '1d' }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, '02e5956d3704f69dafa38242d91f27fa838519895f3ca16d5c820f96864456aa');
};

module.exports = {
    generateToken,
    verifyToken
};
