import React from 'react';
import styles from './index.less';
import { withRouter, Link } from 'react-router-dom';

function Header(props) {

    const routerArr = ['popular', 'battle'];

    return (
        <div className={styles.header}>
            {
                routerArr.map(item => <Link key={item} className={styles.url} style={{ color: props.location.pathname === ('/' + item) ? '#1890ff' : 'black' }} to={item}>{item}</Link>)
            }
        </div>
    )
}

export default withRouter(Header)