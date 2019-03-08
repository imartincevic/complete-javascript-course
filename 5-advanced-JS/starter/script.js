// Function constructor
var john = {
    name: 'John',
    yearOfBirth: 1890,
    job: 'teacher'
};

var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function() {
    console.log(2018 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1983, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1954, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);

console.log('-----------------------------');

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrayResult = [];
    for (let i = 0; i < arr.length; i++) {
        arrayResult.push(fn(arr[i]));
    }
    return arrayResult;
}

function calculateAge(element) {
    return 2018 - element;
}

function isFullAge(element) {
    return element >= 18;
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(years, isFullAge);
console.log(ages);
console.log(fullAges);

console.log('-----------------------------');

function interviewQuestion(job) {
    if (job === 'designer') {
        return function (name) {
            console.log(name + ', can you tell me what UX is?');
        }
    } else if (job === 'teacher') {
        return function (name) {
            console.log(name + ', what subject do you teach?');
        }
    } else {
        return function (name) {
            console.log(name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');
var randomQuestion = interviewQuestion();

teacherQuestion('Ivan');
designerQuestion('Tesla');
randomQuestion('Marko');

interviewQuestion('teacher')('Pero');

console.log('-----------------------------');

function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
}

Question.prototype.displayQuestion =
function() {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
        console.log(i + ': ' + this.answers[i]);
    }
}

Question.prototype.checkAnswer =
function (answerGiven, callback) {
    let sc;

    if (answerGiven === this.correct) {
        console.log('Correct answer!');
        sc = callback(true);
    } else {
        console.log('Wrong answer!');
        sc = callback(false);
    }
    this.displayScore(sc);
}

Question.prototype.displayScore =
function (score) {
    console.log('Your current score is: ' + score);
    console.log('------------------------------');
}

const q1 = new Question('Is JS cool?', ['Yes', 'No'], 0);
const q2 = new Question('What\'s the teacher\'s name?', ['John', 'Michael', 'Jonas'], 2);
const q3 = new Question('Describe coding', ['Boring', 'Fun', 'Tedious'], 1);

let questions = [q1, q2, q3];

function score() {
    var sc = 0;
    return function (correct) {
        if (correct) {
            sc++;
        }
        return sc;
    }
}

let keepScore = score();

function nextQuestion() {
    let n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    let answer = prompt('Please select the correct answer: ');

    if (answer !== 'exit') {
        questions[n].checkAnswer(parseInt(answer), keepScore);
        nextQuestion();
    }
}

nextQuestion();
