import BookmarkSource from './BookmarkSource';

const KEY_BOOKMARKS = 'KEY_BOOKMARKS';

export default class BookmarkStorage extends BookmarkSource {
  /**
   * @param {Storage} storage
   */
  constructor(storage) {
    super();
    this.storage = storage;
  }

  postAdd() {
    if (this.storage) {
      this.storage.setItem(KEY_BOOKMARKS, JSON.stringify(this.$bookmarks));
    }
  }
}
