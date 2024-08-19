import prompt from '../helpers/prompt.js';
import Person from '../classes/Person.js';

export default class App {

  constructor() {
    let name = prompt('Hej! Vad heter du? ');
    let age = prompt('Hur gammal är du? ');
    this.person = new Person(name, age);
    console.log('\n' + this.person.sayHi());
  }

}