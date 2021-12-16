import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { Row, Col } from 'antd';
import styles from './index.module.less';
import RightBox from './rightBox';
import LeftBox from './leftBox';
import { connect } from 'dva';
import DrawerBox from './drawerBox/index.jsx';

function requestUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 1000);
    });
}

function Home({ app, dispatch }) {

    useEffect(() => {
        dispatch({
            type: 'app/fetchCartDataAsync'
        })
    }, [dispatch]);

    const { loading } = useRequest(requestUser, {
        onSuccess(result, params) {
            console.log(loading);
            console.log(result);
            console.log(params);
        },
        onError(err) {
            console.log(err);
        }
    });

    return (
        <div className={styles.container}>
            <Row>
                <Col span={6}>
                    <LeftBox />
                </Col>
                <Col span={18}>
                    <RightBox />
                </Col>
            </Row>

            <DrawerBox />
        </div>
    )
}

export default connect(({ app }) => ({ app }))(Home)