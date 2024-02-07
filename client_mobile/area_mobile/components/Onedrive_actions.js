import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import Icon  from "react-native-vector-icons/FontAwesome5";

function Drive_a(props) {
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
                <TouchableOpacity style={{marginTop: 20, width: 200, height: 120, backgroundColor: "goldenrod", borderRadius: 20, alignItems: "center", padding: 15}} onPress={() => props.navigation.navigate("Reactions")}>
                    <Text style={{fontWeight: "800", fontSize: 15, alignSelf: "center", color: "black", padding: 10}}>Un nouveau fichier est enregistré</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Drive_a