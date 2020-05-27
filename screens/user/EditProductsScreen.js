import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MyHeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";
import Input from "../../components/UI/input";

// avoid unnecessary recreation else use useCallback
// reducer function
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputIdentifier,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]; // if any of the fields is false then the whole thing became false.
    }
    return {
      ...state,
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  // const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");

  // const [titleIsValid, setTitleIsValid] = useState(false);

  // const [imageUrl, setImageUrl] = useState(
  //   editedProduct ? editedProduct.imageURL : ""
  // );
  // const [price, setPrice] = useState("");

  // const [description, setDescription] = useState(
  //   editedProduct ? editedProduct.description : ""
  // );

  // #181 13.30 talks about useCallback and dependencies
  // useCall will only be created when the dependencies changes

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageURL : "",
      description: editedProduct ? editedProduct.description : "",
      price: ""
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Invalid input", "Must enter something", [{ text: "ok" }]);
      return;
    }

    if (editedProduct) {
      dispatch(
        productActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }

    props.navigation.goBack(); // goes back to the previous screen
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  /***
   * **************************************************************
   */
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      // setTitle(text);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ""}
          initiallyValid={!!editedProduct} // syntax to conver object to bool
          required
        />
        <Input
          id="imageUrl"
          label="Image URL"
          errorText="Please enter a valid title"
          keyboardType="default"
          autoCapitalize="sentences"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageURL : ""}
          initiallyValid={!!editedProduct} // syntax to conver object to bool
          required
        />
        {editedProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid title"
            keyboardType="decimal-pad"
            autoCapitalize="sentences"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct} // syntax to conver object to bool
            required
            min={0}
          />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid title"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ""}
          initiallyValid={!!editedProduct} // syntax to conver object to bool
          required
          minLength={5}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  }
});

EditProductScreen.navigationOptions = (navData) => {
  const submitHandlerFunction = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
        <Item
          title="Save"
          iconName="ios-checkmark"
          onPress={submitHandlerFunction}
        />
      </HeaderButtons>
    )
  };
};

export default EditProductScreen;
