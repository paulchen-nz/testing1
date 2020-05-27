import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemData}>
        <Text style={styles.Qty}>{props.product.quantity} </Text>
        <Text style={styles.mainText}>{props.product.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.product.sum.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity onPress={props.onClickRemove}>
            <Ionicons name="ios-trash" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    backgroundColor: "white",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 20,
    flexDirection: "row",
    padding: 5
    // borderWidth: 1
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center"
  },
  Qty: {
    color: "red",
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  mainText: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
    padding: 10
  }
});

export default CartItem;
