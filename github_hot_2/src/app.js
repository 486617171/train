import React from 'react';
import Header from './layout/header';
import Main from './layout/main';
import Footer from './layout/footer';
import styles from './app.less';

function App(props) {
    return (
        <div className={styles.container}>
            <div>
                <Header />
                <Main children={props.children} />
            </div>
            <Footer></Footer>
        </div>
    )
}

export default App
