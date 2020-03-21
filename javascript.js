
const body = document.getElementsByTagName('BODY');
const question = document.getElementById('question');
const questionNumber = document.getElementById('questionNumber')
const eachButton = document.getElementsByClassName('option')
var buttonsContainer = document.getElementById('options');
var highscore = document.getElementById('userscore');
var failedGifURL = "https://media.giphy.com/media/3o6ZsXTJkgqLvrrH6E/giphy.gif";
var passedGifURL = "https://media.giphy.com/media/l378sxNXQTL2LRrOM/giphy.gif";
var passedMsg = "Yay!! you passed! would<br>you like to"
var failedMsg = "Oops, your score was too low,<br>would you like to"
var score = 0;

var wrongAnswer = null;

console.log(question)
window.addEventListener('load',function(){
    var counter = 1; 
    const xhr = new XMLHttpRequest();

    xhr.open('GET','https://opentdb.com/api.php?amount=50&category=11&difficulty=easy&type=multiple',true)

    xhr.onload = function(){
        if(this.status == 200){
        var jObject = JSON.parse(this.responseText);
        addQuestion();
        addCounter();
        showCorrectAnswer();
        wrongAnswers();
        // respondToButton;
        }

        buttonsContainer.addEventListener('click', respondToButton)
        function respondToButton(e){
            if(jObject.results[counter - 1].incorrect_answers.includes(e.target.innerHTML)){
                console.log("We don't an answer",e.target.innerHTML)
                console.log(score)
            }else{
                console.log(++score)
                console.log("We have an answer",e.target.innerHTML)
            }

            if(e.target.className == "option" && counter <10 ){
                counter += 1;
                for(var clear = 0; clear <= 3; clear++){
                    eachButton[clear].innerHTML ="";
                }
                addQuestion();
                addCounter();
                var correctCounter = showCorrectAnswer();
                wrongAnswers()

            } else if(counter == 10 && score >= 7){
                window.location.href = "highscore.html?score="+score+"&msg="+passedMsg+"&image="+passedGifURL;
                

            } else if(counter == 10 && score < 7){
                window.location.href = "highscore.html?score="+score+"&msg="+failedMsg+"&image="+failedGifURL;
            }

        }

        function addCounter(){
            questionNumber.innerHTML = counter + "/10"
            console.log(jObject.results[counter - 1].question)
        }

        function addQuestion(){
            question.innerHTML = jObject.results[counter - 1].question
            
        }

        function showCorrectAnswer(){
            var correctAnswer = jObject.results[counter - 1].correct_answer;
            var random = Math.floor(Math.random() * Math.floor(4));
            return eachButton[random].innerHTML = correctAnswer
        }

        function wrongAnswers(){
            var wrongAnswerArray = jObject.results[counter - 1].incorrect_answers;
            console.log(wrongAnswerArray)
            wrongAnswer = wrongAnswerArray;
            let moveToButtons = wrongAnswerArray.map(function(a,index){
                if(eachButton[index].innerHTML != ""){
                    eachButton[index + 1].innerHTML = a
                }else{
                    eachButton[index].innerHTML = a
                }
            })
        }


    }
    xhr.send()
})
