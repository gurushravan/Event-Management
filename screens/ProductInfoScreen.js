import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React ,{useState} from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1, backgroundColor: "black" }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          backgroundColor: "#7F00FF",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search" />
        </Pressable>

        <Feather name="mic" size={24} color="black" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
            source={{ uri: item }}
            key={index}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500", color:"white" }}>
          {route?.params?.title}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6, color:"white" }}>
          ₹{route?.params?.price}
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: "#7F00FF", borderWidth: 1 }} />


      <Text style={{ height: 1, borderColor: "#7F00FF", borderWidth: 1 }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5, color:"white" }}>
          Total : ₹{route.params.price}
        </Text>

        

        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            gap: 5,
          }}
        >
          

          <Text style={{ fontSize: 15, fontWeight: "500", color:"white" }}>
            Buy your tickets soon
          </Text>
        </View>
      </View>

      <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
        Selling Out Fast
      </Text>

      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: "#7F00FF",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text style={{color: "white"}}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={{color: "white"}}>Add to Cart</Text>
        )}
      </Pressable>

    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
