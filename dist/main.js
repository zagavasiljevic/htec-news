(window.addAccordions = function () {
  var e,
    t = document.getElementsByClassName("accordion");
  for (e = 0; e < t.length; e++)
    t[e].addEventListener("click", function () {
      this.classList.toggle("active");
      var e = this.nextElementSibling;
      e.style.maxHeight
        ? (e.style.maxHeight = null)
        : (e.style.maxHeight = e.scrollHeight + "px");
    });
}),
  (() => {
    let e = "ad73f35f96c244529436254ebe21c34c",
      t = document.getElementById("top_news"),
      n = (gb, document.getElementById("section_title"));
    const i = ["us", "gb"],
      l = [
        { name: "Entertainment", slug: "entertainment" },
        { name: "General", slug: "general" },
        { name: "Health", slug: "health" },
        { name: "Science", slug: "science" },
        { name: "Sports", slug: "sports" },
        { name: "Technology", slug: "technology" },
        { name: "Business", slug: "business" },
      ];
    (window.getSingleArticle = (e) => {
      var i = JSON.parse(localStorage.getItem("articles"));
      let l = "",
        s = "";
      i.gb.forEach(function (i) {
        if (i.url === e) {
          i.title && (l = i.title), i.content && (s = i.content);
          let e = `\n            <div class="news-full">\n                <img src="${i.urlToImage}" alt="${l}">\n                <p>${s}</p>\n                <button onclick="window.location.reload();">< Back to list</button>\n            </div>\n        `;
          t.empty,
            (n.value = i.title),
            (n.innerHTML = n.value),
            (t.innerHTML = e);
        } else console.log("greska");
      });
    }),
      (document.getElementById("categories").onclick = function () {
        let i = document.getElementsByClassName("nav-item");
        for (var s = i.length - 1, a = 0; a <= s; a++)
          i[a].classList.remove("active");
        this.classList.add("active");
        let c = "";
        (n.innerHTML = "Top 5 news by categories from GB"),
          l.forEach(function (t) {
            let n = t.slug,
              i = t.name;
            (c += `\n        <div class="single-category">\n            <button class="accordion">${i}</button>\n            <div id="${n}" class="panel"></div>\n        </div>`),
              (async function () {
                let t = await fetch(
                  `https://newsapi.org/v2/top-headlines?country=gb&category=${n}&pageSize=5&apiKey=${e}`
                );
                return await t.json();
              })().then((e) => {
                let t = e.articles,
                  i = "",
                  l = "",
                  s = "",
                  a = document.getElementById(n);
                t.forEach(function (e) {
                  e.title && (l = e.title),
                    e.description && (s = e.description);
                  let t = `\n                    <div class="single-news">\n                        <h4>${l}</h4>\n                        <img src="${e.urlToImage}" alt="${l}">\n                        <p>${s}</p>\n                        <button onclick="getSingleArticle('${e.url}')">More ></button>\n                    </div>`;
                  i += t;
                }),
                  (a.innerHTML = i);
              });
          }),
          t.empty,
          (t.innerHTML = c),
          addAccordions();
      }),
      (async function () {
        let t = await fetch(
          "https://newsapi.org/v2/top-headlines?pageSize=9&country=gb&apiKey=" +
            e
        );
        return await t.json();
      })().then((e) => {
        let n = e.articles,
          l = "";
        ((e) => {
          const t = {};
          i.forEach((n) => {
            t[n] = e;
          });
          const n = JSON.stringify(t);
          localStorage.setItem("articles", n);
        })(n),
          n.forEach(function (e) {
            let t = `\n              <div class="single-news">\n                  <h4>${e.title}</h4>\n                  <img src="${e.urlToImage}" alt="${e.title}">\n                  <p>${e.description}</p>\n                  <button onclick="getSingleArticle('${e.url}')">More ></button>\n              </div>`;
            l += t;
          }),
          (t.innerHTML = l);
      });
  })();
