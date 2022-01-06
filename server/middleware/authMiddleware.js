const jwt = require('jsonwebtoken');

// check if user is authentificated, when for example he reload page by TOKEN
module.exports = function (req, res, next) { 
  if (req.method === "OPTIONS") next();
  
  try {
    const token = req.headers.authorization.split(' ')[1]; // typeOfToken tokenfdskjfnsdlkfdskflds
    if (!token) return res.status(401).json({message: "Не авторизований"});
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // decode token by secret key
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({message: "Не авторизований"})
  }
};