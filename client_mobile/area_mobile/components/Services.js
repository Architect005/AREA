import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon  from "react-native-vector-icons/FontAwesome5";

function Services (props) {
    return(
        <SafeAreaView style={{flex:1, alignItems: "center"}}>
            <View style={{width: "100%", height: "8%", backgroundColor: "black", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Image source={require('../images/AREA_Logo.png')} style={{}} width="30%" height="50%"/>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginRight: 20}}>
                    <Text style={{color: "white", fontWeight: "800", padding: 15, fontSize: 13}}>Loïc TOSSOU</Text>
                    <Icon name="user-alt" style={{color: "white", fontSize: 25}}></Icon>
                </View>
            </View>
            <ScrollView style={{paddingHorizontal: 70}}>
                <View>
                    <TouchableOpacity style={{marginTop: 20, width: 200, height: 120, backgroundColor: "indianred", borderRadius: 20, alignItems: "center", padding: 15}} onPress={() => props.navigation.navigate("Gmail_a")}>
                        <Ionicons name="md-mail" size={40} color="#000000"/>
                        <Text style={{fontWeight: "800", fontSize: 20, alignSelf: "center", color: "#000000", padding: 10}}>Gmail</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{marginTop: 20, width: 200, height: 120, backgroundColor: "tomato", borderRadius: 20, alignItems: "center", padding: 15}} onPress={() => props.navigation.navigate("Reddit_a")}>
                        <Ionicons name="md-logo-reddit" size={40} color="white"/>
                        <Text style={{fontWeight: "800", fontSize: 20, alignSelf: "center", color: "white", padding: 10}}>Reddit</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{marginTop: 20, width: 200, height: 120, backgroundColor: "dodgerblue", borderRadius: 20, alignItems: "center", padding: 15}} onPress={() => props.navigation.navigate("Calendar_a")}>
                        <Ionicons name="md-calendar" size={40} color="#000000"/>
                        <Text style={{fontWeight: "800", fontSize: 20, alignSelf: "center", color: "#000000", padding: 10}}>Calendar</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{marginTop: 20, width: 200, height: 120, backgroundColor: "crimson", borderRadius: 20, alignItems: "center", padding: 15}} onPress={() => props.navigation.navigate("Youtube_a")}>
                        <Ionicons name="md-logo-youtube" size={40} color="#000000"/>
                        <Text style={{fontWeight: "800", fontSize: 20, alignSelf: "center", color: "#000000", padding: 10}}>Youtube</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{marginTop: 20, width: 200, height: 120, backgroundColor: "goldenrod", borderRadius: 20, alignItems: "center", padding: 15}} onPress={() => props.navigation.navigate("Drive_a")}>
                        <Icon name="google-drive" size={40} color="black"></Icon>
                        <Text style={{fontWeight: "800", fontSize: 20, alignSelf: "center", color: "black", padding: 10}}>Onedrive</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Services