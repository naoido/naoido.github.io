function post(content, name, url) {
    let req = new XMLHttpRequest();
    req.open("POST", url);
    let form_data = new FormData();
    form_data.append("content", content);
    if (name) {
        form_data.append("username", name);
    }
    req.send(form_data);
    alert("complete!!!");
}

document.getElementById("send").addEventListener("click", function(){
    let content = document.getElementById("content").value;
    let name = document.getElementById("name").value;
    let url = document.getElementById("url").value;
    if (!content || !url) {
        alert("入力不足な箇所があります。");
        return;
    }
    if (!url.match(/^https:\/\/discord\.com\/api\/webhooks\/\d+\/[a-zA-Z0-9]+$/)) {
        alert("webhookURLが正しくありません。");
        return;
    }
    post(content, name, url);
});
