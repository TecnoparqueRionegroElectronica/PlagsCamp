import React, { useState } from "react";
import { Box, NativeBaseProvider, Image, Pressable, View, Text } from 'native-base';
import logo from "../assets/1.png"
import plants from "../assets/file.png"
import campesino from "../assets/campesino.png"
import ia from "../assets/icono_ia.png"
import Typography from '../Components/Typography';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from "react-native";
import colors from "../assets/colors/colors";

const { width, height } = Dimensions.get('window');

const Logo = React.memo(() => (
    <Image
        source={logo}
        alt="Logo1"
        style={{
            height: "15%",
            width: "15%",
            resizeMode: 'contain',
            top: "5%",
            left: "3%",
            position: "absolute",
            zIndex: 1,
            marginRight: "2%"
        }}
    />
));

const Plantas = React.memo(() => (
    <Image
        source={plants}
        alt="plantas"
        style={{
            height: "74%",
            width: "100%",
            resizeMode: 'contain',
            marginRight: "2%",
            zIndex: 0
        }}
    />
));

const Ia_icon = React.memo(() => (
    <Image
        source={ia}
        alt="icono_ia"
        style={{
            height: height * 0.7,
            width: width * 0.3,
            resizeMode: 'contain',
        }}
    />
));
const Campesino_icono = React.memo(() => (
    <Image
        source={campesino}
        alt="icono_campesino"
        style={{
            height: height * 0.7,
            width: width * 0.3,
            resizeMode: 'contain',
        }}
    />
));

const HomeScreen = ({ navigation }) => {
    
    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <View backgroundColor={"#F4F1DF"} height="full">
                        <Box position="relative" width="100%" height={height * 0.45}>
                            <Logo />
                            <Box style={{
                                top: "30%",
                                left: "4%",
                                position: "absolute",
                                zIndex: 2,
                            }}>
                                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-around"}>
                                    <Typography size={18}>BIENVENIDO A</Typography>
                                    <Text style={{
                                        color: colors.brown,
                                        fontFamily: "Alice_400Regular",
                                        fontSize: 28,
                                        paddingTop: "1.4%"
                                    }}>PLAGSCAMP</Text>
                                </Box>
                            </Box>
                            <Plantas />
                        </Box>
                        <Box style={{
                            backgroundColor: colors.brown,
                            flexDirection: "column",
                            paddingVertical: 17,
                            paddingHorizontal: 2,
                        }}>
                            <Typography size={width > 600 ? 21 : 18} style={{ color: "white", textAlign: "center" }}>Elige la opción que deseas para ayudarte mitigar tu plaga</Typography>
                        </Box>
                        <Box pt={height * 0.07} width={width} height={height * 0.26} flexDirection={"row"} justifyContent={"space-between"} px={6}>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"}>
                                <Pressable onPress={()=>navigation.navigate('ChatAgro', { name: "ia" })} _pressed={{ opacity: 0.8, transform: [{ scale: 0.97 }], }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={width * 0.4} height={"100%"}
                                    style={{
                                        backgroundColor: colors.green,
                                        borderRadius: 20
                                    }} >
                                    <Ia_icon />
                                </Pressable>
                                <Box pt={"6%"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                    <Typography size={width > 600 ? 15 : 18}>Habla</Typography>
                                    <Typography size={width > 600 ? 15 : 18}>con la IA</Typography>
                                </Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"}>
                                <Pressable onPress={()=>navigation.navigate('ChatAgro', { name: "agronomo" })} _pressed={{ opacity: 0.8, transform: [{ scale: 0.97 }] }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={width * 0.4} height={"100%"}
                                    style={{
                                        backgroundColor: colors.green,
                                        borderRadius: 20
                                    }}>
                                    <Campesino_icono/>
                                </Pressable>
                                <Box pt={"6%"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                    <Typography size={width > 600 ? 25 : 18}>Habla con el</Typography>
                                    <Typography size={width > 600 ? 25 : 18}>agrónomo</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider >
    )
};

export default HomeScreen;
