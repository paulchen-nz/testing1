import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import Colors from "../../constants/Colors";
//import useSelector from 'react-redux'
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import MyHeaderButton from "../../components/UI/HeaderButton";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MyHeaderButton from "../../components/UI/HeaderButton";

// * as CartAction merges all exports inside the file as one object
import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
  // create a variable called products by taping into the store and gets the availableProducts from the product reducer
  const products = useSelector((store) => store.products.availableProducts);

  const dispatch = useDispatch();

  const selectItemHandler = (product) => {
    props.navigation.navigate("ProductDetail", { product: product });
  };
  // FlatList renders the products
  return (
    <FlatList
      data={products}
      renderItem={(each) => (
        <ProductItem
          title={each.item.title}
          price={each.item.price}
          image={each.item.imageURL}
          onSelect={() => selectItemHandler(each.item)}
          onAddToCart={() => {}}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => selectItemHandler(each.item)}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => dispatch(cartActions.addToCart(each.item))}
          />
        </ProductItem>
      )}
    />
  );
};

/**
 * create a headerTitle: All Product
 * create a headerRight: Menu, ios-menu, toggleDrawer
 * create a headerLeft: Cart, ios-cart, >> Cart
 */

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products!",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
        <Item
          title="Cart"
          iconName="ios-cart"
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;
