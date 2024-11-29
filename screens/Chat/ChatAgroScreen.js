import React, { useCallback, useMemo, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Box, NativeBaseProvider, Image, Pressable, VStack, HStack, Input, Spinner } from 'native-base';
import planta_sola from "../../assets/planta_sola.png"
import usuario from "../../assets/usuario.png";
import Typography from '../../Components/Typography';
import { Dimensions, VirtualizedList } from "react-native";
import colors from "../../assets/colors/colors";
import { FontAwesome, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ChatItem from "./ChatItem";

const { width, height } = Dimensions.get('window');

const Planta_sola = React.memo(() => (
    <Image source={planta_sola} alt="plantas"
        style={{
            width: width * 0.19,
            height: height * 0.09,
            resizeMode: 'contain',
        }}
    />
));
const Usuario_icon = React.memo(() => (
    <Image source={usuario} alt="usuario"
        style={{
            width: width * 0.118,
            height: height * 0.057,
            resizeMode: 'contain',
        }}
    />
));

const chatHistory1 = [
    {
        id: 1,
        account_id: 2,
        message: "Hola, ¿cómo estás?",
        file: {
            name: "",
            file: null,
        },
        created: "2024-11-28T15:30:00Z",
    },
    {
        id: 2,
        account_id: 1,
        message: "Hola, bien y usted",
        file: {
            name: "",
            file: null,
        },
        created: "2024-11-28T15:30:00Z",
    },
]

const ChatAgroScreen = ({ navigation }) => {
    const [isSending, setIsSending] = useState(false)
    const [message, setMessage] = useState("")
    const [photo, setPhoto] = useState(null)
    const [chatHistory, setChatHistory] = useState(chatHistory1)

    const { fontSizeFactor, fontSizeFactor1, fontSizeFactor2, fontSizeFactor3, sizeIcon, sizeIcon1, sizeCell, sizeCell1, sizeIcon2 } = useMemo(() => {
        const factor = width > 600 ? 0.021 : 0.033;
        return {
            fontSizeFactor: factor,
            fontSizeFactor1: width > 600 ? 0.032 : 0.055,
            fontSizeFactor2: width > 600 ? 0.013 : 0.022,
            fontSizeFactor3: width > 600 ? 0.013 : 0.02,
            sizeCell: width > 600 ? 0.078 : 0.09,
            sizeCell1: width > 600 ? 0.04 : 0.05,
            sizeIcon: width > 600 ? 0.045 : 0.065,
            sizeIcon1: width > 600 ? 0.038 : 0.06,
            sizeIcon2: width > 600 ? 0.035 : 0.05,
        };
    }, [width]);

    const comprobar = () => {
        setChatHistory([...chatHistory, {
            id: Date.now(),
            account_id: 1,
            message: message,
            file: {
                name: "",
                file: null,
            },
            created: "2024-11-28T15:50:00Z",
        }])
        setMessage("")
    }
    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Se necesitan permisos para usar la cámara.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
            const { uri, fileName, mimeType } = result.assets[0];
            setChatHistory([...chatHistory, {
                id: 3,
                account_id: 1,
                message: "",
                file: {
                    name: fileName,
                    file: uri,
                },
                created: "2024-11-28T15:40:00Z",
            }])
        }
    };
    const renderItem = ({ item }) => (
        <VStack px={4} py={2} flex={1}>
            <ChatItem
                chat={item}
                cuenta={1}
                fontSizeFactor={fontSizeFactor}
                fontSizeFactor3={fontSizeFactor3}
            />
        </VStack>
    )

    const getItem = (data, index) => data[index];

    const getItemCount = (data) => data.length;

    const keyExtractor = useCallback((item) => item.id.toString(), []);
    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <Box backgroundColor={"#F4F1DF"} height="full">
                        <Box style={{ backgroundColor: colors.green }} height={height * 0.088} position={"relative"}>
                            <Box position={"absolute"} top={"30%"} left={"2%"}>
                                <Pressable onPress={() => navigation.navigate('Home')} _pressed={{ opacity: 0.8, transform: [{ scale: 0.97 }], }} >
                                    <MaterialIcons name="arrow-back-ios" size={33} color={colors.brown} />
                                </Pressable>
                            </Box>
                            <Box position={"absolute"} top={"20%"} left={"10%"}>
                                <Box width={"63%"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Usuario_icon />
                                    <Typography size={18} style={{ color: colors.brown }}>Agrónomo</Typography>
                                </Box>
                            </Box>
                            <Box position={"absolute"} top={-7} right={-10}>
                                <Planta_sola />
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column" height="85.5%" pt={3}>
                            <VirtualizedList
                                data={chatHistory}
                                initialNumToRender={10}
                                windowSize={5}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                getItemCount={getItemCount}
                                getItem={getItem}
                                keyboardShouldPersistTaps="handled"
                                // onScroll={onScroll}
                                removeClippedSubviews={true}
                            // inverted
                            />
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
                                    fontSize={width > 600 ? 17 : 13}
                                    px={4}
                                    py={width > 600 ? 4 : 2}
                                    fontFamily={'Questrial_400Regular'}
                                    rightElement={
                                        <FontAwesome name="microphone" size={24} color="black" style={{
                                            marginRight: 14
                                        }} />
                                    }
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
                                    {isSending ? <Spinner color="white" /> :
                                        <Pressable onPress={() => takePhoto()} _pressed={{ opacity: 0.8, transform: [{ scale: 0.97 }], }}>
                                            <Entypo name="camera" size={40} color="black" />
                                        </Pressable>
                                    }
                                </Pressable>
                                <Pressable _pressed={{ opacity: 0.8, transform: [{ scale: 0.97 }] }} onPress={comprobar} borderRadius="full"
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