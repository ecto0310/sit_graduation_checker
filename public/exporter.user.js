// ==UserScript==
// @name         S*gsot Credits Exporter for SIT Graduation Checker
// @namespace    https://sit-graduation-checker.ecto0310.jp/
// @version      0.2
// @description  Export the credit information used by the SIT Graduation Checker.
// @author       ecto0310
// @match        https://sgsot4a.sic.shibaura-it.ac.jp/Sgsot/html/Study.html.var?uid=*
// @updateURL    https://sit-graduation-checker.ecto0310.jp/exporter.user.js
// @downloadURL  https://sit-graduation-checker.ecto0310.jp/exporter.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (window == window.parent) {
        let link = document.createElement("a");
        link.appendChild(document.createTextNode("単位情報を出力する(SIT Graduation Checker)"));
        document.body.appendChild(link);
        link.addEventListener('click', (event) => {
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";

            const blob = new Blob(
                [JSON.stringify({
                    "credits": [...document.querySelectorAll("#list > tbody:nth-child(1) > tr:nth-child(n + 2)")].map((e) => {
                        return { "group": e.children[0].innerText, "name": e.children[1].innerText, "division": e.children[3].innerText, "count": parseInt(e.children[4].innerText), "grade": e.children[6].innerText[0], "period": e.children[8].innerText + "年度 " + e.children[9].innerText.substr(0, 2) };
                    })
                })],
                { type: 'application/json' }
            );
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "credits.json";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }
})();
