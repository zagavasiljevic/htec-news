(() => {
  let e = "ad73f35f96c244529436254ebe21c34c",
    n = document.getElementById("top_news"),
    t = new XMLHttpRequest();
  t.open(
    "GET",
    "https://newsapi.org/v2/top-headlines?pageSize=6&country=gb&apiKey=" + e,
    !0
  );
  const s = ["us", "gb"],
    l = [
      { name: "Business", slug: "business" },
      { name: "Entertainment", slug: "entertainment" },
      { name: "General", slug: "general" },
      { name: "Health", slug: "health" },
      { name: "Science", slug: "science" },
      { name: "Sports", slug: "sports" },
      { name: "Technology", slug: "technology" },
    ];
  (document.getElementById("categories").onclick = function () {
    l.forEach(function (t) {
      let s = t.slug,
        l = (t.name, new XMLHttpRequest());
      l.addEventListener("load", () => {
        if (200 === l.status) {
          let e = JSON.parse(l.responseText).articles,
            t = "";
          e.forEach(function (e) {
            let n = `\n                        <div class="single-news">\n                            <h4>${e.title}</h4>\n                            <img src="${e.urlToImage}" alt="${e.title}">\n                            <p>${e.description}</p>\n                        </div>`;
            t += n;
          }),
            (n.innerHTML = ""),
            (n.innerHTML = t);
        } else console.log("nema categ");
      }),
        l.open(
          "GET",
          `https://newsapi.org/v2/top-headlines?country=gb&category=${s}&pageSize=5&apiKey=${e}`,
          !0
        ),
        l.send();
    });
  }),
    (window.getSingleArticle = (e) => {
      JSON.parse(localStorage.getItem("articles")).gb.forEach(function (t) {
        if (t.url === e) {
          let e = `\n            <div class="single-news">\n                <h4>${t.title}</h4>\n                <img src="${t.urlToImage}" alt="${t.title}">\n                <p>${t.content}</p>\n            </div>\n        `;
          n.empty, (n.innerHTML = e);
        } else console.log("Greska");
      });
    }),
    (t.onload = function () {
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
          let n = `\n                <div class="single-news">\n                    <h4>${e.title}</h4>\n                    <img src="${e.urlToImage}" alt="${e.title}">\n                    <p>${e.description}</p>\n                    <button onclick="getSingleArticle('${e.url}')">more</button>\n                </div>`;
          t += n;
        }),
          (n.innerHTML = t);
      } else console.log("error");
    }),
    t.send();
})();
