
JavaScrpit中的类型有如下几种，除去一般类型以外其余都是对象。
1. Number
2. String
3. Boolan
4. Symbol (ES6新增)
5. Object
    * Function
    * Array
    * Date
    * RegExp
6. Null
7. undefined

**对象:** 对象在js中是一个键值对的集合，早期的js中并没有类Class，但类的概念却通过Object Prototype得以延续。
在了解js中对象这个概念的基础上，再来看js的原型，相比涉及诸多底层实现概念的作用域而言，原型就容易懂得多，要弄懂原型，只涉及三个关键字: [[prototype]]、prototype、constructor

一般情况下，我们这样来创建一个对象和函数：  
```
    var MyObject = {
        name: 'myobject',
    };

    var MyFunction = function () {
        name = 'myfunction';
    };

```

当然，对象还可以通过new Class() 的方式来建立，在类似java的语言中中我们是通过构造方法
来实例化一个对象的，在js中的new关键字也能"实例化"一个对象（实际上JavaScript不存在类，有的只是对象），而用来实例化的构造方法即是js的函数，对这样的方法我们称为**constructor**，但是对于js而言，**并不区分一般函数和构造函数**，只有在通过new 关键字来使用函数时才被当作是构造函数，用来“实例化一个对象”。
使用构造函数实例化对象时这样写：
```
    var ClassA = function () {
        this.className = 'A';
    };
    classa = new ClassA();
```
这样就得到了一个对象classa，看到new关键字，很多人都会觉得熟悉，但实际上这只是幻觉，它真真的机制并非如此。
查看ClassA的属性，我们会发现一个ClassA.prototype对象，它有一个名为ClassA.prototype.constructor的属性，它是函数自身的引用，从字面上理解都以为是构造器，然后我们考虑下面代码：
```
function Foo() {      // ... }  
Foo.prototype.constructor === Foo; // true  
var a = new Foo();  a.constructor === Foo; // true
```
我们猜测，当使用new Foo()创建对象a的时候，Foo.prototype.constructor作为构造函数创造了对象a，
从 a.constructor === Foo可以看出。
然而，事实却并非猜测的那般，constructor并非对象真正的构造者，
```
function cobj() {
  this.name = 'a';
  console.log('test a');
}
cobj.prototype.constructor = function cobj2() {
  this.name = 'b';
  console.log('test b');
};
var ob = new cobj(); // => 'test a'
ob.name === 'a'; // true
ob.constructor === cobj.prototype.constructor; // true
```
尽管cobj.prototype.constructor被我们修改成了cobj2，然而new cobj() 得到的对象a.name却是a，从这里我们可以看出constructor属性仅仅是在new的时候作为引用被传入，实际上却并不承担构造函数这一角色，虽然一般情况下，consconstructor总是指向对象的构造函数，但是constructor属性是可以变更的，所以未必真的指向对象的构造函数，为了明确这个属性的字面意思，我们应该尽量让对象的constructor指向其构造函数，维持这个惯例。

现在来看**原型**，前文中说说到除了简单类型以外其他都是对象，而js的所有对象都是有原型的，
一般通过Object.\__proto__这个非标准方法可以获得一个对象的原型，原型也是一个对象，
因此产生了原型链的概念，即 对象--》对象原型--》对象原型的原型--》 ……
这个原型的顶端是Object.prototype;

看上文MyObject对象的原型可知：
>typeof MyObject.\__proto__ == 'object'  // true
typeof MyObject.constructor == 'function'  // true
typeof MyObject.prototype == 'undefined'  // true

同样的，函数也是一个对象，函数MyFunction的情况如下：  
>typeof MyFunction.\_\_proto\_\_ == 'function'  // true
typeof MyFunction.constructor == 'function'  // true
typeof MyFunction.prototype == 'object'  // ture
MyFunction.\__proto\__.\__proto\__ == MyObject.\__proto\__ // true

对比可以发现，函数对象存在一个prototype的属性，这个属性是函数作为构造函数使用的关键 ，  
我们使用classa = new ClaasA() 时，相当于  
```
var classa = {};
classa.__proto__ = ClaasA.prototype;
classa.constructor = ClaasA();
var classa = ClaasA.call(classa, args);
```

**new的定义：**  
>var obj = new_object()  
obj.[[Prototype]] = Type.prototype  
var result = Type.call(obj, arg1, ..., argn)  
if(isPrimitive(result)) return obj  
else return result

当我们访问对象属性的时候，如果在对象本身上无法访问到，则会进行和作用域链一样类似的搜过过程，逐层向上搜索object.__proto__，直到Object.prototype为止，这就是**原型链**。
    