(() => {
  let e = "ad73f35f96c244529436254ebe21c34c",
    n = document.getElementById("top_news"),
    t = (gb, document.getElementById("section_title")),
    l = new XMLHttpRequest();
  l.open(
    "GET",
    "https://newsapi.org/v2/top-headlines?pageSize=9&country=gb&apiKey=" + e,
    !0
  );
  const s = ["us", "gb"],
    i = [
      { name: "Business", slug: "business" },
      { name: "Entertainment", slug: "entertainment" },
      { name: "General", slug: "general" },
      { name: "Health", slug: "health" },
      { name: "Science", slug: "science" },
      { name: "Sports", slug: "sports" },
      { name: "Technology", slug: "technology" },
    ];
  (document.getElementById("categories").onclick = function () {
    let t = "";
    i.forEach(function (n) {
      let l = n.slug,
        s = n.name;
      t += `\n        <div class="single-category">\n            <h4>${s}</h4>\n            <div id="${l}"></div>\n        </div>`;
      let i = new XMLHttpRequest();
      i.addEventListener("load", () => {
        if (200 === i.status) {
          let e = JSON.parse(i.responseText).articles,
            n = "",
            t = document.getElementById(l);
          e.forEach(function (e) {
            let t = `\n                        <div class="single-news">\n                            <h4>${e.title}</h4>\n                            <img src="${e.urlToImage}" alt="${e.title}">\n                            <p>${e.description}</p>\n                        </div>`;
            n += t;
          }),
            (t.innerHTML = n);
        } else console.log("nema categ");
      }),
        i.open(
          "GET",
          `https://newsapi.org/v2/top-headlines?country=gb&category=${l}&pageSize=5&apiKey=${e}`,
          !0
        ),
        i.send();
    }),
      n.empty,
      (n.innerHTML = t);
  }),
    (window.getSingleArticle = (e) => {
      JSON.parse(localStorage.getItem("articles")).gb.forEach(function (l) {
        if (l.url === e) {
          let e = `\n            <div class="news-full">\n                <img src="${l.urlToImage}" alt="${l.title}">\n                <p>${l.content}</p>\n\n                <button onclick="window.location.reload();">< Back to list</button>\n            </div>\n        `;
          n.empty,
            (t.value = l.title),
            (t.innerHTML = t.value),
            (n.innerHTML = e);
        }
      });
    }),
    (l.onload = function () {
      if (200 === this.status) {
        let e = JSON.parse(this.responseText).articles;
        ((e) => {
          const n = {};
          s.forEach((t) => {
            n[t] = e;
          });
          const t = JSON.stringify(n);
          localStorage.setItem("articles", t);
        })(e);
        let t = "";
        e.forEach(function (e) {
          let n = `\n                <div class="single-news">\n                    <h4>${e.title}</h4>\n                    <img src="${e.urlToImage}" alt="${e.title}">\n                    <p>${e.description}</p>\n                    <button onclick="getSingleArticle('${e.url}')">More ></button>\n                </div>`;
          t += n;
        }),
          (n.innerHTML = t);
      } else console.log("error");
    }),
    l.send();
})();
