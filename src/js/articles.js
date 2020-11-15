// Initialize the news API parameters
let apiKey = "ad73f35f96c244529436254ebe21c34c";

// News container
let newsSection = document.getElementById("top_news");

//Set default country
let country = gb;

//Section title
let title = document.getElementById("section_title");

const languages = ["us", "gb"];

// List of all news categories business entertainment general health science sports technology
const categories = [
  { name: "Entertainment", slug: "entertainment" },
  { name: "General", slug: "general" },
  { name: "Health", slug: "health" },
  { name: "Science", slug: "science" },
  { name: "Sports", slug: "sports" },
  { name: "Technology", slug: "technology" },
  { name: "Business", slug: "business" },
];

// Store articles in local storage
const storeNews = (news) => {
  const storedNews = {};

  languages.forEach((lang) => {
    storedNews[lang] = news;
  });

  const storedNewsString = JSON.stringify(storedNews);

  localStorage.setItem("articles", storedNewsString);
};

// Get single article
const getSingleArticle = (url) => {
  // Get articles from local storage
  var data = JSON.parse(localStorage.getItem("articles"));

  let newsTitle = "";
  let newsContent = "";

  data.gb.forEach(function (element) {
    if (element.url === url) {

      //check if content exsist
      if(element.title){
        newsTitle = element.title
      }
      if(element.content){
        newsContent = element.content
      }

      let singleNews = `
            <div class="news-full">
                <img src="${element.urlToImage}" alt="${newsTitle}">
                <p>${newsContent}</p>
                <button onclick="window.location.reload();">< Back to list</button>
            </div>
        `;

      newsSection.empty;
      title.value = element.title;
      title.innerHTML = title.value;
      newsSection.innerHTML = singleNews;
    }
  });
};

// Get news for categories

let categoriesItem = document.getElementById("categories");

categoriesItem.onclick = function () {
  let active_item = document.getElementsByClassName("nav-item");
  var activesLength = active_item.length - 1;
  for (var i = 0; i <= activesLength; i++) {
    active_item[i].classList.remove("active");
  }

  this.classList.add("active");
  let categoryHtml = "";
  title.innerHTML = "Top 5 news by categories from GB";

  categories.forEach(function (element) {
    let slug = element.slug;
    let categoryName = element.name;
    let category = `
        <div class="single-category">
            <button class="accordion">${categoryName}</button>
            <div id="${slug}" class="panel"></div>
        </div>`;
    categoryHtml += category;

    // Create an ajax get request - get 5 news for each category

    async function getCategoriesNews() {
      let response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=gb&category=${slug}&pageSize=5&apiKey=${apiKey}`
      );
      let data = await response.json();
      return data;
    }

    getCategoriesNews().then((data) => {
      let articles = data.articles;
      let newsHtml = "";
      let newsTitle = "";
      let newsDesc = "";
      let categorySection = document.getElementById(slug);
      articles.forEach(function (element) {

        //check if content exist
        if(element.title){
          newsTitle = element.title
        }
        if(element.description){
          newsDesc = element.description
        }

        let news = `
                    <div class="single-news">
                        <h4>${newsTitle}</h4>
                        <img src="${element.urlToImage}" alt="${newsTitle}">
                        <p>${newsDesc}</p>
                        <button onclick="getSingleArticle('${element.url}')">More ></button>
                    </div>`;
        newsHtml += news;
      });
      categorySection.innerHTML = newsHtml;
    });
  });

  newsSection.empty;
  newsSection.innerHTML = categoryHtml;
  addAccordions();
};

// Bind function on global window element
window.getSingleArticle = getSingleArticle;

//Get Top news
async function getTopNews() {
  let response = await fetch(
    `https://newsapi.org/v2/top-headlines?pageSize=9&country=gb&apiKey=${apiKey}`
  );
  let data = await response.json();
  return data;
}

getTopNews().then((data) => {
  let articles = data.articles;
  let newsHtml = "";
  articles.forEach(function (element) {
    let news = `
              <div class="single-news">
                  <h4>${element.title}</h4>
                  <img src="${element.urlToImage}" alt="${element.title}">
                  <p>${element.description}</p>
                  <button onclick="getSingleArticle('${element.url}')">More ></button>
              </div>`;
    newsHtml += news;
  });
  newsSection.innerHTML = newsHtml;
});
