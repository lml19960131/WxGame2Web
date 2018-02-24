/**
 * Created by 62354 on 2018/2/21.
 */
(function () {
    var Animal = function (name, age) {
        this.name = name;
        this.age = age;
    };
    Animal.prototype.say = function () {
        console.log(this.name + ' ' + this.age);
    };
    // var cat = new Animal('喵喵喵', 3);
    // cat.say();
    // Animal.prototype.say.call(cat);
    // var params = {
    //     name : '喵喵喵2',
    //     age : 4
    // };
    // cat.say.call(params);

    //寄生组合式继承 call()apply()调用一个对象的一个方法，用另一个对象去替换当前对象
    var Cat = function (name, age) {
        // Animal.apply(this, arguments);
        Animal.call(this, name, age);
    };
    Cat.prototype = Object.create(Animal.prototype);
    //上面与这个的区别 Cat.prototype = new Animal();
    Cat.prototype.say = function () {
        var P = {
            name: '父类喵喵喵',
            age: '10'
        };
        Animal.prototype.say.apply(P);
        console.log('这是子类的名字' + this.name + this.age)
    };
    var cat1 = new Cat('子类喵喵喵', 3);
    cat1.say();
})();