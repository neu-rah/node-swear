node-swear
==========

Transform node callback style (nodeback) functions into ES6 promise-return function

```javascript
var swear=require("node-swear");
var fs=require("fs");
swear(fs.readFile)("test/resources/test.txt")
  .then(o=>log("Ok",o.toString()))
  .catch(e=>log("Error",e));
```

or a more clean style

```javascript
var swear=require("node-swear");
var fsReadFile=swear(fs.readFile);
//...
fsReadFile("test/resources/test.txt")
  .then(o=>log("Ok",o.toString()))
  .catch(e=>log("Error",e));
```
