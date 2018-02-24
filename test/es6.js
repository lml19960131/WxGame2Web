/**
 * Created by 62354 on 2018/2/21.
 */
class Animal {
    constructor(name = undefined, age = undefined) {
        this.name = name;
        this.age = age;
    }

    say() {
        console.log(this.name, this.age);
    }
}

class Cat extends Animal {
    constructor(name, age) {
        super(name, age);
    }
    say() {
        console.log('这是子类的say');
        super.say();
    }
}

var cat =new Cat('mmmm', 2);
cat.say();
