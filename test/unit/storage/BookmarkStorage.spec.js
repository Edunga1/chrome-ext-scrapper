import BookmarkStorage from '../../../src/storage/BookmarkStorage';

let $storage;
let $mockPersistentStorage;

describe('BookmarkStorage', () => {
  beforeEach(() => {
    $mockPersistentStorage = {
      setItem: jest.fn(),
    };
    $storage = new BookmarkStorage($mockPersistentStorage);
  });
  test('빈 북마크 목록 획득', () => {
    const bookmarks = $storage.bookmarks();
    expect(bookmarks).toEqual([]);
  });
  test('URL로 북마크 추가', () => {
    const result = $storage.add('http://www.google.com');
    expect(result).toBeUndefined();
    const bookmarks = $storage.bookmarks();
    expect(bookmarks).toHaveLength(1);
  });
  test('Storage 주입 테스트', () => {
    $storage.add('http://www.one.com');
    $storage.add('http://www.two.com');
    expect($mockPersistentStorage.setItem.mock.calls).toHaveLength(2);
  });
});
