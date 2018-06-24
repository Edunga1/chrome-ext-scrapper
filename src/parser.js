var Page = (function () {

    var _Page = function (doc) {
        this.title = doc.title;
        this.url = doc.location.href;
    };

    return _Page;
})();

chrome.runtime.sendMessage({
    action: 'tag-parsing',
    source: new Page(document)
});
