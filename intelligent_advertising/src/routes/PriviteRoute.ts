import { history } from 'umi'

export default (props: any): any => {

    if (true) {
        return props.children;
    } else {
        history.push('/login');
    }
    return null;
}