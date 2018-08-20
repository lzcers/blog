---
Title: Rust 学习笔记
Tags: 编程
PublishDate: 2018/8/6 19:25:28
---

### 为什么学习 Rust ？

* 宏
* 采用所用权系统来避免 GC 保障内存安全（**好奇**）
* 零开销抽象性能高，又有很多现代编程语言的特性
* 官方对 WebAssembly 支持度高，编译到 WASM 很方便
* **不折腾不舒服斯基**

相对于 Go 来说，Rust 的概念还是蛮多的，那怎么学一门新的编程语言呢？如果有其它编程语言的经验，那么学习一门新的编程语言是比较容易的，学习过程更多的是知识迁移，如果是学习新的编程范式则会稍有难度，这不仅仅是学习新的概念，还需要在思维模式上做出改变，对于编程语言的学习，应当多去学习不同范式的语言，尽管现代编程语言都支持多范式，但各语言擅长的范式还是不一样的。

无论如何，不同编程范式的语言都有通用的编程概念，迅速找到这些**通用概念**在该语言中的表达方式就能快速上手写代码了，比如`变量声明、数据类型、控制流、函数`，然后再去学习这些语言里的独特概念并付诸实践。要把代码写好，还需要付出更多精力去学习这门语言的优秀实践。

后续会持续学习 Rust，并补充笔记，然后写一个 Rust 编译到 [WwebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly) 的例子。

## 基本的表达方式

### 声明

`let` 应该理解成 scheme 里的绑定，而非变量，所有值默认是不可变的，需要通过 `let mut`来声明可变性。

也可以利用 `const` 声明常量，其作用更类似于 `define` 定义一个大范围，多处使用的值。

Rust 采用 snake case 风格声明变量和函数名，也就是小写字母加下划线分隔。

`//` 声明代码注释，还有一种文档注释

### 数据类型

Rust 中将内建的类型分为两类：标量（scalar）和复合（compound）

* 标量： 整型、浮点型、布尔型、字符型

  整型：有符号整型`i8, i16, i32, i64`，无符号整型`u8, u16, u32, u64 `，整数默认是 i32，浮点数默认是 f64。

  字符型：`char`用单引号指定，不同于双引号指定的字符串，Rust 中的`char` 是一个 Unicode 标量值，这意味着比 ASCII 更大的表示范围。

  `isize` 和 `usize` ，前者是有符号整型，后者是无符号整型，类型依赖运行程序的计算机架构，64 位架构上它们是 64 位的， 32 位架构上它们是 32 位的。

* 复合：元组（tuple）和数组（array）

  元组的元素可以是多类型，数组的元素类型必须是一样的，都是定长不可变的，可以使用模式匹配来解构。

  `array: [T; N]` 数组，T 为元素类型，N 为长度。

  `tuple: (T, U, G,....)` 元组
  ```rust
  let x: (i32, f64, u8) = (500, 6.4, 1); // 元组声明
  let five_hundred = x.0; // 索引访问
  let a = [1, 2, 3, 4, 5]; // 数组声明
  let first = a[0]; // 数组访问
  ```

* silce: 一个没有所有权的数据类型，可类比于 go 的切片，字符串字面值就是 slice，其类型是`&str`，是不可变的，我们以可以对一个字符串进行切片操作，也可以对数组如此。

  ```rust
  let s = "hello world";
  let len = s.len();
  let word1 = &s[0..len];
  let word2 = &s[..];
  ```

  切片的 statIndex 默认是0，endIndex 默认是最后一个位置，实际使用可以按需求省略 index 采用默认值。

### 函数

Rust 中的函数定义先后不影响调用（类比于 JS 的提升），main 函数是程序入口，如果没有显式 `return` 返回，则默认以最后一个表达式的值作为返回值。Rust 是基于表达式的，`{}`也是表达式，会返回最后一个表达式的值，如果最后一个表达式加上了分号，就会变成语句了。

### 控制流

* **if** 表达式后跟一个条件，条件必须是 bool 值，if 表达式是有值的，因而可以放在 let 后面，但此时要注意两个分支的返回值类型是否一致，否则会报错。
* **loop、while** 前者是无条件无限循环，后者是条件循环，提前退出循环可以用`continue 、break` 。
* **for in** 遍历集合

