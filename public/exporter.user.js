// ==UserScript==
// @name         S*gsot Credits Exporter for SIT Graduation Checker
// @namespace    https://sit-graduation-checker.ecto0310.com/
// @version      0.5.0
// @description  Export the credit information used by the SIT Graduation Checker.
// @author       ecto0310
// @match        https://sgsot4a.sic.shibaura-it.ac.jp/Sgsot/ng/study.html?uid=*&type=study,gpa
// @match        http://syllabus.sic.shibaura-it.ac.jp/*
// @updateURL    https://github.com/ecto0310/sit_graduation_checker/raw/main/public/exporter.user.js
// @downloadURL  https://github.com/ecto0310/sit_graduation_checker/raw/main/public/exporter.user.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const uri = new URL(window.location.href);
  const hostname = uri.hostname;
  if (hostname == "sgsot4a.sic.shibaura-it.ac.jp") {
    if (window == window.parent) {
      let link = document.createElement("a");
      link.className = "btn btn-primary";
      link.appendChild(
        document.createTextNode("単位情報を出力する(SIT Graduation Checker)")
      );
      document.body.appendChild(link);
      link.addEventListener("click", (event) => {
        const location = new URL(window.location.href);
        const params = new URLSearchParams(location.search);
        const studentId = params.get("uid");
        const xmlUrl =
          "https://sgsot4a.sic.shibaura-it.ac.jp/" +
          studentId +
          "/Study/StudyHistory.xml";
        fetch(xmlUrl)
          .then((res) => {
            if (res.status == 200) {
              return res.text();
            }
            throw new Error(`${res.statusText}(${res.status})`);
          })
          .then((xmlString) => {
            const xmlData = new window.DOMParser().parseFromString(
              xmlString,
              "text/xml"
            );
            const creditNodes = [...xmlData.querySelectorAll("Studies Study")];
            return creditNodes.map((creditNode) => {
              const credit = creditNode.attributes;
              const week = Math.min(
                parseInt(credit.JikanwariCD.value[0]) - 1,
                6
              );
              console.log(credit);
              return {
                group: credit.KeiretuKubun.value,
                name: credit.Kamoku.value,
                division: credit.TaniKubun.value,
                count: parseInt(credit.Tanisuu.value),
                grade: credit.Hyouka.value,
                form: credit.NaiyouKubun.value,
                semester: credit.Nendo.value + "年度" + credit.Ki.value,
                day: [
                  "月曜日",
                  "火曜日",
                  "水曜日",
                  "木曜日",
                  "金曜日",
                  "土曜日",
                  "その他",
                ][week],
                time:
                  week == 6 ? "" : parseInt(credit.JikanwariCD.value[1]) + "限",
              };
            });
          })
          .then((credits) => {
            const blob = new Blob([JSON.stringify({ credits: credits })], {
              type: "application/json",
            });
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
  } else if (hostname == "syllabus.sic.shibaura-it.ac.jp") {
    if (document.querySelector("tr.title") !== null) {
      const title = document
        .querySelector("tr.title td b")
        .innerText.replaceAll(/\s+/g, "");

      let link = document.createElement("a");
      link.className = "btn btn-primary";
      link.appendChild(
        document.createTextNode("単位情報を出力する(SIT Graduation Checker)")
      );
      document.querySelector("tr.title td").appendChild(link);
      link.addEventListener("click", (event) => {
        const row_classes = [...document.querySelectorAll("tr.subject")];
        const classes = row_classes.map((row_class) => {
          const group = row_class.querySelector("td:nth-child(1)").innerText;
          const name = row_class.querySelector("td:nth-child(4)").innerText;
          const count = row_class.querySelector("td:nth-child(5)").innerText;
          let division = "自由";
          if (row_class.innerText.includes("◎")) {
            division = "必修";
          } else if (row_class.innerText.includes("○")) {
            division = "選択必修";
          } else if (row_class.innerText.includes("△")) {
            division = "選択";
          }
          return {
            group: group,
            name: name,
            division: division,
            count: parseInt(count),
          };
        });
        const blob = new Blob([JSON.stringify({ classes: classes })], {
          type: "application/json",
        });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = title + ".json";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
})();
