import React, { useState } from "react";
import { Box, NativeBaseProvider, Image, Center, FormControl, Input, Button, ScrollView, View } from 'native-base';
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
                        <Image
                            source={plants}
                            alt="plantas"
                            style={{
                                height: "25%",
                                width: "100%",
                                resizeMode: 'stretch',
                                // backgroundColor: "#674636"
                                marginRight: "2%"
                            }}
                        />
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    )
};

export default HomeScreen;
