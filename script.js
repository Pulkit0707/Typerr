const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field' )
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')


//set values
let timer;
let maxTime=60;
let timeLeft=maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;



function loadParagraph(){
    const paragraph=["There was no time. He ran out of the door without half the stuff he needed for work, but it didn't matter. He was late and if he didn't make this meeting on time, someone's life may be in danger.",
    "The trees, therefore, must be such old and primitive techniques that they thought nothing of them, deeming them so inconsequential that even savages like us would know of them and not be suspicious. At that, they probably didn't have too much time after they detected us orbiting and intending to land. And if that were true, there could be only one place where their civilization was hidden.",
    "It wasn't that he hated her. It was simply that he didn't like her much. It was difficult for him to explain this to her, and even more difficult for her to truly understand. She was in love and wanted him to feel the same way. He didn't, and no matter how he tried to explain to her she refused to listen or to understand.",
    "Rhonda prided herself on always taking the path less traveled. She'd decided to do this at an early age and had continued to do so throughout her entire life. It was a point of pride and she would explain to anyone who would listen that doing so was something that she'd made great efforts to always do. She'd never questioned this decision until her five-year-old niece asked her, So, is this why your life has been so difficult? and Rhonda didn't have an answer for her.",
    "There was something special about this little creature. Donna couldn't quite pinpoint what it was, but she knew with all her heart that it was true. It wasn't a matter of if she was going to try and save it, but a matter of how she was going to save it. She went back to the car to get a blanket and when she returned the creature was gone.",
    "It was a scrape that he hardly noticed. Sure, there was a bit of blood but it was minor compared to most of the other cuts and bruises he acquired on his adventures. There was no way he could know that the rock that produced the cut had alien genetic material on it that was now racing through his bloodstream. He felt perfectly normal and continued his adventure with no knowledge of what was about to happen to him.",
    "What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life."];
    const randomIndex=Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML='';
    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML+=`<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener('click',()=>{
        input.focus();
    })
}


//handle user input
function initTyping(){
    const char=typingText.querySelectorAll('span');
    const typedChar=input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft>0){

        if(!isTyping){
            timer=setInterval(initTime,1000);
            isTyping=true;
        }

        if(char[charIndex].innerText===typedChar){
            char[charIndex].classList.add('correct');
            console.log('correct');
        }else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText=mistake;
        cpm.innerText=charIndex-mistake;
    }
    else{
        clearInterval(timer);
        input.value='';
    }
}


function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal=Math.round(((charIndex-mistake)/5)/(maxTime-timeLeft)*60);
        wpm.innerText=wpmVal;
    }
    else{
        clearInterval(timer);
    }
}


function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    time.innerText=timeLeft;
    input.value='';
    charIndex=0;
    mistake=0;
    isTyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();