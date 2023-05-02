import playSound from './audio.js';
import {showAnswerPage} from '../pages/Question.js'


let timer;

let showTimer = (timerView) => {
    if(localStorage.getItem('setTimer') != 'false'){ 
        let end;
        if(localStorage.getItem('time')){
          end  =  Date.now() + localStorage.getItem('time') * 1000;
        }else {end  =  Date.now() + 30 * 1000;}
        timer = setInterval( function() {
        let start = Date.now();
        let diff = end - start;
        if (diff >= 0) {
            let secs = Math.ceil((diff % (1000 * 60)) / 1000)+1;
            if(secs <= 5) {timerView.style.color = 'red'; timerView.style.fontSize = '24px';}
                timerView.innerHTML = `Время: ${("0"+secs).slice(-2)} секунд`;
            } else {
                timerView.style.color = 'red'; 
                timerView.style.fontSize = '24px';
                timerView.innerHTML = "Упс...Время вышло!";
                clearInterval(timer);
                playSound('timeOutSound');
                showAnswerPage('wrong');  
            }
        }, 1000);
    }else timerView.style.opacity = '0';
}

let stopTimer = () => {
    clearInterval(timer);
}

    
export {showTimer, stopTimer};