### match

模式匹配，这是很多语言缺失的一个特性，但却异常强大。

```rust
fn main() {
    enum Coin {
        Penny,
        Nickel,
        Dime,
        Quarter(u32),
    }
    fn value_in_cents(coin: Coin) -> u32 {
        // 与 if 不同，match 后接的表达式可以返回任何类型，不一定要布尔类型
        // match 会以匹配到的分支代码执行结果作为返回值, 在分支用运行多段代码可以用大括号 {}
        // 匹配条件中亦可以用 (<var>) 来绑定匹配的值，因而可以实现对结构的解构
        // 也可以用 _ 来匹配任意值
        match coin {
            Coin::Penny => 1,
            Coin::Nickel => 5,
            // 假设我们忘记 enum 的一种情况，编译器就会报错  ^^^^ pattern `Dime` not covered
            // 因为 match 必须是穷尽的，但是对于一个很大的集合，我们只在乎那些我们关注的值，穷尽就难做到了，
            // 在这种情况下，我们就需要用到特殊的匹配模式 _， 类比于 switch 中的 default 分支
            // 如果不能穷尽那就必须有 defalut 补全，在 JS 中 defalut 可以省略
            // 但是某些规范检查会强制要求有 defalut 分支
            // Rust 在语法层面上就包含了某些优秀的实践，约束程序员能写出正确的代码
            // Coin::Dime => 10,
            Coin::Quarter(value) => {
                println!("value is {}!", value);
                25
            }
            _ => 0,
        }
    }
    // 理所当然的，我们也可以匹配 Option
    fn match_option(x: Option<i32>) -> Option<i32> {
        match x {
            None => None,
            Some(i) => Some(i + 1),
        }
    }
    // 如果我们只关注一个值，那就就有一个语法糖
    let some_u8_value = Some(0u8);
    match some_u8_value {
        Some(3) => println!("three"),
        _ => (),
    }
    // 上面代码等价于
    if let Some(3) = some_u8_value {
        println!("three");
    }
    // if let 也可以有 else 分支
    else {
        println!("other")
    }

    let v = value_in_cents(Coin::Quarter(25));
    let m = match_option(Some(100));
    println!("{}", v);
}
```



## 组合

### strcut

 通过结构体创建新的复合类型，Key: Value 形式

```rust
// 定义
struct User {
    username: String,
    email: String,
}
// 创捷实例
let mut user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
};
```

通过点号访问实例属性，待绑定的变量名与属性名相同时可以简写，`{ email: email,}` 可以简写为 `{email,}`，也可以用其它结构体实例的值来创建实例，类比于 ES6 的解构赋值。

```rust
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
};
```

其它的结构体的声明方式：

**元祖结构体（tuple structs）**：不指明结构体属性的 key，只需要指明 value 的类型，这种就用点号加索引来访问。

**类单元结构体（unit-like structs）**：不声明任何字段，只在上面定义行为。

结构体上可以使用 `impl <StructName>{ ... }` 定义方法语句以及关联函数，二者区别在于方法语句函数第一个参数是否为 `&self`，使用`.`调用，而关联函数使用 `::`调用，一般用关联函数来定义构造函数，也可以类比于类的静态方法。

```rust
impl Rectangle {
    // 方法语句
    fn area(&self) -> u32 {
        self.width * self.height
    }
    // 关联函数
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}
```

### enum

Rust 里的枚举就有些强了，看官方案例，枚举成员与其命名空间用`::`分开，但都是`IpAddrKind`类型（这与结构体不一样的地方，使用枚举的时候它们是一个类型），也可以直接声明枚举成员的类型，并附加数据。

```rust
enum IpAddrKind {
    V4, // 没关联任何数据和类型
    V6,
}
let four = IpAddrKind::V4;
let six = IpAddrKind::V6;
// 直接声明枚举成员的类型并将数据附加到成员上
enum IpAddr {
    V4(String),
    V6(String),
}
enum Message {
    Quit,
    Move { x: i32, y: i32 }, // 包含一个匿名结构体
    Write(String),
    ChangeColor(i32, i32, i32), // 一个匿名元祖
}
// 枚举也可以用 impl 来定义成员方法
impl Message {
    fn call(&self) {
        // method body would be defined here
    }
}

let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));
```

