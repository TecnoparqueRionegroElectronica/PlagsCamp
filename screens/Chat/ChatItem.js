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
        <HStack justifyContent={chat?.id_from == cuenta ? 'flex-end' : 'flex-start'}>
            <Box
                maxWidth="76%"
                backgroundColor={chat?.id_from == cuenta ? colors.brown : colors.green}
                borderRadius="lg"
                p={3}
                shadow={2}
            >
                <Typography
                    size={width * fontSizeFactor}
                    style={{
                        color: "#FFFFFF",
                        marginBottom: chat?.image_url && chat?.text ? 10 : 0,
                    }}
                >
                    {chat?.text}
                </Typography>

                {chat?.image_url !== null && (
                    <Pressable
                        onPressIn={() => handlePressIn(chat?.image_url, isImage(chat?.image_url) ? 0.7 : 0.9)}
                        onPressOut={() => handlePressOut(chat?.image_url)}
                    // onPress={handlePress}
                    >
                        {isImage(chat?.image_url) && (
                            <>
                                {imageStatus.loading && <ActivityIndicator size="large" color="#0000ff" />}
                                <Box style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                    <Image
                                        source={{ uri: chat?.image_url }}
                                        style={{
                                            width: width * 0.55,
                                            height: height * 0.2,
                                            resizeMode: 'cover',
                                            borderRadius: 5,
                                            opacity: opacity[chat?.image_url] || 1,
                                        }}
                                        alt="Imagen de archivo"
                                        onLoad={handleImageLoad}
                                    />
                                </Box>
                            </>
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
                        {chat?.date ? formattedDate(chat?.date) : ""}
                    </Typography>
                </Box>
            </Box>
        </HStack>
    );
}

export default React.memo(ChatItem);