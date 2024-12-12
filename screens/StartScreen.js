import React from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Box, NativeBaseProvider, Image, Text, Center } from 'native-base';
import logo from "../assets/logo.png"
import plants from "../assets/plantas.png"
import { Pressable } from 'native-base';
import Typography from '../Components/Typography';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const Logo = React.memo(() => (
    <Image
        source={logo}
        alt="Logo"
        style={{
            width: width * 0.8,
            height: "100%",
            resizeMode: 'contain',
            zIndex: 2,
        }}
    />
));
const Plantas = React.memo(() => (
    <Image source={plants} alt="plantas"
        style={{
            width: width * 0.99,
            resizeMode: 'contain',
        }}
    />
));

const StartScreen = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <Box backgroundColor={"#F4F1DF"} height="full">
                        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Box marginTop={height * 0.15}></Box>
                            <Box position="relative" width="100%" height={height * 0.38}>
                                <Box
                                    backgroundColor="#6A9C89"
                                    position="absolute"
                                    top="65%"
                                    left="0"
                                    right="0"
                                    transform={[{ translateY: -50 }]}
                                    height={height * 0.1}
                                    width="100%"
                                    zIndex={1}
                                />
                                <Center>
                                    <Logo />
                                </Center>
                            </Box>
                            <Pressable bg={"#6A9C89"} _pressed={{ opacity: 0.8, transform: [{ scale: 0.97 }] }}
                                onPress={() => navigation.navigate('Login')}
                                style={{
                                    width: width * 0.69,
                                    height: height * 0.1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 13,
                                    marginBottom: "8%",
                                    marginTop: "9%"
                                }}>
                                <Typography style={{ fontSize: 21 }}>INICIAR SESIÓN</Typography>
                            </Pressable>
                            <Pressable bg={"#6A9C89"} _pressed={{ opacity: 0.8, transform: [{ scale: 0.97 }] }}
                                onPress={() => navigation.navigate('Register')}
                                style={{
                                    width: width * 0.69,
                                    height: height * 0.1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 13
                                }}>
                                <Typography style={{ fontSize: 21 }}>REGISTRAR</Typography>
                            </Pressable>
                        </Box>
                        <Box position="absolute" bottom={-1} left={0} right={0}>
                            <Plantas/>
                        </Box>
                    </Box>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    )
}

export default StartScreen;