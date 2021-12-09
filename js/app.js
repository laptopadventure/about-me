'use strict';

///questions - Accepts any form of yes or no, by taking the prompt, lowercasing, and slicing to the first character only.

let visitorName = prompt("Hi! What's your name?");
let campingQuestion = prompt("Welcome, " + visitorName + "! First question: Do I like camping? Yes or No"); //correct answer is yes
let scubaQuestion = prompt("Did I get a scuba license? Yes or No"); //correct answer is no
let whereQuestion = prompt("Do I live on Bainbridge? Yes or No"); //correct answer is yes
let petQuestion = prompt("Do I have three pets? Yes or No"); //correct answer is no
let codeQuestion = prompt("And finally, do I love to code? Yes or No"); //correct answer is yes- obviously. What do you take me for?

///responses - The if statement will always check if the correct answer was input, with the second being the incorrect message and the last message being the neither yes or no response

//array, each line is a new line in the conversation.
let recordedConversation = [];
//how i respond to each question
let response = "";
recordedConversation.push("I asked you if I like camping.");

if (campingQuestion.toLowerCase().slice(0, 1) == "y") {
  campingQuestion = "said yes"
  //console.log("I do like camping!")
  response = "I do like camping! It's super relaxing with a lot of nice downtime, and my friends love to cook."
} else if (campingQuestion.toLowerCase().slice(0, 1) == "n") {
  //console.log("Actually, I do like camping!")
  campingQuestion = "said no"
  response = "Actually, I do like camping! Only with friends though."
} else {
  campingQuestion = "said " + campingQuestion
  response = "Yes or no, please!"
}

//record last response
recordedConversation.push("You " + campingQuestion + ".");
recordedConversation.push("I responded, \"" + response +"\"");
//next question
recordedConversation.push("I asked you if I got a scuba license.");

if (scubaQuestion.toLowerCase().slice(0, 1) == "n") {
  //console.log("You're right! I certainly tried, but I couldn't swim while trying to learn to scuba dive. Yeah...")
  scubaQuestion = "said no"
  response = "You're right! I certainly tried, but I couldn't swim while trying to learn to scuba dive. Yeah..."
} else if (scubaQuestion.toLowerCase().slice(0, 1) == "y") {
  //console.log("Well, almost! I tried to get it, but I used to flounder in water real bad...");
  scubaQuestion = "said yes"
  response = "Well, almost! I tried to get it, but I used to flounder in water real bad..."
} else {
  //console.log("Yes or no, please!");
  scubaQuestion = "said " + scubaQuestion
  response = "Yes or no, please!"
}

//record last response
recordedConversation.push("You " + scubaQuestion + ".");
recordedConversation.push("I responded, \"" + response +"\"");
//next question
recordedConversation.push("I asked you if I live on Bainbridge Island.");

if (whereQuestion.toLowerCase().slice(0, 1) == "y") {
  //console.log("Yep! Bainbridge is pretty quiet, but it's a great place to learn to code.");
  whereQuestion = "said yes"
  response = "Yep! Bainbridge is pretty quiet, but it's a great place to learn to code."
} else if (whereQuestion.toLowerCase().slice(0, 1) == "n") {
  //console.log("I do live on Bainbridge!");
  whereQuestion = "said no"
  response = "I do live on Bainbridge!"
} else {
  //console.log("Yes or no, please!");
  whereQuestion = "said " + whereQuestion
  response = "Yes or no, please!"
}

//record last response
recordedConversation.push("You " + whereQuestion + ".");
recordedConversation.push("I responded, \"" + response +"\"");
//next question
recordedConversation.push("I asked you about my wonderful pets! Specifically, if I had three.");

if (petQuestion.toLowerCase().slice(0, 1) == "n") {
  //console.log("You're right, only two cats. One's named Hammy and the other's named Pho.");
  petQuestion = "said no"
  response = "You're right, only two cats. One's named Hammy and the other's named Pho."
} else if (petQuestion.toLowerCase().slice(0, 1) == "y") {
  //console.log("You're right that I own pets, but only two!");
  petQuestion = "said yes"
  response = "You're right that I own pets, but only two!"
} else {
  //console.log("Yes or no, please!");
  petQuestion = "said " + petQuestion
  response = "Yes or no, please!"
}
//record last response
recordedConversation.push("You " + petQuestion + ".");
recordedConversation.push("I responded, \"" + response +"\"");
//next question
recordedConversation.push("I asked you about my passion for coding.");

if (codeQuestion.toLowerCase().slice(0, 1) == "y") {
  //console.log("Yes yes, I like coding. I can easily drop a lot of hours in a day just typing away at VSC.");
  codeQuestion = "said yes"
  response = "Yes yes, I like coding. I can easily drop a lot of hours in a day just typing away at VSC."
} else if (codeQuestion.toLowerCase().slice(0, 1) == "n") {
  //console.log("Have you no faith? Of course I like coding!");
  codeQuestion = "said no"
  response = "Have you no faith? Of course I like coding!"
} else {
  //console.log("Yes or no, please!");
  codeQuestion = "said " + codeQuestion
  response = "Yes or no, please!"
}

//record last response
recordedConversation.push("You " + codeQuestion + ".");
recordedConversation.push("I responded, \"" + response +"\". " + visitorName + ", thanks for visiting my site!");
//no more questions, add a closing statement
recordedConversation.push("And that was our conversation! I hope you learned something about me, " + visitorName);

//the paragraph section that needs the answers
let quizParagraph = document.getElementsByClassName("quiz")[0];
//corresponds to the list below on which index to take from the list
let lineClassIndex = 0
//list of classes in the style picked by lineClassIndex to be applied to elements
let conversationClasses = [
  "i_asked",
  "you_said",
  "i_responded",
];
//the three strings in one question (i asked, you said, i responded). Used for alerting the questions back to the user, in a less painful way.
let questionBundle = [];

for(var i = 0; i < recordedConversation.length; i++) {
  //bundle questions into one big alert for 3 lines of conversation so we don't spam alerts so bad
  questionBundle.push(recordedConversation[i]);
  if (questionBundle.length === 3) {
    alert(questionBundle[0] + " " + questionBundle[1] + " " + questionBundle[2]);
    questionBundle = [];
  }
  //create a line in the conversation and stick it in the quiz element
  let textElement = document.createElement("p");
  textElement.textContent = recordedConversation[i];
  textElement.classList += conversationClasses[lineClassIndex];
  lineClassIndex++;
  if (lineClassIndex == 3) {
    lineClassIndex = 0;
  }
  quizParagraph.appendChild(textElement);
}

//where you left off:

/*

  After the end of the lab time on tuesday I wrote this to remind myself where to pick up. I've decided to keep it around as a neat insight into my past thoughts.

  Array of strings, each one a line in the conversation
  You need to make an element and append it to quizParagraph, possibly switch quizparagraph to a div
  Set the elements you make to a class that will be handled on the style to make each part of the conversation look like it's coming from a different person
  let counter = 0
  counter goes up each iteration of the loop and depending on counter, give a different class to the new element
  and then append it to quizParagraph!
  good luck future me

*/