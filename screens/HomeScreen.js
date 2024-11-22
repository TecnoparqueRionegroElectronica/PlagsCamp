import React, { useState } from "react";
import { Box, NativeBaseProvider, Image, Center, FormControl, Input, Button, ScrollView, View, Text } from 'native-base';
import logo from "../assets/1.png"
import plants from "../assets/file.png"
import Typography from '../Components/Typography';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from "native-base";
import { Dimensions } from "react-native";
import colors from "../assets/colors/colors";
import { Octicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <View backgroundColor={"#F4F1DF"} height="full">
                        <Box position="relative" width="100%" height={height * 0.47}>
                            <Image
                                source={logo}
                                alt="Logo1"
                                style={{
                                    height: "15%",
                                    width: "15%",
                                    resizeMode: 'stretch',
                                    top: "5%",
                                    left: "3%",
                                    position: "absolute",
                                    zIndex: 1,
                                    marginRight: "2%"
                                }}
                            />
                            <Box style={{
                                top: "30%",
                                left: "4%",
                                position: "absolute",
                                zIndex: 2,
                                // backgroundColor: "#F4F1DF",
                                // paddingVertical: 10,
                                // overflow: "visible",
                            }}>
                                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-around"}>
                                    <Typography size={18} style={{
                                        // paddingBottom: 8 
                                    }}>BIENVENIDO A</Typography>
                                    <Text style={{
                                        color: colors.brown,
                                        fontFamily: "Alice_400Regular",
                                        fontSize: 28,
                                        // fontWeight: "bold",
                                        paddingTop: "1.4%"
                                    }}>PLAGSCAMP</Text>
                                </Box>
                            </Box>
                            <Image
                                source={plants}
                                alt="plantas"
                                style={{
                                    height: "80%",
                                    width: "100%",
                                    resizeMode: 'stretch',
                                    // backgroundColor: "#674636"
                                    marginRight: "2%",
                                    zIndex: 0
                                }}
                            />
                        </Box>
                        <Box style={{
                            backgroundColor: colors.brown,
                            // display: "flex",
                            flexDirection: "column",
                            // alignItems: "center",
                            // justifyContent: "center",
                            paddingVertical: 15,
                            paddingHorizontal: 2
                        }}>
                            <Typography size={19} style={{color: "white",textAlign: "center"}}>Elige la opción que deseas para ayudarte mitigar tu plaga</Typography>
                        </Box>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    )
};

export default HomeScreen;
