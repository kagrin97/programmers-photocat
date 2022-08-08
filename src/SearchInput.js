const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    const $darkBtn = document.createElement("input");
    this.$darkBtn = $darkBtn;
    this.$darkBtn.type = "checkbox";

    $darkBtn.className = "darkBtn";
    $searchInput.className = "SearchInput";
    $target.appendChild($darkBtn);
    $target.appendChild($searchInput);

    // os가 다크모드인지 판단하는 함수
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("color-theme", "dark");
      $darkBtn.checked = true; // 체크박스 체크
    } else {
      document.documentElement.setAttribute("color-theme", "light");
    }

    // 다크모드 토글
    $darkBtn.addEventListener("click", (e) => {
      if (e.target.checked) {
        document.documentElement.setAttribute("color-theme", "dark");
      } else {
        document.documentElement.setAttribute("color-theme", "light");
      }
    });

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    console.log("SearchInput created.", this);
  }
  render() {}
}
