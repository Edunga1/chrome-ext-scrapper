export default class BookmarkStorage {
  constructor() {
    this.$bookmarks = [];
  }

  bookmarks() {
    return this.$bookmarks;
  }

  add(url) {
    const bookmark = { url };
    this.$bookmarks.push(bookmark);
    this.postAdd(bookmark);
  }
}
