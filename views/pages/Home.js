
let Home = {
    render : async () => {
       // let posts = await getPostsList()
        let view =  /*html*/`
    <div class="start-page">
        <div class="settings-button-container">
            <input class="settings-icon" type="button" value="">
        </div>
        <img class = "logo" src="./assets/svg/start-page/logo.svg" alt="">
        <div class="button-container">
                <button class="category-artist-btn button">Квиз \"Авторы\"</button>
                <button class="category-pictures-btn button">Квиз \"Картины\"</button>
        </div>
        <div class="footer-row">
                <a href="https://rs.school/russia/">
                    <img
                        src="./assets/svg/footer/rss_logo.svg"
                        alt="rsscholl logo"
                        width="80px"
                    />
                </a>
            <h2> 2021 </h2>
            <a href="https://github.com/OValya">
                <img src="./assets/svg/footer/github.svg" alt="my github" width="80px" />
            </a>
        </div>
    </div>
        
        `
        return view
    }
    , afterRender: async () => {
        let iconSettings = document.querySelector('.settings-icon');
        let categoryPictureQuiz = document.querySelector('.category-pictures-btn');
        let categoryArtistsQuiz = document.querySelector('.category-artist-btn');
        iconSettings.addEventListener('click', (e) => {
            window.location.href = "./#/settings";             
         });

        categoryPictureQuiz.addEventListener('click', (e) => {
            window.location.href = "./#/picture";
        });
        categoryArtistsQuiz.addEventListener('click', (e) => {
            window.location.href = "./#/author";
        });


    }

}

export default Home;