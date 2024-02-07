import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Accueil from './components/Accueil';
import Signin from './components/signin';
import Signup from './components/signup';
import Home from './components/Home';
import Services from './components/Services';
import Gmail_a from './components/Gmail_actions';
import Youtube_a from './components/Youtube_actions copy';
import Drive_a from './components/Onedrive_actions';
import Reddit_a from './components/Reddit_actions copy';
import Calendar_a from './components/Calendar_actions copy';
import Calendar_r from './components/Calendar_reactions';
import Gmail_r from './components/Gmail_reactions';
import Onedrive_r from './components/Onedrive_reactions';
import Spotify_r from './components/Spotify_reactions copy';
import Area from './components/Area';
import Reactions from './components/Reactions';
import Register from './components/Register';

const Tab = createBottomTabNavigator()

/*function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Accueil" component={Accueil} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="Youtube_a" component={Youtube_a}/>
      <Stack.Screen name="Gmail_a" component={Gmail_a}/>
      <Stack.Screen name="Drive_a" component={Drive_a}/>
      <Stack.Screen name="Reddit_a" component={Reddit_a}/>
      <Stack.Screen name="Calendar_a" component={Calendar_a}/>
      <Stack.Screen name="Calendar_r" component={Calendar_r}/>
      <Stack.Screen name="Gmail_r" component={Gmail_r}/>
      <Stack.Screen name="Onedrive_r" component={Onedrive_r}/>
      <Stack.Screen name="Spotify_r" component={Spotify_r}/>
      <Stack.Screen name="Area" component={Area}/>
      <Stack.Screen name="Reactions" component={Reactions}/>
      <Stack.Screen name="Register" component={Register}/>
    </Stack.Navigator>
  );
}*/

function App() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false}}>
      <Tab.Screen name="Accueil" component={Accueil} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Signup" component={Signup} options={{tabBarStyle:{display: "none"}}} />
      <Tab.Screen name="Signin" component={Signin} options={{tabBarStyle:{display: "none"}}} />
      <Tab.Screen name="Home" component={Home} options={{tabBarStyle:{display: "none"}}} />
      <Tab.Screen name="Services" component={Services} options={{tabBarStyle:{display: "none"}}} />
      <Tab.Screen name="Youtube_a" component={Youtube_a} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Gmail_a" component={Gmail_a} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Drive_a" component={Drive_a} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Reddit_a" component={Reddit_a} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Calendar_a" component={Calendar_a} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Calendar_r" component={Calendar_r} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Gmail_r" component={Gmail_r} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Onedrive_r" component={Onedrive_r} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Spotify_r" component={Spotify_r} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Area" component={Area} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Reactions" component={Reactions} options={{tabBarStyle:{display: "none"}}}/>
      <Tab.Screen name="Register" component={Register} options={{tabBarStyle:{display: "none"}}}/>
    </Tab.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
