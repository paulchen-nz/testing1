/* 
npm install --save redux react-redux react-navigation react-navigation-header-buttons
expo install react-native-gesture-handler react-native-reanimated react-navigation-stack ----- expo command executed in command prompt
expo install react-native-safe-area-context @react-native-community/masked-view
expo install react-native-screens
*/

/**
 * Memorise
 *
 */
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
//--------------------------------------------
import { AppLoading } from "expo";
import * as Font from "expo-font";
//--------------------------------------------
import React, { useState } from "react";

// import productsReducer from the reducer
import productsReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";
import cartReducer from "./store/reducers/cart";
import ordersReducers from "./store/reducers/orders";

// Font.loadAsync is a promise.
// fetchFonts function returns a promise
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

// create an object called rooReducer using the combineReducers function
// the key:value pair for the product reducer --> just name it products
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducers
});

// create a store object and store the returned function of createStore
const store = createStore(rootReducer);

// return the Provider component and set props.store = the store created above
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  /**
   * AppLoading components takes promise that it would execute
   * once it resolves (true) then it will trigger the onFinish function
   */
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
