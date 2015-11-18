var debug=module.id==="repl";

if (debug) {
  var log=console.log;
  var error=console.error;
} else log=error=function(){};

var rbinder=require("rbinder");
rbinder(Function.prototype);//patch all mosule funcitons

//this will patch all fs member functions to have an rbind
//fs.readFile.constructor.prototype.rbind=Function.prototype.rbind;

//transform a node callback style function into an ES6 promise-return function
function swear(nodebacked) {
  if (!nodebacked.rbind) nodebacked.rbind=Function.prototype.rbind;
  return function() {
    var args=arguments;
    return new Promise(function(resolve,reject){
      nodebacked.rbind(function(err,data){
        if(err !== null) return reject(err);
        resolve(data);
      }).apply(this,args);
    })
  };
}

if (debug) {
  function f() {return arguments;}
  function fab(a,b) {log(arguments.length,"a,b:",a,b);}
  fab.rbind(1)(2);

  var fs=require("fs");
  swear(fs.readFile)("test/resources/test.txt")
    .then(o=>log("Ok",o.toString()))
    .catch(e=>log("Error",e));
}
