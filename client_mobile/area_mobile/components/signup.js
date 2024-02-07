import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, Image, TextInput, Input } from "react-native";
import Icon  from "react-native-vector-icons/FontAwesome";

function Signup (props) {
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{width: "100%", height: "8%", backgroundColor: "black", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Image source={require('../images/AREA_Logo.png')} style={{}} width="30%" height="50%"/>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginRight: 10}}>
                    <Text style={{color: "white", fontWeight: "800", padding: 15, fontSize: 11}}>Déjà un compte ?</Text>
                    <TouchableOpacity style={{backgroundColor: "white", borderRadius: 29, padding: 5}} onPress={() => props.navigation.navigate("Signin")}>
                        <Text style={{fontWeight: "800", fontSize: 13}}>Connectez-vous</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <SafeAreaView style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <View style={{display: "flex", alignItems: "center"}}>
                        <Image source={require('../images/cloud.png')} style={{marginBottom: 0}} />
                        <Text style={{fontSize: 27, fontWeight: "800"}}>Inscription</Text>
                    </View>
                    {/* style={{display: "flex", alignItems: "center", flexDirection: "column"}} */}
                    <View style={{display: "flex", alignItems: "center", flexDirection: "column", borderWidth: 1, borderRadius: 20, padding: 5, marginRight: 30, shadowColor: '#171717', shadowOffset: {width: 8, height: 8}, shadowOpacity: 0.5, shadowRadius: 5, borderColor: "#929292", backgroundColor: "#fff"}}>
                        <View style={{borderWidth: 1, justifyContent: "center", alignItems: "center", width: '90%', padding: 10, borderRadius: 20, margin: 10}}>
                            <TextInput style={{width: '100%', fontSize: 15, fontWeight: "700"}} placeholder={"Pseudo"} />
                        </View>
                        <View style={{borderWidth: 1, justifyContent: "center", alignItems: "center", width: '90%', padding: 10, borderRadius: 20, margin: 10}}>
                            <TextInput style={{width: '100%', fontSize: 15, fontWeight: "700"}} placeholder={"Email"} />
                        </View>
                        <View style={{borderWidth: 1, justifyContent: "center", alignItems: "center", width: '90%', padding: 10, borderRadius: 20, margin: 10}}>
                            <TextInput style={{width: '100%', fontSize: 15, fontWeight: "700"}} placeholder={"Mot de passe"} />
                        </View>
                        <View style={{borderWidth: 1, justifyContent: "center", alignItems: "center", width: '90%', padding: 10, borderRadius: 20, margin: 10}}>
                            <TextInput style={{width: '100%', fontSize: 15, fontWeight: "700"}} placeholder={"Confirmez le mot de passe"} />
                        </View>
                        <View style={{width: '90%', alignItems: "center", flexDirection: "row", display: "flex", padding: 15, borderRadius: 20, margin: 10, backgroundColor: "#0080FF"}}>
                            <Text style={{fontSize: 11, fontWeight: "800", color: "white"}}>Continuez avec Google</Text>
                            <Image source={require('../images/google.png')} style={{position: "absolute", right: 20, width:25, height: 25} } />
                        </View>
                        <View style={{width: '90%', alignItems: "center", flexDirection: "row", display: "flex", padding: 15, borderRadius: 20, margin: 12, backgroundColor: "#1A4789"}}>
                            <Text style={{fontSize: 11, fontWeight: "800", color: "white"}}>Continuez avec Facebook</Text>
                            <Icon name="facebook" style={{color: "white", position: "absolute", right: 25, fontSize: 25}}></Icon>
                        </View>
                        <TouchableOpacity style={{justifyContent: "center", alignItems: "center", width: '90%', padding: 10, borderRadius: 20, margin: 12, backgroundColor: "#000000"}} onPress={() => props.navigation.navigate("Home")}>
                            <Text style={{fontSize: 25, fontWeight: "800", color: "white"}}>Inscrivez-vous</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>

        </SafeAreaView>        
    );
}

export default Signup