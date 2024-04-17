import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useEffect, useState,useContext } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import jwt_decode from "jwt-decode"
  import { UserType } from "../UserContext";
  import axios from "axios";
  import { useNavigation } from "@react-navigation/native";
  
  const EventScreen = () => {
      const navigation = useNavigation();
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [timing, setTiming] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const {userId,setUserId} = useContext(UserType)
    useEffect(() => {
      const fetchUser = async() => {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          setUserId(userId)
      }
  
      fetchUser();
    },[]);
    console.log(userId)
    const handleEvent = () => {
        const event = {
            name,
            mobileNo,
            description,
            location,
            timing,
            postalCode
        }
  
        axios.post("http://192.168.135.131:8000/events",{userId,event}).then((response) => {
            Alert.alert("Success","Event added successfully");
            setName("");
            setMobileNo("");
            setDescription("");
            setLocation("");
            setTiming("");
            setPostalCode("");
  
            setTimeout(() => {
              navigation.goBack();
            },500)
        }).catch((error) => {
            Alert.alert("Error","Failed to add event")
            console.log("error",error)
        })
    }
    return (
      <ScrollView style={{ marginTop: 50 }}>
  
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Add a new Event
          </Text>
  
          <TextInput
            placeholderTextColor={"black"}
            placeholder="India"
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Name of event
            </Text>
  
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Event name"
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Contact Number
            </Text>
  
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Mobile No"
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Event Description
            </Text>
  
            <TextInput
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Location
            </Text>
            <TextInput
              value={location}
              onChangeText={(text) => setLocation(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Timing</Text>
            <TextInput
              value={timing}
              onChangeText={(text) => setTiming(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Onwards"
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
  
            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Enter Pincode"
            />
          </View>
  
          <Pressable
          onPress={handleEvent}
            style={{
              backgroundColor: "#7F00FF",
              padding: 19,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", color:"white" }}>Add Event</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  };
  
  export default EventScreen;
  
  const styles = StyleSheet.create({});
  