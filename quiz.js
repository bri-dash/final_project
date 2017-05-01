function submitQuiz(){

  var answersForQ1 = document.getElementsByName("q1");
  var answersForQ2 = document.getElementsByName("q2");
  var answersForQ3 = document.getElementsByName("q3");
  var answersForQ4 = document.getElementsByName("q4");
  var answersForQ5 = document.getElementsByName("q5");

  var answer1;
  var answer2;
  var answer3;
  var answer4;
  var answer5;

  for (i=0; i<5; i++) {
    if(answersForQ1[i].checked){
      answer1 = answersForQ1[i].value;
    }
  }

  for (i=0; i<5; i++) {
    if(answersForQ2[i].checked){
      answer2 = answersForQ2[i].value;
    }
  }

  for (i=0; i<5; i++) {
    if(answersForQ3[i].checked){
      answer3 = answersForQ3[i].value;
    }
  }

  for (i=0; i<5; i++) {
    if(answersForQ4[i].checked){
      answer4 = answersForQ4[i].value;
    }
  }

  for (i=0; i<5; i++) {
    if(answersForQ5[i].checked){
      answer5 = answersForQ5[i].value;
    }
  }

  var answers = {
    'question1': answer1,
    'question2': answer2,
    'question3': answer3,
    'question4': answer4,
    'question5': answer5,
  }
  console.log(answers);

  socket.emit("answers", answers);
}
