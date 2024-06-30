const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = []
let started = false
let level = 1
const title = document.querySelector('#level-title');
const boxes = Array.from(document.getElementsByClassName('btn'));


document.addEventListener('keypress', () => {

    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`
        nextSequence();
        started = true
        
    }
})

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    console.log(gamePattern);
    animatePress(randomColor);
    playSound(randomColor);
    userClickedPattern = [];
    level++;

 };

 function animatePress(currentColor) {
    let btn = document.querySelector(`.${currentColor}`);
    btn.classList.add("active");
    
    setTimeout(function () {
        btn.classList.remove("active");
        }, 500);
    

}
 function playSound(name) {
        let sound = new Audio(`./sounds/${name}.mp3`);
        sound.play();
}


function saveclicks(){
   boxes.forEach(btn => {
         btn.addEventListener('click',function (){
              if (!started) return;
              
              userClickedPattern.push(btn.id);
              animatePress(btn.id);
              playSound(btn.id);
              const currentStepIndex = userClickedPattern.length - 1;
              if (userClickedPattern[currentStepIndex] !== gamePattern[currentStepIndex]) {
                endGame();
                
                return;
                }
                if (userClickedPattern.length === gamePattern.length) {
                    userClickedPattern.push(btn.id);
                    
                    document.querySelector("#level-title").textContent=`level ${level}`
                     
                     setTimeout(() => {
                        nextSequence();
                        }, 1000);
                        }
                 });
            });
}
saveclicks(); 

function endGame(){
    const audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
        $("body").removeClass("game-over");
        }, 200);
        started = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        startGame();
        
}
function startGame(){
    if (started) return;
}



function animatePressedBtn(btn){
    const activeBtn = document.querySelector(`.${btn}`)
    activeBtn.classList.add('pressed');
}
