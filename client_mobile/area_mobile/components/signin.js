import React, {useEffect, useState} from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, Image, TextInput, Input } from "react-native";
import Icon  from "react-native-vector-icons/FontAwesome";
//import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import axios from "axios";

function Signin (props) {
    const [user, setUser] = useState({})

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '304277781281-895c14frohac9d0ccivohfde3edla345.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
        isSignedIn()
    }, [])

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = GoogleSignin.signIn();
            console.log ('due____', userInfo)
            setUser(userInfo)
        } catch (error) {
            console.log ('Message____', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available');
            } else {
                console.log('Some other Error Happened');
            }
        }
    };

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (!!isSignedIn) {
            getCurrentUserInfo()
        } else {
            console.log ('Please Login')
        }
    };

    const getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log ('edit____', user);
            setUser(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                alert('User has not signed in yest');
                console.log ('User has not signed in yet');
            } else {
                alert('Something went wrong');
                console.log ('Something went wrong')
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser({});
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{width: "100%", height: "8%", backgroundColor: "black", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Image source={require('../images/AREA_Logo.png')} style={{}} width="30%" height="50%" onPress={() => props.navigation.navigate("Accueil")}/>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginRight: 10}}>
                    <Text style={{color: "white", fontWeight: "800", padding: 15, fontSize: 11}}>Vous êtes nouveau ?</Text>
                    <TouchableOpacity style={{backgroundColor: "white", borderRadius: 29, padding: 5}} onPress={() => props.navigation.navigate("Signup")}>
                        <Text style={{fontWeight: "800", fontSize: 13}}>Inscrivez-vous</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <SafeAreaView style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <View style={{display: "flex", alignItems: "center"}}>
                        <Image source={require('../images/cloud.png')} style={{marginBottom: 0}} />
                        <Text style={{fontSize: 27, fontWeight: "800"}}>Connexion</Text>
                    </View>
                    {/* style={{display: "flex", alignItems: "center", flexDirection: "column"}} */}
                    <View style={{display: "flex", alignItems: "center", flexDirection: "column", borderWidth: 1, borderRadius: 20, padding: 5, marginRight: 30, shadowColor: '#171717', shadowOffset: {width: 8, height: 8}, shadowOpacity: 0.5, shadowRadius: 5, borderColor: "#929292", backgroundColor: "#fff"}}>
                        <View style={{borderWidth: 1, justifyContent: "center", alignItems: "center", width: '90%', padding: 10, borderRadius: 20, margin: 12}}>
                            <TextInput style={{width: '100%', fontSize: 15, fontWeight: "700"}} placeholder={"Email"} />
                        </View>
                        <View style={{borderWidth: 1, justifyContent: "center", alignItems: "center", width: '90%', padding: 10, borderRadius: 20, margin: 12}}>
                            <TextInput style={{width: '100%', fontSize: 15, fontWeight: "700"}} placeholder={"Mot de passe"} />
                        </View>
                        <TouchableOpacity style={{width: '90%', alignItems: "center", flexDirection: "row", display: "flex", padding: 15, borderRadius: 20, margin: 12, backgroundColor: "#0080FF"}} onPress={signIn}>
                            <Text style={{fontSize: 11, fontWeight: "800", color: "white"}}>Continuez avec Google</Text>
                            <Image source={require('../images/google.png')} style={{position: "absolute", right: 10, width:25, height: 25} } />
                        </TouchableOpacity>
                        <View style={{width: '90%', alignItems: "center", flexDirection: "row", display: "flex", padding: 15, borderRadius: 20, margin: 12, backgroundColor: "#1A4789"}}>
                            <Text style={{fontSize: 11, fontWeight: "800", color: "white"}}>Continuez avec Facebook</Text>
                            <Icon name="facebook" style={{color: "white", position: "absolute", right: 15, fontSize: 25}}></Icon>
                        </View>
                        <TouchableOpacity style={{borderWidth: 1, justifyContent: "center", alignItems: "center", width: '90%', padding: 10, borderRadius: 20, margin: 12, backgroundColor: "#000000"}} onPress={() => props.navigation.navigate("Home")}>
                            <Text style={{fontSize: 25, fontWeight: "800", color: "white"}}>Inscrivez-vous</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>

        </SafeAreaView>        
    );
}

export default Signin
