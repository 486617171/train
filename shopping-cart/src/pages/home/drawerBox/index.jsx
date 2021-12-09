import React, { useState } from 'react';
import { Drawer, Badge,Button } from 'antd';
import styles from './index.module.less';
import { connect } from 'dva';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CommodityCart from '../../../components/commodityCart/index.jsx';

function DrawerBox({ app, dispatch }) {

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(!visible);
    };
    let cartCount = app.inCartDatas?.length > 0 ? app.inCartDatas.reduce((t,n)=>t+n.count,0):0 

    const getTotalPrice = () => {
        const { inCartDatas,originalData} = app;
        let total = 0;
        if(inCartDatas.length > 0){
            inCartDatas.forEach(item => {
                total += originalData.filter(el => el.id === item.id)[0].price * item.count;
            })
        }
        return total.toFixed(2);
    }
    const checkOut = () => {
        alert(getTotalPrice());
    }

    return (
        <>
            <div className={[styles.controlCart, visible ? styles.closeCart : null].join(" ")} onClick={showDrawer}>
                {
                    visible ? '×' : <>
                        <Badge showZero count={cartCount} offset={[0, 5]} style={{ position: 'absolute', backgroundColor: 'red', boxShadow: 'none' }}></Badge>
                        <ShoppingCartOutlined />
                    </>
                }
            </div>
            <Drawer
                width="440px"
                headerStyle={{ display: 'none' }}
                placement="right"
                mask={false}
                visible={visible}
                bodyStyle={{ backgroundColor: '#1b1a20',padding:0 }}
            >
                <div className={styles.cartHeader}>
                    <ShoppingCartOutlined style={{ fontSize: '40px' }} />
                    <span className={styles.title}>Cart</span>
                    <Badge showZero count={cartCount} offset={[-50, -12]} style={{ position: 'absolute', backgroundColor: '#eabf00', boxShadow: 'none', color: 'black' }}></Badge>
                </div>
                <div className={styles.cartBody}>
                    {
                        app.inCartDatas.length > 0 ? app.inCartDatas.map(item => <CommodityCart key={item.id} data={item} />):null
                    }
                </div>
                <div className={styles.cartBottom}>
                    <div className={styles.totalPrice}>
                        <span style={{color:'#5b5a5e'}}>SUBTOTAL</span>
                        <span>${getTotalPrice()}</span>
                    </div>
                    <Button type="primary" danger style={{width:'100%',marginTop:'40px'}} onClick={checkOut}>CHECKOUT</Button>
                </div>
            </Drawer>
        </>
    )
}

export default connect(({ app }) => ({ app }))(DrawerBox)