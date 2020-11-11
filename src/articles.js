
// Initialize the news API parameters
let apiKey = "ad73f35f96c244529436254ebe21c34c";

// News container
let newsSection = document.getElementById('top_news');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${apiKey}`, true);

// On document load

xhr.onload = function () {
    if(this.status === 200) {
        let json = JSON.parse(this.responseText);
        
        let articles = json.articles;
        let newsHtml = "";
        articles.forEach(function(element) {
            let news = `
                <div class="single-news">
                    <h4>${element.title}</h4>
                    <img src="${element.urlToImage}" alt="${element.title}">
                    <p>${element.description}</p>
                    <a href="${element.url}">More</a>
                </div>
            `;
            newsHtml += news;
        }); 
        newsSection.innerHTML = newsHtml;
    }
    else {
        console.log('error');
    }
}

xhr.send();

