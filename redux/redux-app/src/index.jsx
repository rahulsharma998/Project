import './index.css';
import App from './App.jsx';
import store from './App.jsx';
import { Provider } from 'react-redux';

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
)
