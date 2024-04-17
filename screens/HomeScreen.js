import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://i.ibb.co/0hvkG59/music-jpeg.jpg",
      name: "Music",
    },
    {
      id: "1",
      image:
        "https://i.ibb.co/QJWWyv3/gaming.jpg",
      name: "Gaming",
    },
    {
      id: "3",
      image:
        "https://i.ibb.co/MMxwtM9/sports.jpg",
      name: "Sports",
    },
    {
      id: "4",
      image:
        "https://i.ibb.co/FVh39BN/art-jpeg.jpg",
      name: "Art",
    },
    {
      id: "5",
      image:
        "https://i.ibb.co/WpwFjnX/openmic.jpg",
      name: "OpenMic",
    },
  ];
  const images = [
    "https://i.ibb.co/9HspKs7/header-1.png",
    "https://i.ibb.co/fGn6Vdc/header-2.png",
    "https://i.ibb.co/GWxwVTq/header-3.png",
  ];
  const deals = [
    {
      id: "20",
      title: "Vishal and Sheykar Live Concert",
      price: 19000,
      image:
        "https://i.ibb.co/CKbjjJF/event-1.png",
      carouselImages: [
        "https://i.ibb.co/CKbjjJF/event-1.png",
        "https://i.ibb.co/xYprn3j/event-1-a.jpg",
        "https://i.ibb.co/0JTKtpQ/event-1-b.jpg",
      ],
      color: "Stellar Green",
    },
    {
      id: "30",
      title:
        "Anubhav Singh Bassi",
      price: 26000,
      image:
        "https://i.ibb.co/SswcsPF/event-2.png",
      carouselImages: [
        "https://i.ibb.co/SswcsPF/event-2.png",
        "https://i.ibb.co/BsLrgMb/event-2-b.jpg",
        "https://i.ibb.co/NN5zHnk/event-2-a.jpg",
      ],
      color: "Cloud Navy",
    },
    {
      id: "40",
      title:
        "Rambo Circus",
      price: 14000,
      image:
        "https://i.ibb.co/nfGJyzd/event-3.png",
      carouselImages: [
        "https://i.ibb.co/nfGJyzd/event-3.png",
        "https://i.ibb.co/gR5Bt2Z/event-3-b.png",
        "https://i.ibb.co/SdTR3NJ/event-3-a.png",
      ],
      color: "Icy Silver",
    },
    {
      id: "40",
      title:
        "World Jazz Festival",
      price: 10999,
      image:
        "https://i.ibb.co/w7kCpCQ/event-4.png",
      carouselImages: [
        "https://i.ibb.co/w7kCpCQ/event-4.png",
        "https://i.ibb.co/YDN4Gjh/event-4-a.jpg",
        "https://i.ibb.co/V0GX4zm/event-4-b.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Jubin Nautiyal Concert",
      offer: "72% off",
      price: 4500,
      image:
        "https://i.ibb.co/7QLwWTV/slider-1.png",
      carouselImages: [
        "https://i.ibb.co/7QLwWTV/slider-1.png",
        "https://i.ibb.co/MG6gzQR/slider-1-a.png",
        "https://i.ibb.co/YpjvNRB/slider-1-b.jpg",
      ],
    },
    {
      id: "1",
      title:
        "Maidaan Movie",
      offer: "40%",
      price: 3495,
      image: "https://i.ibb.co/JdzNpXs/slider-2.png",
      carouselImages: [
        "https://i.ibb.co/JdzNpXs/slider-2.png",
        "https://i.ibb.co/K9DqgbT/slider-2-b.jpg",
        "https://i.ibb.co/gwV1Yzb/slider-2-a.png",
      ],
    },
    {
      id: "2",
      title: "Savarkar Movie",
      offer: "40%",
      price: 3495,
      image: "https://i.ibb.co/J7CQyX4/slider-3.png",
      carouselImages: ["https://i.ibb.co/J7CQyX4/slider-3.png",
    "https://i.ibb.co/yWYmK3n/slider-3-b.png",
  "https://i.ibb.co/LrQNCny/slider-3-a.jpg"],
    },
    {
      id: "3",
      title:
        "Kolakata Knight Riders Match",
      offer: "40%",
      price: 19999,
      image: "https://i.ibb.co/8MJFJJ1/slider-4.png",
      carouselImages: [
        "https://i.ibb.co/8MJFJJ1/slider-4.png",
        "https://i.ibb.co/KjC713D/slider-4-b.jpg",
        "https://i.ibb.co/xjPTd3M/slider-4-a.jpg",
      ],
    },
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const [selectedEvent,setSelectedEvent] = useState("");
  console.log(selectedEvent)

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (userId) {
      fetchEvent();
    }
  }, [userId, modalVisible]);
  const fetchEvent = async () => {
    try {
      const response = await axios.get(
        `http://192.168.135.131:8000/events/${userId}`
      );
      const { events } = response.data;

      setEvents(events);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  console.log("event", events);
  return (
    <>
      <SafeAreaView
        style={{
          paddinTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "black",
          top: 30
        }}
      >
        <ScrollView>
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

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
            }}
          >
            <MaterialIcons name="event" size={24} color="black" />

            <Pressable>
            {selectedEvent ? (
                <Text>
                  Deliver to {selectedEvent?.name} - {selectedEvent?.location}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Add an event
                </Text>
              )}
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                    color:"white"
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold", color:"white" }}>
            Trending Events of the week
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </Pressable>
            ))}
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#7F00FF",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold", color:"white" }}>
            Upcoming Events and Movies
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />

                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text
            style={{
              height: 1,
              borderColor: "#7F00FF",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Event Creation
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
            Fill in the details
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {events?.map((item, index) => (
              <Pressable
              onPress={() => setSelectedEvent(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:selectedEvent === item ? "#FBCEB1" : "white"
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.description}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.timing}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.location}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  Pune, India
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Event");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add more events
              </Text>
            </Pressable>
          </ScrollView>
  
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
