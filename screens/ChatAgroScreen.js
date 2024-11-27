import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Box, NativeBaseProvider, Image, Text, Center, HStack, Input, Spinner } from 'native-base';
import logo from "../assets/logo.png"
import plants from "../assets/plantas.png"
import planta_sola from "../assets/planta_sola.png"
import { Pressable } from 'native-base';
import Typography from '../Components/Typography';
import { Dimensions } from "react-native";
import colors from "../assets/colors/colors";
import { FontAwesome, Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

const Logo = React.memo(() => (
    <Image
        source={logo}
        alt="Logo"
        style={{
            width: width * 0.8,
            height: "100%",
            resizeMode: 'cover',
            zIndex: 2,
        }}
    />
));
const Planta_sola = React.memo(() => (
    <Image source={planta_sola} alt="plantas"
        style={{
            width: width * 0.2,
            height: height * 0.1,
            resizeMode: 'cover',
        }}
    />
));

const ChatAgroScreen = ({ navigation }) => {
    const [isSending, setIsSending] = useState(false)
    const [message, setMessage] = useState("")

    const comprobar = () => {

    }
    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <Box backgroundColor={"#F4F1DF"} height="full">
                        <Box style={{ backgroundColor: colors.green }} height={height * 0.095} position={"relative"}>
                            <Box position={"absolute"} top={-7} right={-10}>
                                <Planta_sola />
                            </Box>
                        </Box>
                        <Box position="absolute" bottom={0} left={0} right={0} p={3} backgroundColor={colors.darkBlue}>

                            <HStack space={2} alignItems="center" justifyContent="space-around">
                                <Input
                                    flex={1}
                                    placeholder="Escribe un mensaje..."
                                    value={message}
                                    onChangeText={setMessage}
                                    variant="rounded"
                                    borderColor={"#000000"}
                                    borderWidth={2}
                                    // color={colors.white}
                                    fontSize={width > 600 ? 17 : 13}
                                    px={4}
                                    py={width > 600 ? 4 : 2}
                                    fontFamily={'Questrial_400Regular'}
                                    rightElement={
                                        <FontAwesome name="microphone" size={24} color="black" style={{
                                            marginRight: 14
                                        }} />
                                    }
                                // leftElement={
                                //     <AntDesign name="search1" size={24} color="black" style={{
                                //         marginLeft: 14
                                //     }}/>
                                // }
                                />
                                <Pressable _pressed={{ bg: 'rgba(255, 255, 255, 0.1)' }} onPress={comprobar} borderRadius="full"
                                    style={{
                                        width: 45,
                                        height: 45,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        opacity: isSending ? 0.5 : 1
                                    }}
                                    disabled={isSending}
                                >
                                    {isSending ? <Spinner color="white" /> : <Entypo name="camera" size={40} color="black" />}
                                </Pressable>
                                <Pressable _pressed={{ bg: 'rgba(255, 255, 255, 0.1)' }} onPress={comprobar} borderRadius="full"
                                    style={{
                                        width: 45,
                                        height: 45,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        opacity: isSending ? 0.5 : 1
                                    }}
                                    disabled={isSending}
                                >
                                    {isSending ? <Spinner color="white" /> : <Ionicons name="send" size={25} color="black" />}
                                </Pressable>
                            </HStack>
                        </Box>
                    </Box>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    )
}

export default ChatAgroScreen;