简单来说，枚举和结构体的差别在于枚举的成员它们都是一个类型的，而结构体不是。Rust 中没空值（Null），但它用一个特殊的枚举类型实现了空值或非空值的概念，`Option<T>`被包含在 prelude 中，可以不需要引入作用域，也不需要显式 `Option::` 调用。

```rust
enum Option<T> {
    Some(T),
    None,
};
```

### 通用集合类型

**vector**

`vector`一个线性存储结构，与数组区别在于它的长度可以增长或者缩小，并自带`push、pop`等方法。

## 抽象

**!** 结尾的函数调用都是宏调用，比如 `println!();`

**泛型**：Rust 通过编译时进行泛型代码的单态化来保证效率，编译器寻找所有泛型代码被调用的位置使用泛型代码针对具体类型生成代码，这意味着使用泛型时没有运行时开销。

**trait**： 对类型的通用**行为**进行抽象，类比于 haskell 类型类（typeclass）或是 interface。

### 生命周期（lifetimes）

`lifetimes` **是一种泛型**，与其它泛型用于确保类型行为复合期望不一样，它用来保证引用在我们需要它的时候是有效的，生命周期注解不改变任何引用的生命周期长短。

把作用域 `lifetime` 看作一种类型，那么 `'static` 作为全局作用域则是所有 lifetime 的子类型，作用域之间就是标准的嵌套关系，这种嵌套关系就像子类与父类，在子作用域中引用父作用域的变量貌似没毛病，但是我在子域中引用一个全局作用域的可变对象，把他释放掉，然后全局作用域中接下来对该对象地操作都会 GG。

假设我们有小的生命周期 `'a`，那么显然 `'a`:`'static` 是吧？大的嵌小的，`'static`作用域更大，包含更多的外延，然而事实恰好与直觉相反，`'static`:'`a`，`lifegame` 类型关联的是作用域的内涵而不是外延，内涵越多外延越小，`'a`的外延最少，但是它被诸多大的生命周期包围着，因而它的内涵是最多的，而全局作用域 `'static` 外延最大，但内涵却是最少的。



lifetimes 限定了资源的界限不超过一个范围，只读引用可以允许其范围收缩，但扩张

###  所有权

区别于其它语言的一个重要特性，简单来说通过所有权模型可以避免带 GC 的垃圾回收，从而获得更高的性能，当然，也更麻烦，它的规则很简单。

1. Rust 中每一个值都有一个称之为其 **所有者**（*owner*）的变量。
2. 值有且只能有一个所有者。
3. 当所有者（变量）离开作用域，这个值将被丢弃。

也就是说所有值都有一个一个 Owner ，当它离开作用域时就会被回收，也就是确定性析构，离开作用域的方式可能是`赋值（非clone）、函数传参与返回`，这种方式称为**移动**，通过克隆可以避免所有权因为移动而丢失，放在栈上的数据如果带有 **copy** 的类型是不会因为赋值丢失所有权的，如 `u32、bool、f64、元祖(包含的类型都是 copy 时)`等。

因为函数的传参与返回都会导致所有权移动，这会显得很麻烦，因而可以通过传递引用来避免，但传递引用只允许使用引用的值，而不能修改它（会报错），获取引用作为函数参数称为**借用（borrowing）**，它是**没有所有权**的 ，若要修改引用值，还是需要加上 `mut`声明为可变引用，而且这还有限制，在特定作用域中，只能有一个引用，这就避免了**数据竞争**（*data race*），当然，我们可以用大括号再声明一个作用域，而且我们也不能同时拥有可变引用和不可变引用，真是简单粗暴。

```rust
let mut s = String::from("hello");
let r1 = &s; // no problem
let r2 = &s; // no problem
let r3 = &mut s; // BIG PROBLEM
```

关于引用，总结来说就是：

在任意给定时间，只能 拥有如下中的一个：

1. 一个可变引用；
2. 任意数量的不可变引用；
3. 引用必须总是有效的；

## 工具

### cargo

`cargo new` 创建项目

`cargo check` 编译检查

`cargo build`  编译、构建

`cargo build --release`  构建发布版本

`cargo run` 编译、构建、执行


