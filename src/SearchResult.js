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
              <img src=${cat.url} alt=${cat.name} />
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
    }
    // 호출된 결과가 없을 때
    else {
      this.$searchResult.innerHTML = `<p>검색 결과가 없습니다.</p>`;
    }
  }
}
