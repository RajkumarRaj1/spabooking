
 const jwt=require('jsonwebtoken');

const SECRET_KEY = "SPA_APP_SECRET_KEY";

function generateToken(data = {}, userId) {
       console.log(data,userId);
    const token = jwt.sign(data, SECRET_KEY,{
        expiresIn: "1h",
        subject: String(userId)
    });

    return token;
  
}
module.exports = {
    generateToken,
    SECRET_KEY
};