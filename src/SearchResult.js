class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("main");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);
    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    // 초기 화면
    if (this.data === null) {
      this.$searchResult.innerHTML = "";
    }
    // 호출된 결과가 있을 때
    else if (this.data.length) {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat) => `
            <section class="item">
              <img class="img" data-lazy=${cat.url} alt=${cat.name} />
              <span class="cat-name">${cat.name}</span>
            </section>
          `
        )
        .join("");

      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
      });

      const images = document.querySelectorAll("img"); // 모든 이미지 파일 선택
      window.addEventListener("scroll", (event) => {
        images.forEach((img) => {
          const rect = img.getBoundingClientRect().top;
          if (rect <= window.innerHeight) {
            const src = img.getAttribute("data-lazy");
            img.setAttribute("src", src);
          }
        });
      });

      window.scrollTo(0, 1);
    }
    // 호출된 결과가 없을 때
    else {
      this.$searchResult.innerHTML = `<p>키워드가 없습니다..</p>`;
    }
  }
}
