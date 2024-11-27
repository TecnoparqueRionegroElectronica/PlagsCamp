import React, { useState } from "react";
import { Box, NativeBaseProvider, Image, Center, FormControl, Input, Button, ScrollView, Select, CheckIcon, Text } from 'native-base';
import logo from "../assets/1.png"
import plants from "../assets/plantas_login.png"
import Typography from '../Components/Typography';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { _Text, Dimensions } from "react-native";
import colors from "../assets/colors/colors";
import { Octicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');
const fontSizeFactor = width > 600 ? 0.02 : 0.037;
const fontSizeFactor1 = width > 600 ? 0.02 : 0.057;
const sizeCell = width > 600 ? 0.056 : 0.047;
const sizeIcon = width > 600 ? 0.035 : 0.06;

const Plantas = React.memo(() => (
    <Image
        source={plants}
        alt="plantas"
        style={{
            height: height * 0.17,
            width: width,
            resizeMode: 'stretch',
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

const RegisterScreen = ({ navigation }) => {
    const [formValues, setFormValues] = useState({ name: '', lastName: '', email: '', password: '', phone: '', rol: "" });
    const [errors, setErrors] = useState({ name: false, lastName: false, email: false, password: false, phone: false, rol: false });
    const [showPassword, setShowPassword] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {
        const newErrors = { name: false, lastName: false, email: false, password: false, phone: false, rol: false };

        if (!formValues.name) {
            newErrors.name = true;
        }
        if (!formValues.lastName) {
            newErrors.lastName = true;
        }

        if (!formValues.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
            newErrors.email = true;
        }

        if (!formValues.password) {
            newErrors.password = true;
        }

        if (!formValues.phone) {
            newErrors.phone = true;
        }

        if (!formValues.rol) {
            newErrors.rol = true;
        }

        setErrors(newErrors);
        return !newErrors.name && !newErrors.lastName && !newErrors.email && !newErrors.password && !newErrors.phone && !newErrors.rol;
    };

    const handleSubmit = async () => {
        if (isSending) {
            return;
        }
        if (validate()) {
            setIsSending(true)
        }
    };


    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <Box backgroundColor={"#F4F1DF"} height="full">
                        <ScrollView>
                            <Plantas/>
                            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} mt={height * 0.002}>
                                <Logo/>
                                <Typography size={38}>Registrate</Typography>
                            </Box>
                            <Center flex={1} px="6">
                                <FormControl isRequired mt={height * 0.0008}>
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                        <Typography size={20} style={{ color: "#090000" }}>Nombre</Typography>
                                    </Box>
                                    <Box style={{
                                        backgroundColor: colors.lightgreen,
                                        borderRadius: 35,
                                        borderColor: errors.name ? "red" : "transparent",
                                        borderWidth: 1,
                                        paddingLeft: 8
                                    }}>
                                        <Input
                                            value={formValues.name}
                                            autoCapitalize="none"
                                            type='email'
                                            onChangeText={(text) => setFormValues({ ...formValues, name: text })}
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
                                <FormControl isRequired mt={height * 0.0008}>
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                        <Typography size={20} style={{ color: "#090000" }}>Apellido</Typography>
                                    </Box>
                                    <Box style={{
                                        backgroundColor: colors.lightgreen,
                                        borderRadius: 35,
                                        borderColor: errors.lastName ? "red" : "transparent",
                                        borderWidth: 1,
                                        paddingLeft: 8
                                    }}>
                                        <Input
                                            value={formValues.lastName}
                                            autoCapitalize="none"
                                            type='email'
                                            onChangeText={(text) => setFormValues({ ...formValues, lastName: text })}
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
                                <FormControl isRequired mt={height * 0.0008}>
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                        <Typography size={20} style={{ color: "#090000" }}>Correo Eléctronico</Typography>
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
                                <FormControl isRequired mt={height * 0.008}>
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                        <Typography size={20} style={{ color: "#090000" }}>Contraseña</Typography>
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
                                                        marginRight: 17
                                                    }}
                                                    onPress={togglePasswordVisibility}
                                                />
                                            }
                                        />
                                    </Box>
                                </FormControl>
                                <FormControl isRequired mt={height * 0.008}>
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                        <Typography size={20} style={{ color: "#090000" }}>Teléfono</Typography>
                                    </Box>
                                    <Box style={{
                                        backgroundColor: colors.lightgreen,
                                        borderRadius: 35,
                                        borderColor: errors.phone ? "red" : "transparent",
                                        borderWidth: 1,
                                        paddingLeft: 8
                                    }}>
                                        <Input
                                            value={formValues.phone}
                                            autoCapitalize="none"
                                            onChangeText={(text) => setFormValues({ ...formValues, phone: text })}
                                            onBlur={() => validate()}
                                            color="white"
                                            style={{
                                                height: height * sizeCell,
                                                fontFamily: 'Questrial_400Regular',
                                                fontSize: width * fontSizeFactor
                                            }}
                                            type="number"
                                            keyboardType="numeric"
                                            variant="unstyled"
                                        />
                                    </Box>
                                </FormControl>
                                <FormControl isRequired mt={height * 0.008}>
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                        <Typography size={20} style={{ color: "#090000" }}>Rol</Typography>
                                    </Box>
                                    <Box style={{
                                        height: height * sizeCell,
                                        backgroundColor: colors.lightgreen,
                                        borderRadius: 35,
                                        borderColor: errors.rol ? "red" : "transparent",
                                        borderWidth: 1,
                                        paddingLeft: 8
                                    }}>
                                        <Select
                                            selectedValue={formValues.rol}
                                            variant="unstyled"
                                            _selectedItem={{
                                                bg: colors.green,
                                                endIcon: <CheckIcon size="5" />,
                                            }}
                                            style={{
                                                color: 'white',
                                                fontSize: width * fontSizeFactor
                                            }}
                                            _icon={{
                                                display: 'none'
                                            }}

                                            isReadOnly
                                            onValueChange={(text) => setFormValues({ ...formValues, rol: text })}
                                        >
                                            <Select.Item label="Option 1" value="option1" />
                                            <Select.Item label="Option 2" value="option2" />
                                        </Select>
                                    </Box>
                                </FormControl>
                                <Center flex={1}>
                                    <Button mt={"7%"}
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
                                        <Typography size={width * fontSizeFactor1}>Registrate</Typography>
                                    </Button>
                                </Center>
                            </Center>
                        </ScrollView>
                    </Box>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    );
}

export default RegisterScreen;