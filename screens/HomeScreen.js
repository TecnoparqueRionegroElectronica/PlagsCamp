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

const HomeScreen = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <View backgroundColor={"#F4F1DF"} height="full">
                        <Box position="relative" width="100%" height="47%">
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
                                left: "8%",
                                position: "absolute",
                                zIndex: 2,
                            }}>
                                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                    <Typography size={17} style={{
                                    }}>BIENVENIDO A</Typography>
                                    <Text style={{
                                        color: colors.brown,
                                        fontFamily: "Alice_400Regular",
                                        fontSize: 24
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
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    )
};

export default HomeScreen;
