const Session = {
  getCat() {
    try {
      return JSON.parse(sessionStorage.getItem("catList"));
    } catch {
      return null;
    }
  },

  setCat(data) {
    const catList = JSON.stringify(data);
    sessionStorage.setItem("catList", catList);
  },

  getKeyWord() {
    try {
      const data = JSON.parse(sessionStorage.getItem("catKeyWord"));
      if (!data) {
        throw new Error();
      }
      return data;
    } catch {
      return [];
    }
  },

  setKeyWord(keyword) {
    try {
      const catKeyWord = Session.getKeyWord();
      if (catKeyWord.length === 5) {
        catKeyWord.shift();
      }
      catKeyWord.push(keyword);
      sessionStorage.setItem("catKeyWord", JSON.stringify(catKeyWord));
    } catch {
      return null;
    }
  },
};
