const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onClick }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.setAttribute("autofocus", "autofocus"); // 자동으로 포커스를 줌

    const $darkBtn = document.createElement("input"); // 다크버튼
    this.$darkBtn = $darkBtn;
    this.$darkBtn.type = "checkbox";

    const $randomBtn = document.createElement("button"); // 랜덤버튼
    this.$randomBtn = $randomBtn;
    this.$randomBtn.innerText = "50 랜덤";

    $darkBtn.className = "darkBtn";
    $randomBtn.className = "randomBtn";
    $searchInput.className = "SearchInput";

    $target.appendChild($darkBtn);
    $target.appendChild($randomBtn);
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

    // 검색 이벤트
    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    // 랜덤 50 버튼 이벤트
    this.$randomBtn.addEventListener("click", () => {
      onClick();
    });
  }
  render() {}
}
