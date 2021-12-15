'use strict';

//just a name, but good that it's its own var- we use names a lot
let visitorName = prompt('Hi! What\'s your name?');
//tries for the first question
let tries = 4;
//how many the user got right
let score = 0;

//by putting prompts in arrays this will prompt each question in order first, giving us an array of arrays. inside index 0 == answers, index 1 == guesses for the question
let questionArray = [
  ['Welcome, ' + visitorName + '! First question: Do I like camping? Yes or No', 1],
  ['Did I get a scuba license? Yes or No', 1],
  ['Do I live on Bainbridge? Yes or No', 1],
  ['Do I have three pets? Yes or No', 1],
  ['Do I love to code? Yes or No', 1],
  ['What was my favorite year? Any Number!', 4],
  ['What\'s a genre of music I like? Name one!', 6],
];

//line up the answer index to the question index
let correctAnswers = [
  true, //camping
  false, //scuba
  true, //location
  false, //pets
  true, //code
  2019, //favorite year
  ['rock', 'jazz', 'orchestra', 'r&b', 'pop'], //music genres (all of these are correct answers)
];
//and finally some quips about geting the question right or wrong, index 0 == correct response, index 1 == incorrect
let answerBlurbs = [
  ['Correct! It\'s super relaxing with a lot of nice downtime, and my friends love to cook.', 'Incorrect! I do like camping! Only with friends though.'],
  ['Correct! I certainly tried, but I couldn\'t swim while trying to learn to scuba dive. Yeah...', 'Incorrect! I tried to get it, but I used to flounder in water real bad...'],
  ['Correct! Bainbridge is pretty quiet, but it\'s a great place to learn to code.', 'Incorrect! I do live on Bainbridge!'],
  ['Correct! Only two cats. One\'s named Hammy and the other\'s named Pho.', 'Incorrect! You\'re right that I own pets, but only two!'],
  ['Yes yes, I like coding. I can easily drop a lot of hours in a day just typing away at VSC.', 'Have you no faith? Of course I like coding!'],
  ['Correct! I really enjoyed my senior year of HS.'],
  ['Correct! That genre is good stuff. All the possible answers were: rock, jazz, orchestra, r&b and pop.'],
];

//array, each line is a new line in the conversation.
let recordedConversation = [];
//how i respond to each question, kinda. became more of a general use var sorry
let response = '';

function booleanQuestion(answerIndex,userResponse,expectedAnswer) {
  //set by the question type if needed
  let sanitizedResponse;
  //can't turn into a bool
  let nonsense = false;
  sanitizedResponse = userResponse.toLowerCase().slice(0, 1);
  //response
  if(sanitizedResponse === 'y'){
    sanitizedResponse = true;
    userResponse = 'said yes';
  } else if (sanitizedResponse === 'n') {
    sanitizedResponse = false;
    userResponse = 'said no';
  } else {
    userResponse = 'said "' + userResponse + '"';
    nonsense = true;
  }
  //was it correct
  let breakAfterLogging = false;
  if(nonsense){
    response = 'Yes or no, please!';
  } else if(sanitizedResponse === expectedAnswer) {
    response = answerBlurbs[answerIndex][0];
    score++;
    breakAfterLogging = true;
  } else {
    response = answerBlurbs[answerIndex][1];
  }
  alert(response);
  //record for "chat log"
  recordedConversation.push('You ' + userResponse + '.');
  recordedConversation.push('I responded, "' + response +'"');
  return breakAfterLogging;
}

function numberQuestion(answerIndex,userResponse,expectedAnswer){
  recordedConversation.push('You guessed ' + userResponse + '.');
  userResponse = parseInt(userResponse);
  if(userResponse === expectedAnswer) {
    response = answerBlurbs[answerIndex];
    alert(response);
    recordedConversation.push('I responded, "' + response +'"');
    score++;
    return true;
  } else {
    if(isNaN(userResponse)){
      response = 'That\'s not a number!';
    } else if(userResponse < expectedAnswer) {
      response = 'That\'s too low, sorry.';
    } else {
      response = 'That\'s too high, sorry.';
    }
    alert(response);
    recordedConversation.push('I responded, "' + response +'"');
    if(!tries){
      alert('The correct answer was 2019.');
    }
  }
}


///responses - The if statement will always check if the correct answer was input, with the second being the incorrect message and the last message being the neither yes or no response

for(let answerIndex = 0; answerIndex < questionArray.length; answerIndex++) {
  tries = questionArray[answerIndex][1];
  let prefixQuestion = false;
  let correctAnswer = correctAnswers[answerIndex];

  if (tries > 1) {
    prefixQuestion = true;
  }
  while(tries) {
    let question = questionArray[answerIndex][0];
    if(prefixQuestion) {
      question = 'You have ' + tries + ' tries to guess this. ' + question;
    }
    let userResponse = prompt(question);
    tries--;


    //handle questions that are booleans
    if(typeof correctAnswer === 'boolean') {
      let shouldBreak = booleanQuestion(answerIndex,userResponse,correctAnswers[answerIndex]);
      if (shouldBreak){
        break;
      }
    }

    //handle questions that are numerical
    if(typeof correctAnswer === 'number') {
      let shouldBreak = numberQuestion(answerIndex,userResponse,correctAnswers[answerIndex]);
      if (shouldBreak){
        break;
      }
    }
    //handle questions that can be any string in a list
    if(typeof correctAnswer === 'object'){
      let found = false;
      for(let oneAnswer = 0; oneAnswer < correctAnswer.length; oneAnswer++){
        if(userResponse === correctAnswer[oneAnswer]){
          found = true;
          break;
        }
      }
      let breakAfterLogging = false;
      if(found){
        response = answerBlurbs[answerIndex][0];
        score++;
        breakAfterLogging = true;
      } else {
        response = 'That\'s not it';
        if(!tries){
          response += ', and you\'re outta guesses. I like rock, jazz, orchestra, r&b and pop.';
        } else {
          response += '. Try again!';
        }
      }
      alert(response);
      recordedConversation.push('Your guess was "' + userResponse + '"');
      recordedConversation.push('I responded, "' + response +'"');
      if(breakAfterLogging){
        break;
      }
    }
  }
}

alert('Your total amount of correct answers was: ' + score + '!');

//the paragraph section that needs the answers
let quizParagraph = document.getElementsByClassName('quiz')[0];
//corresponds to the list below on which index to take from the list
let lineClassIndex = 0;
//list of classes in the style picked by lineClassIndex to be applied to elements
let conversationClasses = [
  'you_said',
  'i_responded',
];

for(let i = 0; i < recordedConversation.length; i++) {
  //create a line in the conversation and stick it in the quiz element
  let textElement = document.createElement('p');
  textElement.textContent = recordedConversation[i];
  textElement.classList += conversationClasses[lineClassIndex];
  lineClassIndex++;
  if (lineClassIndex === conversationClasses.length) {
    lineClassIndex = 0;
  }
  quizParagraph.appendChild(textElement);
}

//don't forget to append the score!
let scoreElement = document.createElement('p');
scoreElement.textContent = 'Your score was: ' + score + '!';
scoreElement.classList += 'finalscore';
quizParagraph.appendChild(scoreElement);
