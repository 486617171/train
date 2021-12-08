import React, { PureComponent } from 'react';
import stylesT from './index.less';
import { Form, Formik,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default class Tab1 extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.textConfig = [
            { name: 'Enter two Github:', icon: 'fa fa-users', color: 'rgb(255, 191, 116)' },
            { name: 'Battle', icon: 'fa fa-fighter-jet', color: 'gray' },
            { name: 'See the winner', icon: 'fa fa-trophy', color: '#f4ea2a' },
        ];
    }

    setUser1 = (val) => {
        this.props.getUsers('user1', val)
    }

    setUser2 = (val) => {
        this.props.getUsers('user2', val)
    }

    render() {

        return <div>
            <h2 style={{ textAlign: 'center' }}>Instructions</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    this.textConfig.map(item => <div key={item.name} style={{ textAlign: 'center', margin: '0 40px' }}>
                        <p style={{ fontSize: '20px' }}>{item.name}</p>
                        <i className={item.icon} style={{ fontSize: '120px', color: item.color, padding: '30px', backgroundColor: '#eeeeee' }}></i>
                    </div>)
                }
            </div>
            <h2 style={{ textAlign: 'center' }}>Players</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <InputItem title="Player One" styles={{ width: '50%' }} setData={this.setUser1} />
                <InputItem title="Player Two" styles={{ width: '50%' }} setData={this.setUser2} />
            </div>
        </div>
    }
}

class InputItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            type: true
        };
    }
    submit = (e) => {
        let imgs = new Image();
        imgs.src = `https://github.com/${e.username}.png?size=200`;
        imgs.onload = () => {
            this.setState({
                type: false,
                inputValue:e.username
            }, () => {
                this.props.setData(e.username);
            });
        }
        imgs.onerror = () => {
            alert('未获取到该用户信息，请重新输入');
        }
    }
    closeBox = () => {
        this.setState({
            type: true,
            inputValue: ''
        }, () => {
            this.props.setData(null);
        });
    }

    checkUser = () => {
        return Yup.object({
            username:Yup.string()
            .max(15, "用户名的长度不能大于15")
            .required("请输入用户名"),
        });
    }

    render() {
        const { title, styles } = this.props;
        const { inputValue, type } = this.state;
        return <div style={{ ...styles, padding: '10px' }}>
            <h3>{title}</h3>
            {
                type ?
                    <Formik
                        initialValues={{username:''}}
                        onSubmit={this.submit}
                        validationSchema={this.checkUser()}
                    >
                        <Form style={{width: '100%'}}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Field name="username" className={stylesT.userInput} />
                                <input type="submit" className={stylesT.submitBtn} />
                            </div>
                            <ErrorMessage name="username" />
                        </Form>
                    </Formik> :
                    <div className={stylesT.resultBox}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={"https://github.com/" + inputValue + ".png?size=200"} style={{ borderRadius: '8px' }} width="80px" height="80px" alt="" />
                            <span style={{ fontSize: '30px', marginLeft: '10px' }}>{inputValue}</span>
                        </div>
                        <div style={{ lineHeight: '80px' }}>
                            <button onClick={this.closeBox} className={stylesT.closeBtn}>×</button>
                        </div>
                    </div>
            }
        </div>
    }
}