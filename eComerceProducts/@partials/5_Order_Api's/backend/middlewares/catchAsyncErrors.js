module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
//mesela create product da name ozelligini yazmayi unutdugumuzda bu onu yakalar
