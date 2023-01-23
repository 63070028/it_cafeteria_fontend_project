import MyNavigator from "./navigation/MyNavigator";
import { store } from "./store";
import { Provider } from "react-redux";


export default function App() {
  return (
    <Provider store={store}>
      <MyNavigator/>
    </Provider>
  );
}

