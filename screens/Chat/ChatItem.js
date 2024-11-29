import React, { useCallback, useMemo, useState } from "react";
import { Entypo } from '@expo/vector-icons';
import Typography from "../../Components/Typography";
import { Box, HStack, Image } from "native-base";
import { ActivityIndicator, Dimensions, Pressable } from "react-native";
import colors from "../../assets/colors/colors";

const { width, height } = Dimensions.get('window');

const ChatItem = ({ chat, cuenta, fontSizeFactor, fontSizeFactor3 }) => {
    const [opacity, setOpacity] = useState({}); 
    const [imageStatus, setImageStatus] = useState({ loading: true, loaded: false });

    const isImage = useCallback((fileName) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
        const extension = fileName.split('.').pop().toLowerCase();
        return imageExtensions.includes(extension);
    }, []);

    const formattedDate = useMemo(() => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
        return (date) => date && !isNaN(new Date(date).getTime()) 
            ? new Intl.DateTimeFormat('es-ES', options).format(new Date(date)) 
            : 'Fecha no válida';
    }, []);
    
    const handlePressIn = useCallback((id, value) => {
        setOpacity((prev) => ({ ...prev, [id]: value }));
    }, []);

    const handlePressOut = useCallback((id) => {
        setOpacity((prev) => ({ ...prev, [id]: 1 }));
    }, []);


    const handleImageLoad = useCallback(() => {
        setImageStatus({ loading: false, loaded: true });
    }, []);

    // const handlePress = useCallback(() => {
    //     if (imageStatus.loaded || !isImage(chat?.file?.name)) {
    //         openImageModal(chat?.file?.file, !isImage(chat?.file?.name));
    //     }
    // }, [chat?.file?.name, chat?.file?.file, imageStatus.loaded, isImage, openImageModal]);

    return (
        <HStack justifyContent={chat.account_id === cuenta ? 'flex-end' : 'flex-start'}>
            <Box
                maxWidth="76%"
                backgroundColor={chat.account_id === cuenta ? colors.brown : colors.green }
                borderRadius="lg"
                p={3}
                shadow={2}
            >
                <Typography
                    size={width * fontSizeFactor}
                    style={{
                        color: "#FFFFFF",
                        marginBottom: chat?.file?.file && chat?.message ? 10 : 0,
                    }}
                >
                    {chat?.message}
                </Typography>

                {chat?.file?.file && (
                    <Pressable
                        onPressIn={() => handlePressIn(chat?.id, isImage(chat?.file?.name) ? 0.7 : 0.9)}
                        onPressOut={() => handlePressOut(chat?.id)}
                        // onPress={handlePress}
                    >
                        {isImage(chat?.file?.name) ? (
                            <>
                                {imageStatus.loading && <ActivityIndicator size="large" color="#0000ff" />}
                                <Image
                                    source={{ uri: chat?.file?.file }}
                                    style={{
                                        width: width * 0.55,
                                        height: height * 0.2,
                                        resizeMode: 'cover',
                                        borderRadius: 5,
                                        opacity: opacity[chat?.id] || 1,
                                    }}
                                    alt="Imagen de archivo"
                                    onLoad={handleImageLoad} 
                                />
                            </>
                        ) : (
                            <Box style={{
                                display: 'flex',
                                flexDirection: "column",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Entypo name="video" size={46} color="black" />
                                <Typography size={width * fontSizeFactor} style={{ color: "#FFFFFF" }}>
                                    Vista del video
                                </Typography>
                            </Box>
                        )}
                    </Pressable>
                )}

                <Box style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 4,
                }}>
                    <Typography size={width * fontSizeFactor3} style={{ color: "#ffffff" }}>
                        {chat?.created ? formattedDate(chat?.created) : ""}
                    </Typography>
                </Box>
            </Box>
        </HStack>
    );
}

export default React.memo(ChatItem);