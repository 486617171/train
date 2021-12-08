import React, { PureComponent } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Tab1 from '@/pages/battle/tab1';
import Tab2 from '@/pages/battle/tab2';

export default class Battle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user1: null,
            user2: null,
            type: true
        };
    }

    getUsers = (type, val) => {
        this.setState({
            [type]: val
        })
    }

    typeChange = () => {
        if (!this.state.type) {
            this.setState({
                user1: null,
                user2: null
            })
        }
        this.setState({
            type: !this.state.type
        });
    }

    render() {
        const { user1, user2, type } = this.state;
        return (
            <div style={{ padding: '20px' }}>
                {
                    type ? <Tab1 getUsers={this.getUsers} /> : <Tab2 user={[user1, user2]} />
                }
                <div style={{ textAlign: 'center' }}>
                    {
                        user1 && user2 ? <button onClick={this.typeChange} style={{ padding: '16px 32px',fontSize:'20px' }}>{type ? 'Battle' : 'RESET'}</button> : null
                    }
                </div>
            </div>
        );
    }
}