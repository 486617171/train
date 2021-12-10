window.onload = function () {
    fetch('https://www.fastmock.site/mock/d8c33ca26a546a3c9be78ee13f714990/t1-0fficial/api/news/'+getQueryVariable('code')).then(res => res.json()).then(res => {
        if(res.code == 200){
            document.getElementsByClassName('title')[0].innerHTML = res.data.title;
            document.getElementById('m_content').innerHTML = res.data.text;
        }
    });
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}