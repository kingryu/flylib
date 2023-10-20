function foo (){

}

var b = new foo()
var c = new foo()

b.__proto__ === foo.prototype && console.log("b.__proto__ => foo.prototype")
c.__proto__ === foo.prototype && console.log("c.__proto__ => foo.prototype")

var o = new Object()
 