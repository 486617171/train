import dva from 'dva';
import model from './models/app.js';
import App from './app.js';
import { createHashHistory } from 'history';

const app = dva({
    history:createHashHistory
});

app.model(model);

app.router(()=><App />);

app.start('#root');
