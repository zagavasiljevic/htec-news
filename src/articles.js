// Initialize the news API parameters
let apiKey = "ad73f35f96c244529436254ebe21c34c";

// News container
let newsSection = document.getElementById("top_news");

//Set default country
let country = gb;

//Section title
let title = document.getElementById("section_title");

// Create an ajax get request
let xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  `https://newsapi.org/v2/top-headlines?pageSize=9&country=gb&apiKey=${apiKey}`,
  true
);

const languages = ["us", "gb"];

// List of all news categories business entertainment general health science sports technology
const categories = [
  { name: "Business", slug: "business" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "General", slug: "general" },
  { name: "Health", slug: "health" },
  { name: "Science", slug: "science" },
  { name: "Sports", slug: "sports" },
  { name: "Technology", slug: "technology" },
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

  data.gb.forEach(function (element) {
    if (element.url === url) {
      let singleNews = `
            <div class="news-full">
                <img src="${element.urlToImage}" alt="${element.title}">
                <p>${element.content}</p>

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
  let categoryHtml = "";

  categories.forEach(function (element) {
    let slug = element.slug;
    let categoryName = element.name;
    let category = `
        <div class="single-category">
            <h4>${categoryName}</h4>
            <div id="${slug}"></div>
        </div>`;
    categoryHtml += category;

    // Create an ajax get request - get 5 news for each category
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        let json = JSON.parse(xhr.responseText);
        let articles = json.articles;
        let newsHtml = "";
        let categorySection = document.getElementById(slug);
        articles.forEach(function (element) {
          let news = `
                        <div class="single-news">
                            <h4>${element.title}</h4>
                            <img src="${element.urlToImage}" alt="${element.title}">
                            <p>${element.description}</p>
                        </div>`;
          newsHtml += news;
        });

        categorySection.innerHTML = newsHtml;
      } else {
        console.log("nema categ");
      }
    });

    xhr.open(
      "GET",
      `https://newsapi.org/v2/top-headlines?country=gb&category=${slug}&pageSize=5&apiKey=${apiKey}`,
      true
    );

    xhr.send();
  });

  newsSection.empty;
  newsSection.innerHTML = categoryHtml;
};

// Bind function on global window element
window.getSingleArticle = getSingleArticle;

// On document load
xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);

    let articles = json.articles;
    storeNews(articles);
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
  } else {
    console.log("error");
  }
};

xhr.send();
