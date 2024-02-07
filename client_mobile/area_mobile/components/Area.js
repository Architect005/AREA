import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon  from "react-native-vector-icons/FontAwesome5";

function Area(props) {
    return(
        <SafeAreaView style={{flex:1, alignItems: "center"}}>
            <View style={{width: "100%", height: "8%", backgroundColor: "black", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Image source={require('../images/AREA_Logo.png')} style={{}} width="30%" height="50%"/>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginRight: 20}}>
                    <Text style={{color: "white", fontWeight: "800", padding: 15, fontSize: 13}}>Loïc TOSSOU</Text>
                    <Icon name="user-alt" style={{color: "white", fontSize: 25}}></Icon>
                </View>
            </View>
            <View>
                <TouchableOpacity style={{marginTop: 20, width: 200, height: 120, backgroundColor: "black", borderRadius: 20, alignItems: "center", padding: 15}} onPress={() => props.navigation.navigate("Services")}>
                    <Text style={{fontWeight: "800", fontSize: 13, alignSelf: "center", color: "white", padding: 30}}>Area</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: "center", padding: 10, bottom: -10}}>
                <Ionicons name="md-arrow-down-circle" size={30} color="#000000"/>
            </View>
            <View>
                <TouchableOpacity style={{marginTop: 20, width: 200, height: 120, backgroundColor: "black", borderRadius: 20, alignItems: "center", padding: 15}} onPress={() => props.navigation.navigate("Services")}>
                    <Text style={{fontWeight: "800", fontSize: 13, alignSelf: "center", color: "white", padding: 30}}>Area</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: "center", padding: 10, bottom: -10}}>
                <Ionicons name="md-arrow-down-circle" size={30} color="#000000"/>
            </View>
            <View>
                <TouchableOpacity style={{marginTop: 20, width: 200, height: 120, backgroundColor: "black", borderRadius: 20, alignItems: "center", padding: 15}} onPress={() => props.navigation.navigate("Services")}>
                    <Text style={{fontWeight: "800", fontSize: 13, alignSelf: "center", color: "white", padding: 30}}>Area</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate("Register")} style={{backgroundColor: "black", borderRadius: 29, alignItems: "center", justifyContent: "center", position: "absolute", left: 18, bottom: -150}}>
                    <Text style={{color: "white", fontWeight: "800", paddingLeft: 30, paddingRight: 30, paddingBottom: 7, paddingTop: 7, fontSize: 18}}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Area