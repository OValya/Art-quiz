import playList from '../../data/sounds.js'

function playSound(type){
    const audio = new Audio();
    (localStorage.getItem('volume'))? 
            audio.volume = localStorage.getItem('volume'):
            audio.volume = 0.5; 
    switch (type) {
        case 'congratulation':
            audio.src = playList[0].src;
            break;
        case 'wrong':
            audio.src = playList[2].src;
            break;
        case 'correct':
            audio.src = playList[1].src;
            break;
        case 'gameover':
            audio.src = playList[3].src;
            break;
        case 'timeOutSound':
            audio.src = playList[4].src
            break;
    
        default:
            break;
    }
    audio.currentTime = 0;
    audio.play();
}

export default playSound;