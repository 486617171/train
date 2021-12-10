// 动态首尾
let header_box = document.getElementById('header');
let footer_box = document.getElementById('footer');

const page_config_arr = [
    { name: '首页', url: './index.html', icon: 'bi-house' },
    { name: '新闻', url: './news.html', icon: 'bi-newspaper' },
    { name: '关于我们', url: './about.html', icon: 'bi-question-circle' },
]

let header_html_str = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<a class="navbar-brand" href="#">企业站</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav ml-auto">
        ${page_config_arr.map(item => `<li class="nav-item${header_box.innerText == item.name ? " active" : ''}">
        <a class="nav-link" href=${item.url}><i class="${item.icon}"></i> ${item.name}</a>
    </li>`).join('')}
    </ul>
</div>
</nav>`;

header_box.innerHTML = header_html_str;



footer_box.innerHTML = `<div style="color: #6c757d;">
<div class="f_top" style="height: 80px;display: flex;justify-content: center;background-color: #f8f9fa;align-items: center;flex-wrap: wrap;">
    <div style="margin: 0 5px;"><i class="bi-geo-alt"></i> 福州市仓山区</div>
    <div style="margin: 0 5px;"><i class="bi-envelope"></i> Robin@hotmail.com</div>
    <div style="margin: 0 5px;"><i class="bi-telephone"></i> 000-000-000</div>
</div>
<hr color="#dee2e6" style="margin: 0;">
<div class="f_bottom"  style="height: 80px;display: flex;justify-content: center;background-color: #f8f9fa;align-items: center;flex-wrap: wrap;">
    <div>
        <img src="./asset/qr_code.jpg" alt="" width="50px">
        <span>© 2021 Company,Inc</span>
    </div>
</div>
</div>`;



// document.body.onresize = function(){
//     console.log(11);
//     if(document.getElementsByTagName('body')[0].clientHeight < window.innerHeight){
//         footer_box.style.position = 'absolute';
//         footer_box.style.width = '100%';
//         footer_box.style.maxWidth = '1200px';
//         footer_box.style.bottom = 0;
//     }else{
//         footer_box.style = '';
//     }
// }