console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.header = new Header({
      $target,
      keyword: Session.getKeyWord(),
      onSearch: async (keyword) => {
        try {
          this.loadingInfo.onChange();
          const { data } = await api.fetchCats(keyword);
          Session.setCat(data);
          Session.setKeyWord(keyword);
          this.setState(data);
        } catch (e) {
          console.log(e);
        } finally {
          this.loadingInfo.onChange();
        }
      },
      onClick: async () => {
        try {
          this.loadingInfo.onChange();
          const { data } = await api.fetchCat50();
          Session.setCat(data);
          this.setState(data);
        } catch (e) {
          console.log(e);
        } finally {
          this.loadingInfo.onChange();
        }
      },
    });

    this.carousel = new Carousel({ $target });

    this.searchResult = new SearchResult({
      $target,
      initialData: Session.getCat(),
      onClick: async (image) => {
        try {
          this.loadingInfo.onChange();
          const { data } = await api.fetchCatDetails(image.id);
          this.imageInfo.setState({ visible: true, image: data });
        } catch (e) {
          console.log(e);
        } finally {
          this.loadingInfo.onChange();
        }
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.loadingInfo = new LoadingInfo({
      $target,
      data: {
        visible: false,
      },
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
    this.header.setState();
  }
}
