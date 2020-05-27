import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const dispatch = useDispatch();
  //console.log(props);
  const product = props.navigation.getParam("product"); // Not getParams
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageURL }} />
      <View style={styles.actions}>
        <Button
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  // Not NavigationOptions
  const product = navData.navigation.getParam("product"); // Not getParams
  //console.log(product);

  return {
    headerTitle: product.title
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300
  },
  actions: {
    marginVertical: 5,
    alignItems: "center"
  },
  price: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold"
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans"
  }
});

export default ProductDetailScreen;
