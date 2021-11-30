window.onload = function () {
    create_news_list();
}

// 如果session中有分页数据
let current_page = sessionStorage.getItem('page_index') ?? 1;
let pagination_config = null;

/**
 * 创建新闻列表
 */
async function create_news_list() {
    let dom = document.getElementById('new_list');
    let data = await get_news_data();
    data = data.map(item => `
        <div class="col-12 col-md-6">
            <div class="row no-gutters news_item" data-id="${item.code}">
                <div class="col-12 col-sm-4 col-md-5">
                    <img src="${item.img}" alt="">
                </div>
                <div class="col-12 col-sm-8 col-md-7 title">
                    <div>${item.title}</div>
                    <span>${item.keyword}</span>
                </div>
            </div>
        </div>
    `);
    dom.innerHTML = data.join('');

    let news_items = document.getElementsByClassName('news_item');
    for(let i = 0;i < news_items.length;i++){
        news_items[i].addEventListener('click',function(e){
            window.location.href=`news_details.html?code=${this.getAttribute('data-id')}`;
        });
    }
}

function get_news_data() {
    return fetch(`https://www.fastmock.site/mock/d8c33ca26a546a3c9be78ee13f714990/t1-0fficial/api/news?page=${current_page}&page_size=10`).then(res => res.json()).then(res => {
        if (res.code == 200) {

            sessionStorage.setItem('page_index', current_page);

            if (!pagination_config) {
                pagination_config = res.meta;
                pagination_event();
            }

            create_pagination();

            return res.data;
        }
    });
}

/**
 * 分页器事件
 */
function pagination_event() {
    let dom = document.getElementsByClassName('m_bottom')[0];
    let { per_page, total } = pagination_config;
    let page_n = Math.ceil(total / per_page);

    dom.addEventListener('click', e => {
        let val = e.target.innerText;
        if (val === '上一页') {
            if (current_page - 1 > 0) {
                current_page -= 1;
                create_news_list();
            }
        } else if (!isNaN(val) && val != current_page) {
            current_page = val;
            create_news_list();
        } else if (val === '下一页') {
            if (current_page < page_n) {
                current_page = current_page - 0 + 1;
                create_news_list();
            }
        }
    })
}

/**
 * 创建分页器
 */
function create_pagination() {
    let dom = document.getElementById('pagination_box');
    let { per_page, total } = pagination_config;
    let hmlt_str = `<li class="page-item ${current_page == 1 ? 'disabled' : null}"><a class="page-link" href="javascript:void(0)">上一页</a></li>`;
    let page_n = Math.ceil(total / per_page);
    if (page_n > 0) {
        for (let i = 1; i <= page_n; i++) {
            hmlt_str += `<li class="page-item ${current_page == i ? 'active' : ''}"><a class="page-link" href="javascript:void(0)">${i}</a></li>`;
        }
    }
    hmlt_str += `<li class="page-item ${current_page == page_n ? 'disabled' : null}"><a class="page-link" href="javascript:void(0)">下一页</a></li>`;
    dom.innerHTML = hmlt_str;
}