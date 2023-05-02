"use strict";

import Home         from './views/pages/Home.js'
import Settings     from './views/pages/Settings.js'
import Categories     from './views/pages/Categories.js'
import {Question}     from './views/pages/Question.js'

import  {pictureCategory}  from './js/getAllSetsOfCategory.js';
import  {authorCategory}  from './js/getAllSetsOfCategory.js';

import Utils        from './services/Utils.js'


const routes = {
    '/'             : Home
    , '/settings'      : Settings
    , '/picture'      : Categories
    , '/author'      : Categories
    , '/picture/:id'          :Question  
    , '/author/:id'          :Question  
   
};

const router = async () => {

    const content = null || document.getElementById('page_container');
  
    let request = Utils.parseRequestURL()

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') 
   
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    
    content.innerHTML = await page.render();
    
    await page.afterRender();
  
}


window.addEventListener('hashchange', router);


window.addEventListener('load', router);
window.addEventListener('load', pictureCategory)
window.addEventListener('load', authorCategory)


console.log(`
    По моей оценке ТЗ выполнено на 135 баллов, по пунктам в пуллреквесте всё расписано.
    Нет страницы с результами 
    Соответственно, нет полноценной навигации 
    Нет доп функционала 
    Нет сложной анимации и плавной загрузки изображений 
`)