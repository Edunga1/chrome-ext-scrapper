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
     * @return {boolean} Index of scrap in list
     */
    var _getScrapIndex = function (url) {
        var res = -1;

        _scraps.find(function (scrap, index) {
            if (scrap.url == url) {
                res = index;
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
        var scrapIndex = _getScrapIndex(url);

        if (scrapIndex == -1) {
            scrapIndex = _scraps.length;
        }

        _scraps[scrapIndex][_STORAGE_SCRAP_URL] = url;
        _scraps[scrapIndex][_STORAGE_SCRAP_TITLE] = title;
        _sync();
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

        _newScrap(url, title);

        return this;
    };

    /**
     * @return {boolean} Scrap exists in storage
     */
    _Scrapper.prototype.isDuplicate = function () {
        return _isDuplicate() != -1;
    };

    /**
     * Attach tag to the scrap
     * @param {string} url scrap url
     * @param {string} tag tag
     */
    _Scrapper.prototype.addTag = function (url, tag) {
        var index = _getScrapIndex(url);

        if (index != -1 && tag.trim().length > 0) {
            scrap = _scraps[index];

            if (!scrap.tags) {
                scrap.tags = [];
            }

            if (scrap.tags.indexOf(tag) == -1) {
                scrap.tags.push(tag);
                _sync();
            }

        }

        return this;
    };

    return new _Scrapper();
})(localStorage, JSON);
