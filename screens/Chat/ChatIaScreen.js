import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Box, NativeBaseProvider, Image, Pressable, VStack, HStack, Input, Spinner } from 'native-base';
import planta_sola from "../../assets/planta_sola.png"
import ia_icono from "../../assets/ia_icono_chat.png"
import Typography from '../../Components/Typography';
import { AppState, Dimensions, VirtualizedList, Alert } from "react-native";
import colors from "../../assets/colors/colors";
import { FontAwesome, Entypo, Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import uploadToCloudinary from "../../Components/Cloudinary";
import { useFocusEffect } from "@react-navigation/native";
import { resources } from "../../sdk/resourse";
import { api } from "../../sdk/consumer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatItemIa from "./ChatItemIa";

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
    const obtener = async () => {
        setLoading(false)
        try {
            const id = await AsyncStorage.getItem("id")
            const id12 = JSON.parse(id)
            setId1(id12)
            const responseFrom = await api.get(`${resources.message}/from/${id12}`);
            const responseIa = await api.get(`${resources.message}/from/1`);
            if (responseFrom.data) {
                const filtro = responseFrom.data.filter((data) => data.id_to == 1)
                const filtro1 = responseIa.data.filter((data) => data.id_to == id12)
                setId_to(filtro?.id_to)
                if (filtro.length > 0 && filtro1.length > 0) {
                    const array2 = filtro
                    const array1 = filtro1
                    const combinedArray = [...array1, ...array2].sort((a, b) => a.date - b.date);
                    const chatsWithProcessedText = await Promise.all(
                        combinedArray.map(async (chat) => ({
                            ...chat,
                            processedText: await processChatText(chat),
                        }))
                    );
                    setChatHistory(chatsWithProcessedText)
                } else {
                    const chatsWithProcessedText = await Promise.all(
                        filtro.map(async (chat) => ({
                            ...chat,
                            processedText: await processChatText(chat),
                        }))
                    );
                    setChatHistory(chatsWithProcessedText)
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
            const responseIa = await api.get(`${resources.message}/from/1`);
            if (responseFrom.data) {
                const filtro = responseFrom.data.filter((data) => data.id_to == 1)
                const filtro1 = responseIa.data.filter((data) => data.id_to == Id1)
                setId_to(filtro?.id_to)
                if (filtro.length > 0 && filtro1.length > 0) {
                    const array2 = filtro
                    const array1 = filtro1
                    const combinedArray = [...array1, ...array2].sort((a, b) => a.date - b.date);
                    const chatsWithProcessedText = await Promise.all(
                        combinedArray.map(async (chat) => ({
                            ...chat,
                            processedText: await processChatText(chat),
                        }))
                    );
                    setChatHistory(chatsWithProcessedText)
                } else {
                    const chatsWithProcessedText = await Promise.all(
                        filtro.map(async (chat) => ({
                            ...chat,
                            processedText: await processChatText(chat),
                        }))
                    );
                    setChatHistory(chatsWithProcessedText)
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
                    id_to: 1,
                    text: message ? message : "",
                    image_url: data1.secure_url ? data1.secure_url : null
                }
                await api.post(`${resources.messageIa}`, data);
            } else {
                data = {
                    id_from: Id1,
                    id_to: 1,
                    text: message ? message : "",
                    image_url: null
                }
                await api.post(`${resources.messageIa}`, data);
            }
            setSecure_url(null)
            setPhoto(null)
            setMessage("")
            obtener1()
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
        const action = await Alert.alert(
            "Seleccionar imagen",
            "¿Quieres tomar una foto o seleccionar de la galería?",
            [
                { text: "Tomar foto", onPress: async () => await launchCamera() },
                { text: "Seleccionar de la galería", onPress: async () => await launchGallery() },
                { text: "Cancelar", style: "cancel" }
            ]
        );
    };

    const launchCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
            console.log(result.assets[0].uri);
            setSecure_url({ uri: result.assets[0].uri, fileName: result.assets[0].fileName, mimeType: result.assets[0].mimeType });
            setIsModalVisible1(true);
        }
    };

    const launchGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
            console.log(result.assets[0].uri);
            setSecure_url({ uri: result.assets[0].uri, fileName: result.assets[0].fileName, mimeType: result.assets[0].mimeType });
            setIsModalVisible1(true);
        }
    };

    const closeImageModal = useCallback(async () => {
        setIsModalVisible1(false);
        setPhoto(null)
    }, []);

    const processChatText = async (chat) => {
        let classNames = [];
        let healthy = false;
        if (typeof chat?.text === "object" && Array.isArray(chat?.text?.predictions)) {
            chat.text.predictions.forEach(prediction => {
                classNames.push(prediction.class);
            });
            if (classNames.length==0){
                return "No se encontraron plagas"
            }
            classNames = classNames.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            classNames = classNames.map(name => {
                if (name.includes("scab")) {
                    return "Costra"
                } else if (name.includes("blotch")) {
                    return "Mancha"
                } else if (name.includes("rotten")) {
                    return "Podrido"
                } else if (name.includes("healthy")){
                    healthy = true
                    return "Saludable"
                }else {
                    return name
                }
            });
            if (healthy){
                const result = "La planta está saludable"
                return result;
            }else if (classNames.length > 1) {
                const result = "Las plagas que se detectaron en la planta son: " + classNames.join(", ");
                return result;
            } else {
                const result = "La plaga que se detectó en la planta es: " + classNames.join(", ");
                return result;
            }
        } else {
            return chat?.text;
        }
    };

    const renderItem = ({ item }) => (
        <VStack px={4} py={2} flex={1}>
            <ChatItemIa
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