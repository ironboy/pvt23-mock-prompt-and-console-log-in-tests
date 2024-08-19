export default class Person {

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    return `Hej! Jag heter ${this.name} och är ${this.age} år gammal!`;
  }

}