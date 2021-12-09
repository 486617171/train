import { getCartDatas } from '../services/app.js';
import { getArrEqual } from '../util/tool.js';

const model = {

    namespace: 'app',

    state: {
        cartData: null,
        originalData: null,
        order: null,
        filters: null,
        inCartDatas: []
    },

    effects: {
        *fetchCartDataAsync({ payload }, { call, put }) {
            const res = yield call(getCartDatas);
            let inCartDatas = JSON.parse(localStorage.getItem('cartData')) || [];
            yield put({
                type: 'setData', payload: {
                    cartData: res.products,
                    originalData: res.products,
                    inCartDatas
                }
            });
        },
        *fetchModifyData({ payload }, { call, put }) {
            yield put({
                type: 'modifyData',
                payload
            })
        },
        *fetchAddCart({ payload }, { call, put }) {
            switch (payload.type) {
                case 'add':
                    yield put({
                        type: 'addCart',
                        payload
                    })
                    break;
                case 'reduce':
                    yield put({
                        type: 'reduceCart',
                        payload
                    })
                    break;
                case 'remove':
                    yield put({
                        type: 'removeCart',
                        payload
                    })
                    break;

                default:
                    break;
            }
        }
    },

    reducers: {
        setData(state, action) {
            return { ...state, ...action.payload };
        },
        modifyData(state, action) {
            // 商品原始数据
            let data = JSON.parse(JSON.stringify(state.originalData));
            // 商品筛选、排序条件
            let filters = action.payload.filters || state.filters;
            let order = action.payload.order || state.order;
            if (filters?.length > 0) {
                data = data.filter(item => getArrEqual(item.availableSizes, filters).length > 0);
            }
            switch (order) {
                case "lowestprice":
                    data.sort((a, b) => a.price - b.price)
                    break;
                case "highestprice":
                    data.sort((a, b) => b.price - a.price)
                    break;
                default:
                    break;
            }
            return { ...state, cartData: data, ...action.payload };
        },
        addCart(state, action) {
            let data = JSON.parse(JSON.stringify(state.inCartDatas));
            let item = data.filter(item => action.payload.id === item.id)[0];
            if (item) {
                item.count += 1
            } else {
                data.push({
                    id: action.payload.id,
                    count: 1
                });
            }
            localStorage.setItem('cartData',JSON.stringify(data));
            return { ...state, inCartDatas: data };
        },
        reduceCart(state, action) {
            let data = JSON.parse(JSON.stringify(state.inCartDatas));
            let item = data.filter(item => action.payload.id === item.id)[0];
            if (item) {
                item.count -= 1
            }
            localStorage.setItem('cartData',JSON.stringify(data));
            return { ...state, inCartDatas: data };
        },
        removeCart(state, action) {
            let data = JSON.parse(JSON.stringify(state.inCartDatas));
            data = data.filter(item => action.payload.id !== item.id);
            localStorage.setItem('cartData',JSON.stringify(data));
            return { ...state, inCartDatas: data };
        }
    },

};

export default model