import React, { Component } from 'react';
import styles from './index.module.less';
import { connect } from 'dva';
import { Checkbox } from 'antd';

class LeftBox extends Component {
    constructor(props){
        super(props);
        this.checkBoxConfig = [
            { label: 'XS', value: 'XS' },
            { label: 'S', value: 'S' },
            { label: 'M', value: 'M' },
            { label: 'ML', value: 'ML' },
            { label: 'L', value: 'L' },
            { label: 'XL', value: 'XL' },
            { label: 'XXL', value: 'XXL' },
        ]
    }

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    checkBoxChange = (val) => {
        this.props.dispatch({
            type:'app/fetchModifyData',
            payload:{
                filters:val
            }
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <p>Size:</p>
                <Checkbox.Group
                    options={this.checkBoxConfig}
                    defaultValue={['Apple']}
                    onChange={this.checkBoxChange}
                />
            </div>
        )
    }
}

export default connect(({ app }) => ({ app }))(LeftBox)