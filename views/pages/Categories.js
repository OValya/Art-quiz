import Utils        from '../../services/Utils.js'
import {images}         from '../../data/images.js'
import Category     from '../components/Category.js'
import  {pictureCategory}  from '../../js/getAllSetsOfCategory.js';
import  {authorCategory}  from '../../js/getAllSetsOfCategory.js';

let Categories = {
    render : async () => {   
        let allSets =[];
        let typeCategory = Utils.parseRequestURL().resource; //author || picture
        if(typeCategory==='picture'){
             allSets = pictureCategory;
        } else allSets = authorCategory;
        
        let allSetsView = allSets.reduce((view, current) => view + current.renderCategory(typeCategory) + '\n', '');
        
        let quiz =(typeCategory==='picture')? 'Картины': 'Авторы'
        let view = ` 
            <div class = "page-category">
             <div class="categories-button-container">
                <a class = "button-settings" href="#/">
                    <img class = "category-logo" src="./assets/svg/start-page/logo.svg" alt="">
                </a>
               <!-- <input class="score-icon" type="button" value="Score">-->
                <input class="settings-icon" type="button" value="" onclick="window.location.href='./#/settings'">
              </div>
              <p class = "title">Играем в квиз "${quiz}". Удачи! </p>
              <div class = "categories">
              ${allSetsView}
              </div>
            </div>
            `
        return view
            
           /* <section class="section">
                <h1> Post Id : ${post.id}</h1>
                <p> Post Title : ${post.title} </p>
                <p> Post Content : ${post.content} </p>
                <p> Post Author : ${post.name} </p>
            </section>
        `*/
    }
    , afterRender: async () => {
       // let settings = document.querySelector('.settings-icon');
       // settings.addEventListener
        
       /* let container = document.querySelector('.categories');
        container.addEventListener('click', (e)=>{
            if(e.target === 'img'){
                console.log()
            }
        }
        )*/

    }
}

export default Categories;