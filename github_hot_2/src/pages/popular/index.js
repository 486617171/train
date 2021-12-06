import React, { Component } from 'react';
import styles from './index.less';
import InfiniteScroll from 'react-infinite-scroller';
import HotItem from '../../components/hotItem';
import 'font-awesome/css/font-awesome.min.css';

export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentType: 'All'
        };
        this.types = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS'];
    }

    typeChange = (item) => {
        if (item !== this.state.currentType) {
            this.setState({
                currentType: item
            })
        }
    }

    render() {
        const { currentType } = this.state;
        return (
            <div className={styles.container}>
                <div style={{ display: 'flex', height: '40px', lineHeight: '40px', width: '100%', justifyContent: 'center', fontSize: '18px' }}>
                    {
                        this.types.map(item => <div key={item} style={{ minWidth: '100px', textAlign: 'center' }}><span style={{ cursor: 'pointer', color: currentType === item ? '#1890ff' : '#000' }} onClick={() => { this.typeChange(item) }}>{item}</span></div>)
                    }
                </div>
                <HotBox type={currentType} />
            </div>
        );
    }
}

class HotBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            data: [],
            total: 0,
        };
        this.page_nub = 1;
        this.timer = null;
        this.scrollTimer = null;
    }

    // 初始化获取数据
    componentDidMount() {
        this.getData(this.props.type);
    }


    throttle = (func, delay) => {
        var timer = null;
        return function () {
            var context = this;
            var args = arguments;
            if (!timer) {
                timer = setTimeout(function () {
                    func.apply(context, args);
                    timer = null;
                }, delay);
            }
        }
    }

    // 接收到props时触发 切换分类时先清除数据
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.page_nub = 1;
        this.setState({
            data: [],
        })
    }

    // 切换分类时重新获取数据
    async componentDidUpdate() {
        if (this.state.type !== this.props.type) {
            await this.getData(this.props.type);
        }
    }

    // 获取数据
    getData(type = '') {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(async () => {
            const { total_count, items } = await fetch(`https://api.github.com/search/repositories?q=stars:%3E1+${type ? 'language:' + type.toLowerCase() : ''}&sort=stars&order=desc&type=Repositories&page=${this.page_nub}`).then(res => res.json()).then(res => res);
            if(items && typeof items === 'object'){
                this.setState({
                    data: [...this.state.data, ...items],
                    total: total_count,
                    type: this.props.type,
                });
            }
        }, 1000);
    }

    getLoadScrollData = (e) => {
        this.page_nub = e;
        this.getData();
    }

    render() {
        const { data } = this.state;
        return <div>
            {
                data?.length > 0 ? <InfiniteScroll
                    pageStart={this.page_nub}
                    loadMore={this.getLoadScrollData}
                    hasMore={true || false}
                    loader={<div className={styles.loader} key={0}><i className="fa fa-spin fa-spinner" />Loading ...</div>}
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        {
                            data.map((item, index) => <HotItem key={item.id + Math.random()} data={item} index={index} />)
                        }
                    </div>
                </InfiniteScroll> : <div className={styles.loader} key={0}><i className="fa fa-spin fa-spinner" />Loading ...</div>
            }
        </div>
    }
}