import BookmarkStorage from './storage/BookmarkStorage';

export default class ScrapperApp {
  constructor() {
    this.$bs = new BookmarkStorage(window.localStorage);
  }
}
