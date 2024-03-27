import { Provider } from 'react-redux';
import RootScreen from './screen/RootScreen';
import { Store } from './redux/Store';

export default function App() {

  return (
    <Provider store={Store}>
      <RootScreen />
    </Provider>
  );
}
