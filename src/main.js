import style from './style/main.css'
class Person {
    constructor(props) {
        this.name = ''
    }
    speak(){
        console.log(this.name)
    }
}

class Lixin extends Person{
    constructor(props) {
        super(props);
        this.name = props
    }
}

let lx = new Lixin('李鑫2')
lx.speak();
