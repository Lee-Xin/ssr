import style from './style/home.less'
class Person {
    constructor() {
        this.name = ''
    }
}

class Lixin extends Person{
    constructor(props) {
        super(props);
    }

}

let lx = new Lixin('李鑫')
console.log(lx.name);
