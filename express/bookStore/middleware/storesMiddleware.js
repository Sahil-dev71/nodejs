exports.customMiddleware=function (req,res,next){
  console.log("testing the middleware");
  next();
}
exports.routeSpecificMiddleware=function (req,res,next){
  console.log("routeSpecific Middleware");
  next();  
}
exports.routeMiddleware=function (req,res,next){
  console.log("testing the route level middleware");  
  next();
}