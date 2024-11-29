import React, { useState } from "react";
import { Box, NativeBaseProvider, Image, Center, FormControl, Input, Button, ScrollView, View } from 'native-base';
import logo from "../assets/1.png"
import plants from "../assets/plantas_login.png"
import Typography from '../Components/Typography';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from "react-native";
import colors from "../assets/colors/colors";
import { Octicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');
const fontSizeFactor = width > 600 ? 0.02 : 0.037;
const fontSizeFactor1 = width > 600 ? 0.02 : 0.057;
const sizeCell = width > 600 ? 0.056 : 0.065;
const sizeIcon = width > 600 ? 0.035 : 0.06;


const Plantas = React.memo(() => (
    <Image
        source={plants}
        alt="plantas"
        style={{
            height: height * 0.18,
            width: width,
            resizeMode: 'contain',
            marginRight: "2%"
        }}
    />
));
const Logo = React.memo(() => (
    <Image
        source={logo}
        alt="Logo1"
        style={{
            height: height * 0.1,
            width: width * 0.23,
            resizeMode: 'stretch',
            marginRight: "2%"
        }}
    />
));

const LoginScreen = ({ navigation }) => {
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {
        const newErrors = { email: false, password: false };

        if (!formValues.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
            newErrors.email = true;
        }

        if (!formValues.password) {
            newErrors.password = true;
        }

        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async () => {
        if (isSending) {
            return;
        }
        if (validate()) {
            setIsSending(true)
            console.log(formValues)
            setFormValues({ email: '', password: '' })
            setErrors({});
            setIsSending(false)
            navigation.navigate('Home')
        }
    };


    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <View backgroundColor={"#F4F1DF"} height="full">
                        <ScrollView>
                            <Plantas />
                            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} mt={height * 0.05}>
                                <Logo/>
                                <Typography size={38}>Iniciar sesión</Typography>
                            </Box>
                            <Center flex={1} px="6" py="7">
                                <FormControl isRequired mt={height * 0.05}>
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                        <Typography size={22} style={{ color: "#090000" }}>Correo Eléctronico</Typography>
                                    </Box>
                                    <Box style={{
                                        backgroundColor: colors.lightgreen,
                                        borderRadius: 35,
                                        borderColor: errors.email ? "red" : "transparent",
                                        borderWidth: 1,
                                        paddingLeft: 8
                                    }}>
                                        <Input
                                            value={formValues.email}
                                            autoCapitalize="none"
                                            type='email'
                                            onChangeText={(text) => setFormValues({ ...formValues, email: text })}
                                            onBlur={() => validate()}
                                            color="white"
                                            style={{
                                                height: height * sizeCell,
                                                fontFamily: 'Comfortaa_400Regular',
                                                fontSize: width * fontSizeFactor
                                            }}
                                            variant="unstyled"
                                        />
                                    </Box>
                                </FormControl>
                                <FormControl isRequired mt={height * 0.036}>
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                        <Typography size={22} style={{ color: "#090000" }}>Contraseña</Typography>
                                    </Box>
                                    <Box style={{
                                        backgroundColor: colors.lightgreen,
                                        borderRadius: 35,
                                        borderColor: errors.password ? "red" : "transparent",
                                        borderWidth: 1,
                                        paddingLeft: 8
                                    }}>
                                        <Input
                                            value={formValues.password}
                                            autoCapitalize="none"
                                            onChangeText={(text) => setFormValues({ ...formValues, password: text })}
                                            onBlur={() => validate()}
                                            type={showPassword ? 'text' : 'password'}
                                            color="white"
                                            style={{
                                                height: height * sizeCell,
                                                fontFamily: 'Questrial_400Regular',
                                                fontSize: width * fontSizeFactor
                                            }}
                                            variant="unstyled"
                                            InputRightElement={
                                                <Octicons name={showPassword ? 'eye' : 'eye-closed'} size={width * sizeIcon}
                                                    color="#6a6f66"
                                                    style={{
                                                        marginRight: 18
                                                    }}
                                                    onPress={togglePasswordVisibility}
                                                />
                                            }
                                        />
                                    </Box>
                                </FormControl>
                                <Center flex={1}>
                                    <Button mt={"22%"}
                                        style={{
                                            width: width * 0.55,
                                            backgroundColor: colors.green,
                                            height: height * 0.08,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            borderRadius: 20,
                                            padding: 8
                                        }}
                                        onPress={handleSubmit}
                                        disabled={isSending}
                                        _pressed={{ opacity: isSending ? 0.8 : 1, transform: [{ scale: 0.97 }] }}
                                    >
                                        <Typography size={width * fontSizeFactor1}>Iniciar sesión</Typography>
                                    </Button>
                                </Center>
                            </Center>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    );
}

export default LoginScreen;
