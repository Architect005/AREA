import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, Image } from "react-native";


function Accueil(props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Image source={require('../images/Accueil.png')} style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: null, height: null, resizeMode: 'cover',}} />

            <View style={{width: "100%", height: "8%", backgroundColor: "black", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Image source={require('../images/AREA_Logo.png')} style={{}} width="30%" height="50%"/>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginRight: 10}}>
                    <TouchableOpacity>
                        <Text style={{color: "white", fontWeight: "800", padding: 15, fontSize: 11}}>Aide ?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "white", borderRadius: 29, padding: 5}} onPress={() => props.navigation.navigate("Signin")}>
                        <Text style={{fontWeight: "800", fontSize: 13}}>Connectez-vous</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>                
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Image source={require('../images/AREA_Logo.png')} style={{marginBottom: 0}} />
                    <View style={{marginTop: 30, marginBottom: 40}}>
                        <Text style={{fontWeight: "600", fontSize: 15}}>Un moyen  d'automatiser vos applications et logiciels. </Text>
                        <Text style={{fontWeight: "600", fontSize: 15, textAlign: "center"}}> Voulez-vous profiter des services de Area ? </Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Signup")} style={{backgroundColor: "black", borderRadius: 29}}>
                        <Text style={{color: "white", fontWeight: "800", paddingLeft: 30, paddingRight: 30, paddingBottom: 7, paddingTop: 7, fontSize: 18}}>Commençons</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </SafeAreaView>
    );
}

export default Accueil