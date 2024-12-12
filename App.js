import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { Platform, View } from 'react-native';
import { useFonts, Questrial_400Regular } from "@expo-google-fonts/questrial";
import { Alice_400Regular } from '@expo-google-fonts/alice';
import AppLoading from 'expo-app-loading';

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

//Importamos las screens
import LoginScreen from './screens/LoginScreen';
import StartScreen from './screens/StartScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { NativeBaseProvider } from 'native-base';
import * as NavigationBar from 'expo-navigation-bar';
import ChatAgroScreen from './screens/Chat/ChatAgroScreen';
import ChatIaScreen from './screens/Chat/ChatIaScreen';

//Creamos Stack para manejar la navegacion
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({ Questrial_400Regular,  Alice_400Regular});
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NativeBaseProvider>
        <StatusBar style='dark' backgroundColor='#F4F1DF' />
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Start' screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, unmountOnBlur: true, headerShown: false}}>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen}  />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ChatAgro" component={ChatAgroScreen} />
            <Stack.Screen name="ChatIa" component={ChatIaScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </View>
  );
}

