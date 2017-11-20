(function () {
    'use strict';

    app.storage({
        saver: localStorageSaver,
        loader: localStorageLoader
    });

    var localStorage = window.localStorage;

    function localStorageSaver(url, data) {
        var json = JSON.stringify(data);
        localStorage.setItem(url, json);
    }

    function localStorageLoader(url) {
        var data = JSON.parse(localStorage.getItem(url));
        return data;
    }
})();
