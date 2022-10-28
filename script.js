const APP_ID = "ccd7787f";
const APP_KEY = "0135eacfd733f2911894b89d48bd3991";
const searchForm = document.querySelector('#search-frm');
const searchResultDiv = document.querySelector("#search-result");
const container = document.querySelector('.container');
let searchQuery = '';

searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    searchQuery = e.target.search.value;
    if(searchQuery != ''){
        fetchAPI(searchQuery);
    }else{
        alert('please enter recipe name');
    }
});

async function fetchAPI(searchTerm){
    const baseUrl = `https://api.edamam.com/search?q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(baseUrl);
    const data = await(response.json());
    generateHTML(data.hits);
    console.log(data.hits);
}

function generateHTML(results){
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
        `
        <div class="card" id="search-result">
            <div class="face face1 text-center">
                <div class="content">
                    <img src="${result.recipe.image}" alt="alt text">
                </div>
            </div>
            <div class="face face2 text-center">
                <div class="content">
                    <p>${result.recipe.label}</p>
                    <a href="${result.recipe.url}">View Recipe</a>
                </div>
            </div>
        </div>
        `
    });
    searchResultDiv.innerHTML = generatedHTML;
}