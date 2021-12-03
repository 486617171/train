import React from 'react';
import { withRouter,Link } from 'react-router-dom';

function App(props) {
    console.log(props);
    return (
        <>
            <div>
                <Link to="/popular">popular</Link>
                <Link to="/battle">battle</Link>
            </div>
            {
                props.children
            }
            <div>
                
            </div>
        </>
    )
}

export default withRouter(App)
