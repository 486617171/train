import React from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { LockOutlined, UserOutlined, } from '@ant-design/icons';
import { history, connect, UserModelState, ConnectRC,getAllLocales,setLocale,useIntl } from 'umi';

interface PageProps {
    user: UserModelState;
}

const Login: ConnectRC<PageProps> = ({ user, dispatch }) => {

    const { messages } = useIntl();

    const login = async (value: object): Promise<void> => {
        await dispatch({
            type: 'user/login',
            payload: value
        }).then(() => {
            history.push('/home');
        });
    }

    return (
        <LoginForm
            title={String(messages.name)}
            subTitle="登录页面"
            onFinish={login}
        >
            <ProFormText
                name="username"
                fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                    {
                        required: true,
                        message: '请输入用户名！',
                    },
                ]}
            />
            <ProFormText.Password
                name="password"
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                ]}
            />
        </LoginForm>
    )
}

export default connect(({ user }: { user: UserModelState }) => ({ user }))(Login)