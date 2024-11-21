import React from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Box, NativeBaseProvider, Image, Text, Center } from 'native-base';
import logo from "../assets/logo.png"
import plants from "../assets/plantas.png"
import { Pressable } from 'native-base';
import Typography from '../Components/Typography';
const StartScreen = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <Box backgroundColor={"#F4F1DF"} height="full">
                        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Box marginTop={"15%"}></Box>
                            <Box position="relative" width="100%" height="47%">
                                <Box
                                    backgroundColor="#6A9C89"
                                    position="absolute"
                                    top="65%"
                                    left="0"
                                    right="0"
                                    transform={[{ translateY: -50 }]}
                                    height="20%"
                                    width="100%"
                                    zIndex={1}
                                />
                                <Center>
                                    <Image
                                        source={logo}
                                        alt="Logo"
                                        style={{
                                            width: "81%",
                                            height: "100%",
                                            resizeMode: 'cover',
                                            zIndex: 2,
                                        }}
                                    />
                                </Center>
                            </Box>
                            <Pressable _pressed={{ bg: 'rgba(106, 156, 137, 0.6)' }}
                                onPress={() => navigation.navigate('Login')}
                                style={{
                                    width: "69%",
                                    height: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#6A9C89",
                                    borderRadius: 13,
                                    marginBottom: "8%",
                                    marginTop: "9%"
                                }}>
                                <Typography style={{ fontSize: 21 }}>INICIAR SESIÓN</Typography>
                            </Pressable>
                            <Pressable _pressed={{ bg: 'rgba(106, 156, 137, 0.6)' }}
                                onPress={() => navigation.navigate('Register')}
                                style={{
                                    width: "69%",
                                    height: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#6A9C89",
                                    borderRadius: 13
                                }}>
                                <Typography style={{ fontSize: 21 }}>REGISTRAR</Typography>
                            </Pressable>
                        </Box>
                        <Box position="absolute" bottom={0} left={0} right={0}>
                            <Image source={plants} alt="plantas"
                                style={{
                                    width: "99%",
                                    resizeMode: 'cover',
                                }}
                            />
                        </Box>
                    </Box>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    )
}

export default StartScreen;