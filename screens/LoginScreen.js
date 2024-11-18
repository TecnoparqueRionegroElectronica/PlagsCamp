import React from "react";
import { Box, NativeBaseProvider, Image, Center } from 'native-base';
import logo from "../assets/1.png"
import plants from "../assets/plantas.png"
import Typography from '../Components/Typography';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from "native-base";

const LoginScreen = ({ navigation }) => {
    // let [fontsLoaded] = useFonts({
    //     Questrial_400Regular,
    //     Alice_400Regular,
    // });

    // if (!fontsLoaded) {
    //     return <AppLoading />;
    // }

    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <Box backgroundColor={"#F4F1DF"} height="full">
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
                            <Image
                                source={logo}
                                alt="Logo1"
                                style={{
                                    height: "85",
                                    width: "85",
                                    resizeMode: 'stretch',
                                    backgroundColor: "#674636"
                                }}
                            />
                            <Typography size={32}>Iniciar sesión</Typography>
                        </Box>
                    </Box>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    );
}

export default LoginScreen;
