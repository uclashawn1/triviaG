

// build an array to hold questions and answers
(function questions() {
    const myQuestions = [
       {question: "question1",
       answers: {
           a: "answer 1a",
           b: "answer 1b",
           c: "answer 1c",
           d: "answer 1d"
       },
       correctAnswer: "a"
       },
       {question: "question2",
       answers: {
           a: "answer 2a",
           b: "answer 2b",
           c: "answer 2c",
           d: "answer 2d"
       },
       correctAnswer: "b"
       },
       {question: "question3",
       answers: {
           a: "answer 3a",
           b: "answer 3b",
           c: "answer 3c",
           d: "answer 3d"
       },
       correctAnswer: "c"
       },
       {question: "question4",
       answers: {
           a: "answer 4a",
           b: "answer 4b",
           c: "answer 4c",
           d: "answer 4d"
       },
       correctAnswer: "d"
       }
    ];
    
     function buildQuiz() {
       // we'll need a place to store the HTML output
       const output = [];
    
       // for each question...
       myQuestions.forEach((currentQuestion, questionNumber) => {
         // we'll want to store the list of answer choices
         const answers = [];
    
         // and for each available answer...
         for (letter in currentQuestion.answers) {
           // ...add an HTML radio button
           answers.push(
             `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                 ${letter} :
                 ${currentQuestion.answers[letter]}
              </label>`
           );
         }
    
         // add question and answers to the output. ``= template literals use to concatenate
         output.push(
           `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
         );
       });
    
       // finally combine our output list into one string of HTML and put it on the page
       quizContainer.innerHTML = output.join("");
     }
    
     function showResults() {
       // gather answer containers from our quiz
       const answerContainers = quizContainer.querySelectorAll(".answers");
    
       // keep track of user's answers
       let numCorrect = 0;
    
       // for each question...
       myQuestions.forEach((currentQuestion, questionNumber) => {
         // find selected answer
         const answerContainer = answerContainers[questionNumber];
         const selector = `input[name=question${questionNumber}]:checked`;
         const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    
         // if answer is correct
         if (userAnswer === currentQuestion.correctAnswer) {
           // add to the number of correct answers
           numCorrect++;
    
           // color the answers green
           answerContainers[questionNumber].style.color = "green";
         } else {
           // if answer is wrong or blank
           // color the answers red
           answerContainers[questionNumber].style.color = "red";
         }
       });
    
       // show number of correct answers out of total
       resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
     }
    
     function showSlide(n) {
       slides[currentSlide].classList.remove("active-slide");
       slides[n].classList.add("active-slide");
       currentSlide = n;
      
       if (currentSlide === 0) {
         previousButton.style.display = "none";
       } else {
         previousButton.style.display = "inline-block";
       }
      
       if (currentSlide === slides.length - 1) {
         nextButton.style.display = "none";
         submitButton.style.display = "inline-block";
       } else {
         nextButton.style.display = "inline-block";
         submitButton.style.display = "none";
       }
     }
    
     function showNextSlide() {
       showSlide(currentSlide + 1);
     }
    
     function showPreviousSlide() {
       showSlide(currentSlide - 1);
     }
    
     const quizContainer = document.getElementById("quiz");
     const resultsContainer = document.getElementById("results");
     const submitButton = document.getElementById("submit");
    
     // display quiz; immediate
     buildQuiz();
    
     const previousButton = document.getElementById("previous");
     const nextButton = document.getElementById("next");
     const slides = document.querySelectorAll(".slide");
     let currentSlide = 0;
    
     showSlide(0);
    
     // on submit, show results
     submitButton.addEventListener("click", showResults);
     previousButton.addEventListener("click", showPreviousSlide);
     nextButton.addEventListener("click", showNextSlide);
    })();
    
    