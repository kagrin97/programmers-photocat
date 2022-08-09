console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        try {
          this.loadingInfo.onChange();
          const { data } = await api.fetchCats(keyword);
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
          this.setState(data);
        } catch (e) {
          console.log(e);
        } finally {
          this.loadingInfo.onChange();
        }
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: null,
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
  }
}
