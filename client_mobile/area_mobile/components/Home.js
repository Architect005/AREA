import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, Modal, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon  from "react-native-vector-icons/FontAwesome5";

function Home (props) {
    const [state, setState] = useState(false);
    const myList = [["Youtube", "Twitter", "Action", "Reaction"]];
    return(
        <SafeAreaView style={{width: '100%', height: '100%'}}>
            <View style={{width: "100%", height: "8%", backgroundColor: "black", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Image source={require('../images/AREA_Logo.png')} style={{}} width="30%" height="50%"/>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginRight: 20}}>
                    <Text style={{color: "white", fontWeight: "800", padding: 15, fontSize: 13}}>Loïc TOSSOU</Text>
                    <Icon name="user-alt" style={{color: "white", fontSize: 25}}></Icon>
                </View>
            </View>

            <View style={{alignItems: "center", justifyContent: "center"}}>
                <TouchableOpacity style={{marginTop: 20, width: 200, height: 120, backgroundColor: "lightgray", borderRadius: 20, alignItems: "center", padding: 15}} onPress={() => setState(!state)}>
                    <Ionicons name="md-logo-youtube" size={35} color="red"/>
                    <Ionicons name="arrow-down-circle" size={18} color="#000000"/>
                    <Ionicons name="md-logo-twitter" size={35} color="blue"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
                   <Icon name="trash" style={{marginTop:15, color: "red", fontSize: 10}}>Supprimer</Icon>
                </TouchableOpacity>
            </View>

                        
            <View  style={{alignItems: "center", justifyContent: "center"}}>
                <Modal animationType={"fade"}
                visible={state}
                transparent={true}>
                {myList.map((innerList, index) => (
                    <View style={{width: "80%", height: "15%", backgroundColor: "lightgrey", display: "flex", bottom: -250, left:35, alignItems: "center", justifyContent: "center", borderRadius: 20}} key={index}>
                        <Text style = {{fontWeight: 'bold'}}>Area</Text>
                        {innerList.map((item) => (
                        <View>
                            <Text>{item}</Text>
                        </View>
                        ))}
                    </View>
                    ))}
                    <View style={{ display: "flex", bottom: -250, alignItems: "center", justifyContent: "center"}}>
                        <Button title="Ok" onPress={() => setState(!state)} />
                    </View>
                </Modal>
            </View>


            <View style={{height: "69%", width: "100%", alignItems: "center", justifyContent: "center"}}>
                <TouchableOpacity style={{width: 50, backgroundColor: "black", height: 50, alignItems: "center", justifyContent: "center", position: "absolute", right: 18, bottom: 10, borderRadius: 100}} onPress={() => props.navigation.navigate("Services")}>
                    <Icon name="plus" style={{color: "white", fontSize: 25}}></Icon>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    );
}

export default Home
