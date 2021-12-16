import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';

const RightHeader: React.FC = (props) => {
    return (
        <div>
            <Button onClick={() => {
                history.replace('/login')
            }}>
                退出
            </Button>
        </div>
    );
};


export default RightHeader