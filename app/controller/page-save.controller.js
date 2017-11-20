(function () {
    'use strict';

    app.controller('tag-parsing', controller);

    var document = window.document;

    function controller(page, storage) {
        var url = page.url;
        var title = page.title;

        /** 페이지 존재 여부 */
        function isPageExists() {
            return !!storage.load(url);
        }

        /** 이미 존재 출력 */
        function displayAlreadyExist() {
            document.
                querySelector('#unsaved-contents').
                setAttribute('class', 'active');
        }

        /** 저장됨 출력 */
        function displaySaved() {
            document.
                querySelector('#saved-contents').
                setAttribute('class', 'active');
        }

        /** 페이지 정보 출력 */
        function displayPageInfo() {
            var elCurrTabTit = document.querySelector('#curr-tab-tit');
            var elCurrTabUrl = document.querySelector('#curr-tab-url');
            elCurrTabTit.innerHTML = title;
            elCurrTabUrl.innerHTML = url;
        }

        /** 페이지 저장 */
        function savePage() {
            var data = {
                title: title
            };
            storage.save(url, data);
        }

        /** 태그 이벤트 등록 */
        // TODO: not used
        function addTagInputEvent() {
            var tagInput = document.getElementById('tag-input');
            tagInput.onkeypress = function (e) {
                var tag = e.srcElement.value;
                // on enter
                if (e.keyCode == 13) {
                    scrapper.addTag(url, tag);
                }
            };
        }

        //- main

        if (isPageExists()) {
            displayAlreadyExist();
        } else {
            savePage();
            displaySaved();
        }

        displayPageInfo();
    }
})();
