import Utils        from '../../services/Utils.js'
import {images}         from '../../data/images.js'
import Categories     from './Categories.js'
import  {pictureCategory}  from '../../js/getAllSetsOfCategory.js';
import  {authorCategory}  from '../../js/getAllSetsOfCategory.js';
import playList from '../../data/sounds.js'
import {showTimer, stopTimer} from '../components/timer.js' 
import playSound from '../components/audio.js' 

let getImage = async (id) => {
    let image = document.querySelector('.question-picture');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/OValya/image-data/master/img/${id}.jpg`;
    img.onload = ()=>{
        image.style.backgroundImage = `url('${img.src}')`;
    }
}

let getPicture = (id, wrong, type, box) =>{
    let img= new Image(); 
    let src = `https://raw.githubusercontent.com/OValya/image-data/master/img/${wrong}.jpg`;
    img.src = src;
    img.onload = ()=>{
        let div = document.createElement('div');
        div.style.order = `${Math.floor(Math.random() * 4)}`;
        div.classList.add('answer-picture', `${type}`, 'answer');
        div.style.backgroundImage = `url('${img.src}')`; 
        box.append(div);
    }
}

let getRightImage = async (id, box) => {
    getPicture(id, id, 'correct', box);
}

let getWrongImages = async (id, box) =>{
    let check = [];
    while(check.length<3){
        let num = Math.floor(Math.random() * 240);
        if (check.includes(num)!=true && images[num].author != images[id].author) {   
            getPicture(id, num, 'wrong', box);
            check.push(num);
        }
    }    
}

let getRightAnswer = (id, box) =>{
    let answer = images[id].author;
    let button = document.createElement('button');
    button.classList.add('button-answer', 'button', 'correct', 'answer');
    button.style.order = `${Math.floor(Math.random() * 4)}`
    button.textContent=answer;
    box.append(button); 
}

let getWrongAnswers =(id, box) =>{
    let check = [];
        while(check.length<3){
            let button = document.createElement('button');
            button.classList.add('button-answer', 'button', 'wrong', 'answer');
            let num = Math.floor(Math.random() * 240);
            if (check.includes(num)!=true && images[num].author != images[id].author) {   
                button.textContent = images[num].author;  
                button.style.order = `${Math.floor(Math.random() * 4)}`;
                box.append(button); 
                check.push(num);
            }
        }
    }   

function showAnswerPage(type){
            let form = document.querySelector('.page-answer');
            let img = document.querySelector('.image-icon');
            img.src = `./assets/svg/answer-page/${type}.svg`
            form.style.zIndex = '1';
            form.style.opacity = '1';
            playSound(`${type}`);
        }

function pressContinue(){
    
}

