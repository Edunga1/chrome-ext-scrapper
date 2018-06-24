/**
 * @typedef PageStorage
 * @property {function(string, any):number} save
 * @property {function(string):any} load
 */
var app = (function () {
    'use strict';

    var app = {
        storage: storageStrategy,
        controller: controllerStrategy
    };

    var storageService = {
        save: null,
        load: null
    };

    window.onload = onload;

    return app;

    function onload() {
        // parsing page information on load
        chrome.tabs.executeScript(
            null,
            {file: 'parser.js'}
        );
    }

    /**
     * @typedef AppStorage
     * @property {function} saver
     * @property {function} loader
     */
    /**
     * @param {AppStorage} storage
     */
    function storageStrategy(storage) {
        except();

        storageService.save = storage.saver;
        storageService.load = storage.loader;

        return app;

        function except() {
            var services = ['saver', 'loader'];

            var res = services.every(svc =>
                typeof storage[svc] === 'function');

            if (!res) {
                throw 'storage is invalid!';
            }
        }
    }

    /**
     * @param {string} message
     * @param {function} method
     */
    function controllerStrategy(message, method) {
        chrome.runtime.onMessage.addListener(function (req, sender) {
            if (req.action !== message) {
                return;
            }

            if (typeof method === 'function') {
                method(req.source, storageService);
            }
        });
    }
})();
