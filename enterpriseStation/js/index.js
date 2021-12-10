window.onload = function () {
    create_scope_services();
    create_team();
    create_news();
}

let type = window.innerWidth >= 768 ? 1 : 0;

window.onresize = function () {
    if (window.innerWidth >= 768 && !type) {
        type = 1;
        create_team();
    }else if(window.innerWidth < 768 && type){
        type = 0;
        create_team();
    }
}

function create_scope_services() {
    let dom = document.getElementById('scope_services');
    let data = [
        { name: '拯救地球', src: './asset/section_01_1080p.jpg' },
        { name: '英雄合照', src: './asset/section_02_1080p.jpg' },
        { name: '寻找原石', src: './asset/section_03_1080p.jpg' },
        { name: '宇宙旅行', src: './asset/section_04_1080p.jpg' },
    ];
    data = data.map(item => `<div class="item col-6 col-md-3">
        <div>
            <img src="${item.src}" alt="">
        </div>
        <div>${item.name}</div>
    </div>`);
    dom.innerHTML = data.join('');
}

function create_team() {
    console.log('执行');
    let dom = document.getElementById('team');
    let data = [
        { title: '旺达', name: '马克希莫夫', src: './asset/article_1_1080p.jpg', content: '快银的燮胞胎姊姊（比快银早出生30秒，此舄漫蛊原作设定)，原始般定是蕙磁王的女兒，钺人的情埽，和美国隙艮也有一段地下情，於2014年底的漫書速载中修改设定，徘红女巫跟快银是终棰谯化 (High Evolutionary)基因寰睑産生的基因改造人，亚非燮穗人，亚且有一位之前未曾登塌的燮胞胎姊妹Luminous。' },
        { title: '黑寡妇', name: '娜塔莉亚', src: './asset/article_2_1080p.jpg', content: '黑寡妇的首次登场是作为“钢铁侠"故事里的一个常驻的非制服的俄罗斯间谍角色出现在《悬疑故事》第52期(1964年4月出版）中。在漫画出版了五期之后，黑寡妇为了她的事业招募了一名对她痴迷的制服射手，而他就是随后成为超级英雄的"鹰眼"。俄罗斯政府为黑寡妇提供了她的第一套制服和高科技武器，但她与美国政府产生嫌隙却是在超级英雄团队系列漫画《复仇者》第29期（1966年7月)出版后。' },
        { title: '猎鹰', name: '山姆威尔森', src: './asset/article_3_1080p.jpg', content: '在一个充斥着街头暴力与帮派斗争的黑人住宅区长大，他的牧师父亲为了阻止一场争斗而意外丧生，山姆强忍心中的悲痛与愤怒，尽可能保持理性地生活着，直到两年后一个走私贩子杀死了他的母亲，多年积恕的复仇情绪将山姆的性情彻底改变，一个备受尊敬的有志青年变成了为暴徒工作的诈欺犯。' },
        { title: '洛基', name: '北欧神话', src: './asset/article_4_1080p.jpg', content: '首先，他是跪针舆欺聩的大部，但他亚不是十恶不赦的，他翌常在作弄别人後舆其和好，比如睨剪断希芙的颤髯後又使其徼原;场助夏基虏走伊登又将其救回。他最初是善恶兼半，或者皖他的恶亦非出於本意。但後来，随著洛基刹死奥丁之子巴德雨，渐潮的真正成了斯堪的纳维亚诸神的敌人。众神视洛基为恶神，并将他逐出阿斯加德。' },
    ];
    data = data.map((item, index) => {
        if (!type) {
            return `
            <div class="row no-gutters">
                <div class="item col-12">
                    <div class="sub_title">${item.title}<span>${item.name}</span></div>
                    <div>${item.content}</div>
                </div>
                <div class="item col-12">
                    <img src="${item.src}" alt="">
                </div>
            </div>`
        }

        return `
        <div class="row no-gutters">
            ${index % 2 === 0 ? `
            <div class="item col-md-6">
                <div class="sub_title">${item.title}<span>${item.name}</span></div>
                <div>${item.content}</div>
            </div>
            <div class="item col-md-5 offset-md-1">
                <img src="${item.src}" alt="">
            </div>`: `
            <div class="item col-md-5">
                <img src="${item.src}" alt="">
            </div>
            <div class="item col-md-6 offset-md-1">
                <div class="sub_title">${item.title}<span>${item.name}</span></div>
                <div>${item.content}</div>
            </div>`}
        </div>`;
    });
    dom.innerHTML = data.join('');
}

async function create_news(){
    let dom = document.getElementById('news');
    let data = await fetch('https://www.fastmock.site/mock/d8c33ca26a546a3c9be78ee13f714990/t1-0fficial/api/news').then(res => res.json()).then(res => {
        if(res.code == 200){
            return res.data.slice(0,4);
        }
    });
    data = data.map(item => `<div class="col-12 col-md-3">
        <div class="news_item" data-id="${item.code}">
            <div>
                <img src="${item.img}" alt="">
            </div>
            <div class="title">${item.title}</div>
        </div>
    </div>`);
    dom.innerHTML = data.join('');

    let news_items = document.getElementsByClassName('news_item');
    for(let i = 0;i < news_items.length;i++){
        news_items[i].addEventListener('click',function(e){
            window.location.href=`news_details.html?code=${this.getAttribute('data-id')}`;
        });
    }
}