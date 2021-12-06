import React, { PureComponent } from 'react';
import styles from './index.less';

export default class Tab2 extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        const user = this.props.user;
        Promise.all([this.getUserData(user[0]), this.getUserData(user[1])]).then(res => {
            if (res.length >= 2) {
                if (res[0].public_repos > res[1].public_repos) {
                    res[0].ranking_page = 'Winner';
                    res[1].ranking_page = 'Loser';
                } else if (res[0].public_repos < res[1].public_repos) {
                    res[0].ranking_page = 'Loser';
                    res[1].ranking_page = 'Winner';
                } else {
                    res[0].ranking_page = 'it ends in a draw';
                    res[1].ranking_page = 'it ends in a draw';
                }
                this.setState({
                    data: res
                })
            }
        });
    }

    getUserData(id) {
        return new Promise((resolve, reject) => {
            fetch('https://api.github.com/users/' + id).then(res => res.json()).then(res => {
                resolve(res);
            });
        });
    }

    render() {
        const { data } = this.state;
        return <div className={styles.container}>
            {
                data ? data.map(({ ranking_page, avatar_url, public_repos, name, location, followers, following }) => <div key={name + Math.random()} className={styles.battleItem}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>{ranking_page}</h3>
                        <img src={avatar_url} alt="" width="200px" height="200px" />
                        <h4>Scores:{public_repos}</h4>
                        <h2>{name}</h2>
                    </div>
                    <div>
                        <ul>
                            {
                                [
                                    { icon: 'fa fa-location-arrow', data: location },
                                    { icon: 'fa fa-group', data: followers },
                                    { icon: 'fa fa-user-plus', data: following },
                                    { icon: 'fa fa-code', data: public_repos },
                                ].map(item => <li key={item.icon}><i style={{ width: '16px', textAlign: 'center', marginRight: '4px' }} className={item.icon}></i>{item.data}</li>)
                            }
                        </ul>
                    </div>
                </div>) : <span><i className="fa fa-spin fa-spinner" />loading...</span>
            }
        </div>
    }
}