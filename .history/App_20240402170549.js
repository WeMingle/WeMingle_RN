import {Provider} from 'react-redux';
import RootScreen from './screen/RootScreen';
import {Store} from './redux/Store';
import MatchingMainScreen from './screen/matching/MatchingMainScreen';

export default function App() {
  return (
    <Provider store={Store}>
      {/* <RootScreen /> */}
      <MatchingMainScreen />
    </Provider>
  );
}
