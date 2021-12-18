'use strict';

//i made this file so I didn't have to answer a lot of questions to see my webpage as the user will usually recieve it- this is just dummy data!

//array, each line is a new line in the conversation. this will be shorter than the actual result people will get but it's
//long enough that it's fine- the length of the quiz section can be bigger or smaller depending on how correct the user is
let recordedConversation = [
  'You said something',
  'I Responded, "something"',
  'You said something',
  'I Responded, "something"',
  'You said something',
  'I Responded, "something"',
];

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
scoreElement.textContent = 'Your score was: ' + 7 + '!';
scoreElement.classList += 'finalscore';
quizParagraph.appendChild(scoreElement);
