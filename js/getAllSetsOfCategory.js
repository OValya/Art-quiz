 import Category     from '../views/components/Category.js'
 let getAllSetsOfCategory = (type) => {
    let isPlayed;
    let score;
    let startImage;
    let arrayOFCategory = [];
    if(type==='picture'){startImage = 0; }
    if(type==='author') {startImage = 120 }  
    for (let i = 0; i < 12; i++) {
        isPlayed = (localStorage.getItem(`isPlayed${type}${i}`))? localStorage.getItem(`isPlayed${type}${i}`): '';
        score = (localStorage.getItem(`${type}${i}`))? localStorage.getItem(`${type}${i}`): '0';
        let item =  new Category(i, `https://raw.githubusercontent.com/OValya/image-data/master/img/${i *10 + startImage}.jpg`, type, isPlayed, score);
        arrayOFCategory.push(item);
    }
    return arrayOFCategory;
}

let pictureCategory =  getAllSetsOfCategory('picture');
let authorCategory = getAllSetsOfCategory('author');
//}


export {pictureCategory, authorCategory} ;