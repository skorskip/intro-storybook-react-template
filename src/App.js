import { Provider } from 'react-redux';
import store from './lib/redux';
import InboxScreen from './components/InboxScreen/InboxScreen';
import './index.css';
import { newTracker, enableActivityTracking, trackPageView } from "@snowplow/browser-tracker";
import { SnowPlowInterceptor } from './utils/snowplow-interceptor';

newTracker('sp1', 'http://localhost:8080', {appId:'my-app-id', plugins: []});

enableActivityTracking({
  minimumVisitLength : 30,
  heartbeatDelay: 10
})

trackPageView({ title: 'TaskList'});

SnowPlowInterceptor();

function App() {
  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
}
export default App;
