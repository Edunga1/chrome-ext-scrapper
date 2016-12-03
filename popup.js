chrome.runtime.onMessage.addListener(function (req, sender) {
    var page = req.source;

    if (!page) {
        return;
    }

    var res = scrapper.scrap(page.url, page.title);
    if (res) {
        var elCurrTabTit = document.querySelector('#curr-tab-tit');
        var elCurrTabUrl = document.querySelector('#curr-tab-url');
        elCurrTabTit.innerHTML = page.title;
        elCurrTabUrl.innerHTML = page.url;
    }
});

window.onload = function () {
    chrome.tabs.executeScript(
        null,
        {file: 'parser.js'},
        function () {}
    );
};
