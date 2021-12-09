import React, { Component } from 'react';
import styles from './index.module.less';
import { connect } from 'dva';

class Commodity extends Component {

    shouldComponentUpdate(){
        return false;
    }

    addToCart = () => {
        this.props.dispatch({
            type: 'app/fetchAddCart',
            payload: {
                type:'add',
                id: this.props.data.id
            }
        })
    }

    render() {
        const { data } = this.props;
        return (
            <div className={styles.container} onClick={this.addToCart}>
                <img src={require(`../../asstes/images/${data.sku}.jpg`).default} width="100%" alt="" />
                <h5>{data.title}</h5>
                <div></div>
                <p>$ {data.price}</p>
                <p className={styles.grey}>or {data.installments + '× $' + (data.price / data.installments).toFixed(2)}</p>
                <div className={styles.addBtn}>Add to cart</div>
            </div>
        )
    }
}

export default connect(({ app }) => ({ app }))(Commodity)