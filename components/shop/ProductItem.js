import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity, // Android version is TouchableNativeFeedBack // use Platform api -- #163 at 8.47
  TouchableNativeFeedBack,
  Platform
} from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const ProductItem = (props) => {
  // console.log(props);

  /***
   * This is the code block to implement a different TouchableOpacity component for IOS and Android
   */
  let MyTouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    MyTouchableComponent = TouchableNativeFeedBack;
  }
  //--------------------------------------------------------------------------------------------------
  // #163 at 10.40 talks about styling
  return (
    <MyTouchableComponent onPress={props.onSelect} useForeground>
      <Card style={styles.products}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
        <View style={styles.detail}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price}</Text>
        </View>
        <View style={styles.actions}>{props.children}</View>
      </Card>
    </MyTouchableComponent>
  );
};

const styles = StyleSheet.create({
  products: {
    height: 300,
    margin: 20
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    height: "60%",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
    // borderWidth: 1
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "open-sans-bold"
  },
  detail: {
    alignItems: "center",
    height: "15%",
    padding: 5
    // borderWidth: 1
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans-bold"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "35%"
    // borderWidth: 1
  }
});

export default ProductItem;
