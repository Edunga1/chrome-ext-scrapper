var scrapper = (function (storage, JSON) {

    //- constraints

    // Scrap list key name in storage
    var _STORAGE_SCRAPS = 'scraps';

    // Scrap URL Key name in scrap list
    var _STORAGE_SCRAP_URL = 'url';

    // Scrap title key name in scrap list
    var _STORAGE_SCRAP_TITLE = 'title';

    //- privates

    /**
     * Scrap list
     * @type {Array<Object>}
     */
    var _scraps = (function () {
        var listJSON = storage.getItem(_STORAGE_SCRAPS);
        return listJSON ? JSON.parse(listJSON) : [];
    })();

    /**
     * @return {boolean} Scrap exists in storage
     */
    var _isDuplicate = function (url) {
        var res = false;

        _scraps.find(function (scrap) {
            if (scrap.url == url) {
                res = true;
                return true; // break traverse
            }
        });

        return res;
    };

    /**
     * Sync with storage
     */
    var _sync = function () {
        storage.setItem(_STORAGE_SCRAPS, JSON.stringify(_scraps));
    };

    /**
     * Create new scrap to storage
     * @param {string} url scrap url
     * @param {string} title scrap title
     */
    var _newScrap = function (url, title) {
        var scrap = {};

        if (_isDuplicate(url)) {
            return false;
        }

        scrap[_STORAGE_SCRAP_URL] = url;
        scrap[_STORAGE_SCRAP_TITLE] = title;
        _scraps.push(scrap);
        _sync();

        return true;
    };

    //- module implementation
    var _Scrapper = function () {};

    /**
     * Scrap
     * @param {string} url scrap url
     * @param {string} title scrap title
     * @return {boolean} success or fail
     */
    _Scrapper.prototype.scrap = function (url, title) {
        if (!storage || !JSON) {
            return false;
        }

        return _newScrap(url, title);
    };

    /**
     * @return {boolean} Scrap exists in storage
     */
    _Scrapper.prototype.isDuplicate = _isDuplicate;

    return new _Scrapper();
})(localStorage, JSON);
