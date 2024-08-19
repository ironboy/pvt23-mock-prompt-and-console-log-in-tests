import { test, expect } from 'vitest';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPromptAndConsoleLog.js';
import App from '../classes/App.js';

test('The App should ask for name and age', () => {
  // the answers we want to give when the program calls prompt
  setMockAnswers('Anna', '35');
  // create an instance of App
  let app = new App();
  // check that the program asks the correct questions when calling prompt
  expect(promptQuestions[0]).toBe('Hej! Vad heter du? ');
  expect(promptQuestions[1]).toBe('Hur gammal är du? ');
  // call the sayHi method of the person the app creates and check the return value
  expect(app.person.sayHi()).toBe('Hej! Jag heter Anna och är 35 år gammal!');
  // check that the console.log output the program gives is correct
  // (note: since console.log can be called with several arguments
  // each call to console.log is stored as an array)
  expect(consoleOutput[0][0]).toBe('\nHej! Jag heter Anna och är 35 år gammal!');
  // we can still console.log things if we need to, although we mocked console.log
  // since we saved to original console.log function in the variable log
  log('The test has run!');
});

