var scrapper = (function (storage, JSON) {

    //- constraints

    // 저장소 URL 키 접두사
    var _STORAGE_URL_PREFIX = '@';
    // 저장소 스크랩 키 타이틀
    var _STORAGE_SCRAP_TITLE = 'title';

    //- privates

    /**
     * 저장소에 스크랩 정보 JSON 저장
     * @param {string} url 주소
     * @param {string} property 스크랩 속성
     * @param {string} value 값
     */
    var _setScrap = function (url, property, value) {
        var storageKey = _STORAGE_URL_PREFIX + url;
        var data;

        if (!storage || !JSON) {
            return false;
        }

        data = storage.getItem(storageKey);
        if (!data) {
            data = {};
        } else {
            data = JSON.parse(data);
        }

        data[property] = value;
        storage.setItem(storageKey, JSON.stringify(data));

        return true;
    };

    //- module implementation
    var _Scrapper = function () {

    };

    /**
     * 스크랩
     * @param {string} url 주소
     * @param {string} title 타이틀
     * @return {boolean} 스크랩 성공 여부
     */
    _Scrapper.prototype.scrap = function (url, title) {
        if (!storage) {
            return false;
        }

        return _setScrap(url, _STORAGE_SCRAP_TITLE, title);
    };

    return new _Scrapper();
})(localStorage, JSON);
