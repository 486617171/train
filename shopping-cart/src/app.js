import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import dynamic from 'dva/dynamic';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.less';

export default function App({ app }) {
    return (
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route exact path="/home" component={dynamic({
                        app,
                        models: () => [],
                        component: () => import('./pages/home/index.jsx')
                    })}></Route>
                </Switch>
            </Router>
        </ConfigProvider>
    )
}
