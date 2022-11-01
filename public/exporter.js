const blob = new Blob([JSON.stringify({
    "credits": [...document.querySelectorAll("#list > tbody:nth-child(1) > tr:nth-child(n + 2)")].map((e) => {
        return { "group": e.children[0].innerText, "name": e.children[1].innerText, "division": e.children[3].innerText, "count": parseInt(e.children[4].innerText), "evaluation": e.children[6].innerText[0] };
    })
})], { type: 'application/json' });

function saveBlob(blob, fileName) {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};

saveBlob(blob, 'result.json');