let Question = {

    render : async () => {
        let request = Utils.parseRequestURL();
        let fragment;
        if(request.resource==="picture"){
            
            fragment =`
                <div class = "page-question">
                    <div class = "header-page-question">
                        <input class="cancel-icon" type="button" value="X">
                        <div class="timer-box"> 
                            <span id="timer">Время: 00 секунд </span>
                        </div>
                    </div>
                    <p class = "title"> Кто автор картины "${images[request.id].name}"? </p>
                    <div class="question-picture"></div>
                    <div class="answers-container"></div>
                </div> 
                `
        }

        if(request.resource==="author"){
           
           fragment = 
          ` <div class = "page-question">
                <div class="timer-box"> 
                    <span id="timer"> Время: 00 секунд</span>
                </div>
                <p class = "title"> Какую картину написал ${images[request.id].author} ? </p>
                <div class="answers-container"></div>
            </div>
            `
        }
        fragment +=   `
           <div class = "page-answer">
                <div class ="page-content">
                    <div class="answer-image">
                        <img class = "image-card" src = 'https://raw.githubusercontent.com/OValya/image-data/master/img/${request.id}.jpg' >
                        <img class = "image-icon">
                    </div>
                    <h2>${images[request.id].name}</h2>
                    <p>${images[request.id].author}, ${images[request.id].year}</p>
                    <button class ="next-button button" > Продолжить </button>
                </div>
            </div>

            <div class = "page-result">
                <div class ="page-content">
                    <div class="result-image">
                        <img class = "result-image-card" src = "" >
                    </div>
                    <h2></h2>
                    <p>Ваш результат: / 10 </p>
                    <button class ="result-button button" > Продолжить </button>
                </div>
            </div>`
     
        return fragment;
    }
    , afterRender: async () => {
        
        let request = Utils.parseRequestURL();

        //---------Timer-----//
        let timerView = document.getElementById('timer');
        showTimer(timerView);

        //----------окно ответа------------//
        let form = document.querySelector('.page-answer');
        form.innerHTML = `
        <div class ="page-content">
            <div class="answer-image">
                <img class = "image-card" src = 'https://raw.githubusercontent.com/OValya/image-data/master/img/${request.id}.jpg' >
                <img class = "image-icon">
            </div>
            <h2>${images[request.id].name}</h2>
            <p>${images[request.id].author}, ${images[request.id].year}</p>
            <button class ="next-button button" > Next </button>
        </div>`

        //-------------результаты----------//
        function renderResultPage(resultImageSrc, resultTitle, resultScore){
            let result = document.querySelector('.page-result');
            result.style.opacity = '0';
            result.style.zIndex = '-10';     
            result.innerHTML = `
            <div class ="page-content">
                <div class="result-image">
                    <img class = "result-image-card" src = ${resultImageSrc} >
                </div>
                <h2>${resultTitle}</h2>
                <p>Ваш результат: ${resultScore} / 10 </p>
                <button class ="result-button button" 
                    onclick= "window.location.href = './#/${request.resource}';" > 
                    Продолжить </button>
            </div>`
            result.style.opacity = '1';
            result.style.zIndex = '3';
        }
        
        let answerBox = document.querySelector('.answers-container');
        if(request.resource==="picture"){
            await getImage(request.id);
            getWrongAnswers(request.id, answerBox);
            getRightAnswer(request.id, answerBox);  
        }
        if(request.resource==="author"){
           await getWrongImages(request.id, answerBox);
           await getRightImage(request.id,  answerBox );
        }

        function changeScore(){
            if(request.resource === 'picture') {
                let numberCategory = Math.floor(request.id/10);
                let score = pictureCategory[numberCategory].getScore();
                pictureCategory[numberCategory].setScore(++score);
            }

            if(request.resource === 'author') {
                let numberCategory = Math.floor((request.id-120)/10);
                let score = authorCategory[numberCategory].getScore();
                authorCategory[numberCategory].setScore(++score);
            }

        }

        answerBox.addEventListener('click', (e)=>{
                if((e.target.nodeName === 'BUTTON'|| e.target.nodeName === 'DIV') && e.target.classList.contains('answer')){
                    stopTimer();
                    if(e.target.classList.contains('correct')) { 
                        showAnswerPage('correct'); changeScore();  
                    }else {
                        showAnswerPage('wrong'); 
                    }
                }
        })

        function setParamForRender(score){
            form.style.opacity = '0';
            form.style.zIndex = '-3';
            switch (score) {
                case '0':
                    renderResultPage('./assets/svg/finish-page/gameover.svg', 'Вы проиграли...', score);
                    playSound('gameover');
                    break;
                case 10:
                    renderResultPage('./assets/svg/finish-page/grand.svg', 'Топ результат! Ура!', score);
                    playSound('congratulation');
                    break;
                default:
                    renderResultPage('./assets/svg/finish-page/score.svg', 'Отличный результат!', score);
                    playSound('congratulation');
                    break;
            }
        }

        let next = document.querySelector('.next-button');
        next.addEventListener('click', (e) => 
         {  
            if(request.resource === 'picture') {
                let numberCategory = Math.floor(request.id/10);
                let endCategory = pictureCategory[numberCategory].end();
                if(+request.id < endCategory ){
                  window.location.href = `./#/picture/${+request.id + 1}`;
                } else {
                    localStorage.setItem(`picture${numberCategory}`, pictureCategory[numberCategory].getScore());
                    pictureCategory[numberCategory].isPlayed = 'played';
                    localStorage.setItem(`isPlayed${request.resource}${numberCategory}`, 'played');
                    setParamForRender(pictureCategory[numberCategory].getScore())
                } 
            }

            if(request.resource === 'author') {
                let numberCategory = Math.floor((request.id-120)/10);
                let endCategory = authorCategory[numberCategory].end();
                if(+request.id < endCategory ){
                  window.location.href = `./#/author/${+request.id + 1}`;
                } else {
                    localStorage.setItem(`author${numberCategory}`, authorCategory[numberCategory].getScore());
                    authorCategory[numberCategory].isPlayed = 'played';
                    localStorage.setItem(`isPlayed${request.resource}${numberCategory}`, 'played');
                    setParamForRender(authorCategory[numberCategory].getScore());
                }
            }
        });

    }
}

export {Question, showAnswerPage};