import { test, expect, vi, beforeEach } from 'vitest';
import App from '../classes/App.js';

// promptQuestion = an array of questions the program calls prompt with
// mockAnswers = an array of answers we want to give for the questions
// consoleOutput = an array of output the program calls console.log with
let promptQuestions, mockAnswers, consoleOutput;

// since we are going to mock console.log - save the original console.log
// so we can still use it by calling log
let log = console.log;

// beforeEach -> do this before each test
beforeEach(() => {
  // set promptQuestions and mockAnswers to empty arrays;
  promptQuestions = [];
  mockAnswers = [];
  // mock the prompt!
  // vi.mock replaces parts of an import
  // and if the export is  done using 'export default'
  // then the part we want to replace is 'default'
  vi.mock(import('../helpers/prompt.js'), async () => {
    return {
      default: (question) => {
        // remember the question the program sends to prompt
        promptQuestions.push(question);
        // return a mock answers to the program
        return mockAnswers.shift();
      }
    }
  });
  // set consoleOutput to an empty array
  consoleOutput = [];
  // mock console.log - not using vi.mock since
  // console.log is a global built in function
  console.log = (...args) => consoleOutput.push(args);
});

test('The App should ask for name and age', () => {
  // the answers we want to give when the program calls prompt
  mockAnswers = ['Anna', '35'];
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

