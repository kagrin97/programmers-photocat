class Carousel {
  index = 0;
  catList;

  constructor({ $target, initialData }) {
    const $prevButton = document.createElement("button");
    const $nextButton = document.createElement("button");
    const $buttonContainer = document.createElement("section");

    const $carouselContainer = document.createElement("section");
    const $carousel = document.createElement("article");

    $prevButton.className = "prevButton";
    $nextButton.className = "nextButton";
    $buttonContainer.classList = "buttonContainer";

    $carouselContainer.className = "carouselContainer";
    $carousel.classList = "carousel";

    this.$prevButton = $prevButton;
    this.$nextButton = $nextButton;
    this.$buttonContainer = $buttonContainer;

    this.$carouselContainer = $carouselContainer;
    this.$carousel = $carousel;

    this.$prevButton.innerText = "Prev";
    this.$nextButton.innerText = "Next";

    this.$prevButton.addEventListener("click", () => {
      this.prev();
    });

    this.$nextButton.addEventListener("click", () => {
      this.next();
    });

    this.$buttonContainer.appendChild(this.$prevButton);
    this.$buttonContainer.appendChild(this.$nextButton);
    this.$carouselContainer.appendChild(this.$carousel);

    $target.appendChild(this.$carouselContainer);
    $target.appendChild(this.$buttonContainer);

    this.get50Cats();
  }

  async get50Cats() {
    try {
      const { data } = await api.fetchCat50();
      this.catList = data.slice(0, 5);
      this.render();
    } catch (e) {
      console.log(e);
    }
  }

  prev() {
    if (this.index === 0) return;
    this.index -= 1;

    this.$carousel.style.transform = `translate3d(-${
      500 * this.index
    }px, 0, 0)`;
  }

  next() {
    if (this.index === 4) return;
    this.index += 1;

    this.$carousel.style.transform = `translate3d(-${
      500 * this.index
    }px, 0, 0)`;
  }

  render() {
    // 초기 화면
    if (this.catList === null) {
      this.$carouselContainer.innerHTML = "불러오는중..";
    } else {
      this.$carousel.innerHTML = this.catList
        .map((cat, index) => {
          return `
                <div class='carousel_item'>
                    <img src=${cat.url} alt=${cat.name} />
                </div>
              `;
        })
        .join("");
    }
  }
}
