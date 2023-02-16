// ==UserScript==
// @name         S*gsot Credits Exporter for SIT Graduation Checker
// @namespace    https://sit-graduation-checker.ecto0310.com/
// @version      0.3
// @description  Export the credit information used by the SIT Graduation Checker.
// @author       ecto0310
// @match        https://sgsot4a.sic.shibaura-it.ac.jp/Sgsot/ng/study.html?uid=*&type=study,gpa
// @updateURL    https://github.com/ecto0310/sit_graduation_checker/raw/main/public/exporter.user.js
// @downloadURL  https://github.com/ecto0310/sit_graduation_checker/raw/main/public/exporter.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (window == window.parent) {
        let link = document.createElement("a");
        link.className = 'btn btn-primary';
        link.appendChild(document.createTextNode("単位情報を出力する(SIT Graduation Checker)"));
        document.body.appendChild(link);
        link.addEventListener('click', (event) => {
            const location = new URL(window.location.href);
            const params = new URLSearchParams(location.search);
            const studentId = params.get('uid');
            const xmlUrl = 'https://sgsot4a.sic.shibaura-it.ac.jp/' + studentId + '/Study/StudyHistory.xml';
            fetch(xmlUrl)
                .then(res => {
                    if (res.status == 200) {
                        return res.text();
                    }
                    throw new Error(`${res.statusText}(${res.status})`);
                })
                .then(xmlString => {
                    const xmlData = new window.DOMParser().parseFromString(xmlString, "text/xml");
                    const creditNodes = [...xmlData.querySelectorAll("Studies Study")];
                    return creditNodes.map((creditNode) => {
                        const credit = creditNode.attributes;
                        console.log(credit);
                        return {
                            "group": credit.KeiretuKubun.value,
                            "name": credit.Kamoku.value,
                            "division": credit.TaniKubun.value,
                            "count": parseInt(credit.Tanisuu.value),
                            "grade": credit.Hyouka.value,
                            "form": credit.NaiyouKubun.value,
                            "period": credit.Nendo.value + "年度 " + credit.Ki.value
                        };
                    });
                }).then(credits => {
                    const blob = new Blob(
                        [JSON.stringify({ "credits": credits })],
                        { type: 'application/json' }
                    );
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = url;
                    a.download = "credits.json";
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                });
        });
    }
})();
