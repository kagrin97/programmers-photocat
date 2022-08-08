class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("section");

    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.render();

    this.$imageInfo.addEventListener("click", (e) => {
      if (
        e.target.className === "ImageInfo" ||
        e.target.className === "close"
      ) {
        this.modalOut();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        this.modalOut();
      }
    });
  }

  // 모달을 사라지게 하고 애니메이션 실행후 제거
  modalOut() {
    this.$imageInfo.classList.add("fade-out-box");
    setTimeout(() => {
      while (this.$imageInfo.hasChildNodes()) {
        this.$imageInfo.removeChild(this.$imageInfo.firstChild);
      }
      this.$imageInfo.classList.remove("fade-out-box");
      this.$imageInfo.style.display = "none";
    }, 1000);
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
          <article class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </article>`;

      // 모달창을 보여주고 애니메이션 실행후 제거
      this.$imageInfo.style.display = "block";
      this.$imageInfo.classList.add("fade-in-box");
      setTimeout(() => {
        this.$imageInfo.classList.remove("fade-in-box");
      }, 1000);
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
