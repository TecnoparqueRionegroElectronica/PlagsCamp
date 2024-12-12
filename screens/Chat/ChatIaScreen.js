import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Box, NativeBaseProvider, Image, Pressable, VStack, HStack, Input, Spinner } from 'native-base';
import planta_sola from "../../assets/planta_sola.png"
import ia_icono from "../../assets/ia_icono_chat.png"
import usuario from "../../assets/usuario.png";
import Typography from '../../Components/Typography';
import { AppState, Dimensions, VirtualizedList } from "react-native";
import colors from "../../assets/colors/colors";
import { FontAwesome, Entypo, Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ChatItem from "./ChatItem";
import uploadToCloudinary from "../../Components/Cloudinary";
import { useFocusEffect } from "@react-navigation/native";
import { resources } from "../../sdk/resourse";
import { api } from "../../sdk/consumer";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const Ia = React.memo(() => (
    <Image source={ia_icono} alt="ia"
        style={{
            width: width * 0.12,
            height: height * 0.06,
            resizeMode: 'contain',
        }}
    />
));

const data = {
    inference_id: "212043a0-d077-4250-b735-cd71bfe70a8d",
    time: 0.28516717800084734,
    image: { width: 275, height: 183 },
    predictions: [
        {
            x: 169.5,
            y: 52,
            width: 51,
            height: 42,
            confidence: 0.6497458219528198,
            class: "scab",
            class_id: 3,
            detection_id: "4092334a-44da-4f75-8297-b9d09a59e057"
        },
        {
            x: 120.5,
            y: 74,
            width: 49,
            height: 28,
            confidence: 0.4442853033542633,
            class: "scab",
            class_id: 3,
            detection_id: "0fd0acbb-ed4d-45bc-b8e6-cf981b3525e5"
        },
        {
            x: 248.5,
            y: 54,
            width: 31,
            height: 22,
            confidence: 0.43552646040916443,
            class: "blotch",
            class_id: 0,
            detection_id: "4d809a1e-3188-4e8f-b44a-76e8bd69e9fc"
        },
        {
            x: 104.5,
            y: 132,
            width: 49,
            height: 38,
            confidence: 0.2963902950286865,
            class: "scab",
            class_id: 3,
            detection_id: "ce8a67af-d6b7-47e7-b554-9155c2edf98c"
        },
        {
            x: 65.5,
            y: 16.5,
            width: 53,
            height: 33,
            confidence: 0.21077492833137512,
            class: "scab",
            class_id: 3,
            detection_id: "bca4a864-37eb-4b13-baaf-dff99c5c8b55"
        },
        {
            x: 169,
            y: 110.5,
            width: 44,
            height: 27,
            confidence: 0.1788935661315918,
            class: "scab",
            class_id: 3,
            detection_id: "e0790b28-53b3-4630-a415-3e42142a2aac"
        },
        {
            x: 86.5,
            y: 140,
            width: 61,
            height: 48,
            confidence: 0.15866996347904205,
            class: "scab",
            class_id: 3,
            detection_id: "c6f800d5-0b3f-4d4c-a9e0-2d0b756b728b"
        },
        {
            x: 244.5,
            y: 8.5,
            width: 43,
            height: 17,
            confidence: 0.1258532702922821,
            class: "blotch",
            class_id: 0,
            detection_id: "0a36bd14-03d4-4124-a7d2-8376376725b4"
        },
        {
            x: 98.5,
            y: 173.5,
            width: 31,
            height: 19,
            confidence: 0.11523017287254333,
            class: "blotch",
            class_id: 0,
            detection_id: "3868c476-dbc7-4b0e-9ddb-fd9096a37bc2"
        }
    ]
}

const ChatIaScreen = ({ navigation }) => {
    const [isSending, setIsSending] = useState(false)
    const [message, setMessage] = useState("")
    const [photo, setPhoto] = useState(null)
    const [chatHistory, setChatHistory] = useState([])
    const [Id1, setId1] = useState(null)
    const [loading, setLoading] = useState(false)
    const [id_to, setId_to] = useState(null)
    const [secure_url, setSecure_url] = useState(null)
    const [isModalVisible1, setIsModalVisible1] = useState(false)
    const appState = useRef(AppState.currentState);

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

    useFocusEffect(
        useCallback(() => {
            let timeoutId = null;

            const checkAppStateAndFetch = () => {
                if (appState.current === 'active') {
                    obtener1();
                    timeoutId = setTimeout(checkAppStateAndFetch, 4400);
                }
            };

            checkAppStateAndFetch();

            return () => {
                if (timeoutId) clearTimeout(timeoutId);
            };
        }, [obtener1])
    );
    const obtener = async () => {
        setLoading(false)
        try {
            const id = await AsyncStorage.getItem("id")
            const id12 = JSON.parse(id)
            setId1(id12)
            const responseFrom = await api.get(`${resources.message}/from/${id12}`);
            if (responseFrom.data) {
                const filtro = responseFrom.data.filter((data) => data.id_to == 1)
                setId_to(filtro?.id_to)
                if (filtro?.id_to) {
                    const responseTo = await api.get(`${resources.message}/from/${filtro?.id_to}`);
                    if (responseTo.data) {
                        const filtro1 = responseFrom.data.filter((data) => data.id_to == id12)
                        const array2 = filtro1
                        const array1 = filtro
                        const combinedArray = [...array1, ...array2].sort((a, b) => a.date - b.date);
                        setChatHistory(combinedArray)
                    }
                } else {
                    setChatHistory(filtro)
                }
            }
        } catch (error) {
            console.error('Error de data:', error.response || error.message);
        } finally {
            setLoading(true);
        }
    };
    const obtener1 = async () => {
        try {
            const responseFrom = await api.get(`${resources.message}/from/${Id1}`);
            if (responseFrom.data) {
                setId_to(responseFrom.data[0]?.id_to)
                if (responseFrom.data[0]?.id_to) {
                    const responseTo = await api.get(`${resources.message}/from/${responseFrom.data[0]?.id_to}`);
                    if (responseTo.data) {
                        const array2 = responseTo.data
                        const array1 = responseFrom.data
                        const combinedArray = [...array1, ...array2].sort((a, b) => a.date - b.date);
                        setChatHistory(combinedArray)
                    }
                }
            }
        } catch (error) {
            console.error('Error de data:', error.response || error.message);
        }
    };

    useEffect(() => {
        obtener()
    }, [])

    const comprobar = async () => {
        const mensaje = message.replace(/^\s+/, '');
        if (mensaje == "") {
            if (photo) {
                handleSend()
                setInvalid(false)
            } else {
                setInvalid(true)
            }
        } else {
            handleSend()
            setInvalid(false)
        }
    }

    const handleSend = async () => {
        if (isSending || (!message && !photo)) {
            return;
        }
        setIsSending(true);
        try {
            let data
            if (photo) {
                const data1 = await uploadToCloudinary(secure_url.uri, secure_url.fileName, secure_url.mimeType);
                data = {
                    id_from: Id1,
                    id_to: id_to == null ? id_to : 2,
                    text: message ? message : null,
                    image_url: data1.secure_url ? data1.secure_url : null
                }
                const responseFrom = await api.post(`${resources.message}`, data);
            } else {
                data = {
                    id_from: Id1,
                    id_to: id_to == null ? id_to : 2,
                    text: message ? message : null,
                    image_url: null
                }
                const responseFrom = await api.post(`${resources.message}`, data);
            }
            setSecure_url(null)
            setPhoto(null)
            setMessage("")
            obtener()
        } catch (error) {
            console.error('Error de data:', error.response || error.message);
        } finally {
            setIsSending(false);
        }
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
            console.log(photo)
            setSecure_url({ uri: result.assets[0].uri, fileName: result.assets[0].fileName, mimeType: result.assets[0].mimeType })
            setIsModalVisible1(true)
        }
    };

    const closeImageModal = useCallback(async () => {
        setIsModalVisible1(false);
        setPhoto(null)
    }, []);

    const renderItem = ({ item }) => (
        <VStack px={4} py={2} flex={1}>
            <ChatItem
                chat={item}
                cuenta={Id1}
                fontSizeFactor={fontSizeFactor}
                fontSizeFactor3={fontSizeFactor3}
            />
        </VStack>
    )

    const getItem = (data, index) => data[index];

    const getItemCount = (data) => data.length;

    const keyExtractor = useCallback((item, index) => index.toString(), []);
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
                                <Box width={"80%"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Ia />
                                    <Typography size={18} style={{ color: colors.brown }}>Inteligencia Artificial</Typography>
                                </Box>
                            </Box>
                            <Box position={"absolute"} top={-7} right={-10}>
                                <Planta_sola />
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column" height="83%" pt={isModalVisible1 ? 0 : 3}>
                            {photo ? (
                                isModalVisible1 && (
                                    <Box
                                        style={{
                                            height: "100%",
                                            width: '100%',
                                            backgroundColor: "#c3c1b2",
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                        }}
                                    >
                                        <Pressable
                                            onPress={closeImageModal}
                                            _pressed={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                                            borderRadius="full"
                                            style={{
                                                width: 45,
                                                height: 45,
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <AntDesign name="close" size={width * fontSizeFactor1} color="white" />
                                        </Pressable>
                                        <Box
                                            width={width * 0.8}
                                            height={360}
                                            borderRadius="2xl"
                                            overflow="hidden"
                                        >
                                            <Image
                                                source={{ uri: photo }}
                                                alt="Imagen seleccionada"
                                                width="100%"
                                                height="100%"
                                                style={{ resizeMode: 'cover' }}
                                            />
                                        </Box>

                                    </Box>
                                )
                            ) : (
                                !loading ? (
                                    <Box justifyContent="center" alignItems="center">
                                        <Spinner size="lg" color="primary.500" />
                                    </Box>
                                ) : (
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
                                )
                            )}
                        </Box>
                        <Box position="absolute" bottom={0} left={0} right={0} p={3} backgroundColor={"#fff"}>

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
                                    {isSending ? <Spinner color="black" /> :
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
                                    {isSending ? <Spinner color="black" /> : <Ionicons name="send" size={25} color="black" />}
                                </Pressable>
                            </HStack>
                        </Box>
                    </Box>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    )
}

export default ChatIaScreen;