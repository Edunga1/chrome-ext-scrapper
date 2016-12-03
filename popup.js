chrome.runtime.onMessage.addListener(function (req, sender) {
    var page = req.source;

    if (!page) {
        return;
    }

    var res = scrapper.scrap(page.url, page.title);
    if (res) {
        var elSavedContents = document.querySelector('#saved-contents');
        var elCurrTabTit = document.querySelector('#curr-tab-tit');
        var elCurrTabUrl = document.querySelector('#curr-tab-url');
        elCurrTabTit.innerHTML = page.title;
        elCurrTabUrl.innerHTML = page.url;
        elSavedContents.setAttribute('class', 'active');
    } else {
        var elUnsavedContents = document.querySelector('#unsaved-contents');
        elUnsavedContents.setAttribute('class', 'active');
    }
});

window.onload = function () {
    chrome.tabs.executeScript(
        null,
        {file: 'parser.js'},
        function () {}
    );
};
