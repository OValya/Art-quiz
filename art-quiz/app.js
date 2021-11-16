"use strict";

import Home         from './views/pages/Home.js'
import Settings     from './views/pages/Settings.js'
import Error404     from './views/pages/Error404.js'
import Categories     from './views/pages/Categories.js'
import Question     from './views/pages/Question.js'

import Register     from './views/pages/Register.js'


import Navbar       from './views/components/Navbar.js'
import Bottombar    from './views/components/Bottombar.js' 

import Utils        from './services/Utils.js'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'             : Home
    , '/settings'      : Settings
    , '/picture-quiz'      : Categories
    , '/picture-quiz/:id'          :Question  
   // , '/register'   : Register
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
  //  const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
  //  const footer = null || document.getElementById('footer_container');
    
    // Render the Header and footer of the page
  /*  header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();*/


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    console.log(request.resource);
    console.log(request.id);
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    
    content.innerHTML = await page.render();
    await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);