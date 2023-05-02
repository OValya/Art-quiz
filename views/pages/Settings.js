let Settings = {
    render : async () => {
        let time;
        if(localStorage.getItem('time') != null){
           time  = (localStorage.getItem('time')=== 'Infinity')? 0 : localStorage.getItem('time');
        } else {time = 30}
        
        

        let view =  /*html*/`
        <div class="settings-page">
        <div class="settings-title-container">
            <a class = "back-to-start-page" href="#/">
                    
            </a>
            <p>Settings</p>
        </div> 
        <div class="settings">
            <div class="volume-container">
                <label class= "settings-item" for=""> Volume
                </label>
                <input class = "volume-range" type="range" value= "0.5" min = "0" max = "1" step="0.1">
                <input class="volume-mute-icon" type="button" value="">
                <input class="volume-up-icon" type="button" value="">

            </div>
            <div class="timer-container">
                <p class="settings-item"> Time game </p>
                <div class="timer-on-off-container">
                    <label class ="check" for="timer">On
                         <input class="check-input" type="checkbox"  id="timer" checked>
                         <span class="check-box"></span>
                    </label>
                </div>
                <p class="settings-item time-title"> Time to answer </p>
                <div class="number">
                    <button class="minus" type="button" > - </button>
                    <input class="timer-value" type="number" min="5" max="30" value="${time}" readonly step="5">
                    <button class="plus" type="button" >+</button>
                </div>
               <!-- <input class = "timer-num" type="number">  -->     
            </div>
            <div class="button-container-settings">
                <button class="default-settings-btn button button-settings"> Default </button>
                <button class="save-settings-btn button button-settings"> Save </button>
            </div>
        </div>
    </div>
        `
        return view
    },
    afterRender: async () => {
        
        let minusTime = document.querySelector('.minus');
        let plusTime = document.querySelector('.plus');
        let timerValue = document.querySelector('.timer-value');
        let check = document.querySelector('.check-input');
        let number = document.querySelector('.number');
        let timeTitle = document.querySelector('.time-title');
        let defaultSave =  document.querySelector('.default-settings-btn');

        
        if( localStorage.getItem('setTimer') != null){check.checked = (localStorage.getItem('setTimer')==='true') }
            else{check.checked = true; }
        
        check.addEventListener('change', () => {
            if(check.checked){
                number.style.opacity = '1';
                timeTitle.style.opacity = '1';
                number.style.transition = '0.3s';
            }else{
                number.style.opacity = '0';
                timeTitle.style.opacity = '0';
                number.style.transition = '0.3s';
            }

        })
        
        
        let volume = document.querySelector('.volume-range');

        function setVolume(value){
            volume.value = value;
            volume.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value*100}%, #fff ${value*100}%, white 100%)`;
        }

        if (localStorage.getItem('volume')){
            let value = localStorage.getItem('volume');
            setVolume(value);
          
        } else {
            setVolume(0.5);
          
        }
        volume.addEventListener('input', function() {
            let value = this.value;
            setVolume(value)
           
        })  
        
        let mute = document.querySelector('.volume-mute-icon');
        let loud = document.querySelector('.volume-up-icon');

        mute.addEventListener('click', () => {
            setVolume(0);
        })
        loud.addEventListener('click', () => {
            setVolume(1);
        })

        
        let save = document.querySelector('.save-settings-btn');
        save.addEventListener('click', (e) => {
            if(check.checked){
              localStorage.setItem('time', timerValue.value);
              localStorage.setItem('setTimer', 'true')
            } else {
                localStorage.removeItem('time');
                localStorage.setItem('setTimer', 'false')
            }

            localStorage.setItem('volume', volume.value);
        })

        defaultSave.addEventListener('click', ()=>{
            setVolume(0.5);
            check.checked = true;
            timerValue.value = '30';
            localStorage.setItem('time', timerValue.value);
            localStorage.setItem('setTimer', 'true');
            localStorage.setItem('volume', '0.5');
        })


        minusTime.addEventListener('click', (e) => {
            timerValue.stepDown(); 
            //timerValue.onchange();
        })
        
        plusTime.addEventListener('click', (e)=>{
            timerValue.stepUp(); 
            //timerValue.onchange();
        })



    }
        
}

export default Settings;