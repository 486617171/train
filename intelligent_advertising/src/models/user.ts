import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface UserModelState {
    name: string;
    data: object;
}

export interface UserModelType {
    namespace: 'user';
    state: UserModelState;
    effects: {
        login: Effect;
    };
    reducers: {
        save: Reducer<UserModelState>;
        // 启用 immer 之后
        // save: ImmerReducer<UserModelState>;
    };
    subscriptions: { setup: Subscription };
}

const UserModel: UserModelType = {
    namespace: 'user',

    state: {
        name: '',
        data: {}
    },

    effects: {
        *login({ payload }, { call, put }) {
            yield new Promise(resolve => {
                setTimeout(() => {
                    resolve(1);
                },2000);
            })
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        // 启用 immer 之后
        // save(state, action) {
        //   state.name = action.payload;
        // },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({
                        type: 'query',
                    });
                }
            });
        },
    },
};

export default UserModel;