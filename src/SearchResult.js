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
        .map((cat, index) => {
          if (index < 8) {
            return `
              <section class="item">
                <img class="cat_img" src=${cat.url} alt=${cat.name} />
                <span class="cat-name">${cat.name}</span>
              </section>
              `;
          } else {
            return `
            <section class="item">
              <img class="cat_img" data-lazy=${cat.url} alt=${cat.name} />
              <span class="cat-name">${cat.name}</span>
            </section>
            `;
          }
        })
        .join("");

      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
      });

      let lazyloadImages = document.querySelectorAll(".cat_img");
      let lazyloadThrottleTimeout;

      function lazyload() {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
          let scrollTop = window.pageYOffset;

          lazyloadImages.forEach(function (img) {
            if (img.offsetTop < window.innerHeight + scrollTop) {
              const src = img.getAttribute("data-lazy");
              if (src) {
                img.setAttribute("src", src);
              }
            }
          });
          if (lazyloadImages.length == 0) {
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }

      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
    // 호출된 결과가 없을 때
    else {
      this.$searchResult.innerHTML = `<p>찾으시는 고양이가 없습니다!...</p>`;
    }
  }
}
