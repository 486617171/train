import React, { Component } from 'react';
import styles from './index.module.less';
import { connect } from 'dva';

class CommodityCart extends Component {
    state = {
        data: null,
        bool: true
    }

    componentDidMount() {
        const { data, app: { originalData } } = this.props;
        this.setState({
            data: originalData.filter(item => item.id === data.id)[0],
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.data.count === nextProps.data.count) {
            if (!this.state.bool) {
                return false
            }
            this.setState({
                bool: false
            });
        };
        return true;
    }

    setCommodity = (type) => {
        this.props.dispatch({
            type: 'app/fetchAddCart',
            payload: {
                type,
                id: this.props.data.id
            }
        })
    }

    render() {
        const { data } = this.state;
        const count = this.props.data.count;
        return data && (
            <div className={styles.container}>
                <div className={styles.leftBox}>
                    <img src={require(`../../asstes/images/${data.sku}.jpg`).default} width="25%" height="85px" alt="" />
                    <div>
                        <p className={styles.title}>{data.title}</p>
                        <p>{data.availableSizes[0] || ''} | {data.style}</p>
                        <p>Quantity : {count}</p>
                    </div>
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.delete} onClick={() => { this.setCommodity('remove') }}>×</div>
                    <div className={styles.price}>$ {data.price}</div>
                    <div className={styles.btn}>
                        <span onClick={count > 1 ? () => { this.setCommodity('reduce') } : null} style={{ backgroundColor: count <= 1 ? '#1a191f' : null }}>-</span>
                        <span onClick={() => { this.setCommodity('add') }}>+</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({ app }) => ({ app }))(CommodityCart)