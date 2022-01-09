const jwt = require('jsonwebtoken');

module.exports = function(role) {
  return function (req, res, next) {

    if (req.method === "OPTIONS") next(); // CHECK IF HTTP METHOD IS GET, POST OR DELETE
  
    try {
      const token = req.headers.authorization.split(' ')[1]; // typeOfToken tokenfdskjfnsdlkfdskflds
      if (token == 'null' || !token) return res.status(401).json({message: "Не авторизований"});
      
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) return res.status(403).json({message: "Немає доступу"});

      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({message: "Не авторизований"})
    }
  }
}