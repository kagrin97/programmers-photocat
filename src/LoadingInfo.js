class LoadingInfo {
  $loadingInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $loadingInfo = document.createElement("div");
    $loadingInfo.className = "loading";
    this.$loadingInfo = $loadingInfo;
    this.data = data;
    this.$loadingInfo.style.display = "none";
    $target.appendChild($loadingInfo);

    this.render();
  }

  onChange() {
    if (this.$loadingInfo.style.display === "none") {
      this.$loadingInfo.style.display = "block";
    } else {
      this.$loadingInfo.style.display = "none";
    }
  }

  render() {
    this.$loadingInfo.innerHTML = `
      <div class="loading-text">현재 불러오는 중입니다...</div>
  `;
  }
}
