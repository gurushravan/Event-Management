import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios"; 
import { UserType } from "../UserContext";

const AddEventScreen = () => {
  const navigation = useNavigation();
  const [events, setEvent] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  console.log("userId", userId);
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `http://192.168.135.131:8000/events/${userId}`
      );
      const { events } = response.data;

      setEvent(events);
    } catch (error) {
      console.log("error", error);
    }
  };
  //refresh the event when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );
  console.log("events", events);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Events</Text>

        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new event</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {/* all the added events */}
          {events?.map((item, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.description}, {item?.timing}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.location}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Pune, India
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Phone No : {item?.mobileNo}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                Pin code : {item?.postalCode}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddEventScreen;

const styles = StyleSheet.create({});
