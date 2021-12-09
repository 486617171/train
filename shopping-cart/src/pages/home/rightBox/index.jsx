import React, { PureComponent } from 'react';
import styles from './index.module.less';
import { Select,Row,Col } from 'antd';
import { connect } from 'dva';
import Commodity from '../../../components/commodity/index.jsx';

const { Option } = Select;

class RightBox extends PureComponent {

    orderChange = (val) => {
        this.props.dispatch({
            type:'app/fetchModifyData',
            payload:{
                order:val
            }
        })
    }

    render() {
        const { cartData } = this.props.app;

        return (
            <>
                {
                    cartData &&
                    <>
                        <div className={styles.control}>
                            <div>{cartData?.length} Product(s) found.</div>
                            <div>
                                Order by 
                                <Select defaultValue="select" style={{ width: 160,marginLeft:15 }} onChange={this.orderChange}>
                                    <Option value="select">Select</Option>
                                    <Option value="lowestprice">Lowest to highest</Option>
                                    <Option value="highestprice">Highest to lowest</Option>
                                </Select>
                            </div>
                        </div>
                        <div className={styles.container}>
                            <Row>
                                {
                                    cartData.map(item => <Col span={6} key={item.id}><Commodity data={item} /></Col>)
                                }
                            </Row>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default connect(({ app }) => ({ app }))(RightBox)
