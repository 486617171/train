import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import styles from './index.module.less';
import RightBox from './rightBox';
import LeftBox from './leftBox';
import { connect } from 'dva';
import DrawerBox from './drawerBox/index.jsx';

function Home({ app, dispatch }) {

    useEffect(() => {
        dispatch({
            type: 'app/fetchCartDataAsync'
        })
    }, [dispatch]);


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