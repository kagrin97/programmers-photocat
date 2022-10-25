const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, keyword, onSearch, onClick }) {
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

    const $keyword = document.createElement("div");
    this.$keyword = $keyword;
    this.word = keyword;

    $darkBtn.className = "darkBtn";
    $randomBtn.className = "randomBtn";
    $searchInput.className = "SearchInput";

    $target.appendChild($darkBtn);
    $target.appendChild($randomBtn);
    $target.appendChild($searchInput);
    $target.appendChild($keyword);

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

    // 검색어가 있을때 클릭하면 검색문자 삭제
    $searchInput.addEventListener("click", (e) => {
      if ($searchInput.value) {
        $searchInput.value = null;
      }
    });

    this.onSearch = onSearch;

    // 랜덤 50 버튼 이벤트
    this.$randomBtn.addEventListener("click", () => {
      onClick();
    });

    this.render();
  }

  setState() {
    this.word = Session.getKeyWord();
    this.render();
  }

  render() {
    // 초기 화면
    if (this.word === null) {
      this.$keyword.innerHTML = "";
    }
    // 호출된 결과가 있을 때
    else if (this.word.length) {
      this.$keyword.innerHTML = this.word
        .map(
          (word) => `
              <button class="keyword">${word}</button>
          `
        )
        .join("");

      this.$keyword.querySelectorAll(".keyword").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onSearch(this.word[index]);
        });
      });
    }
  }
}
