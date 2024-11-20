import React, { useState } from "react";
import { Box, NativeBaseProvider, Image, Center, FormControl, Input, Button, ScrollView, Select, CheckIcon, Text } from 'native-base';
import logo from "../assets/1.png"
import plants from "../assets/plantas_login.png"
import Typography from '../Components/Typography';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from "native-base";
import { _Text, Dimensions } from "react-native";
import colors from "../assets/colors/colors";
import { MaterialIcons, Octicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');
const fontSizeFactor = width > 600 ? 0.02 : 0.037;
const fontSizeFactor1 = width > 600 ? 0.02 : 0.057;
const sizeCell = width > 600 ? 0.056 : 0.047;
const sizeIcon = width > 600 ? 0.035 : 0.06;

const RegisterScreen = ({ navigation }) => {
    const [formValues, setFormValues] = useState({ name: '', lastName: '', email: '', password: '', phone: '', rol: "" });
    const [errors, setErrors] = useState({ name: false, lastName: false, email: false, password: false, phone: false, rol: false });
    const [selectedValue, setSelectedValue] = useState("");
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
            // try {
            //     console.log(formValues.email)
            //     console.log(formValues.password)
            //     // const respuesta = await api.post(`${resources.auth}`, formValues)
            //     // // toast.show({
            //     // //     placement: "top",
            //     // //     backgroundColor: "success.500",
            //     // //     duration: 1000,
            //     // //     render: () => (
            //     // //         <Box
            //     // //             bg="success.500"
            //     // //             p={5}
            //     // //             borderRadius="md"
            //     // //             width="100%"
            //     // //             mx="auto"
            //     // //             _text={{ color: "white", textAlign: "center" }}
            //     // //         >
            //     // //             <Center>
            //     // //                 <Typography size={width * 0.04} style={{ color: colors.white }}>Inicio de sesión exitoso</Typography>
            //     // //             </Center>
            //     // //         </Box>
            //     // //     ),
            //     // // });
            //     // await AsyncStorage.setItem('token', respuesta.data.access)
            //     // console.log(respuesta.data.access)
            //     // // setTimeout(() => { navigation.navigate('home') }, 1100);
            //     // navigation.navigate('home')
            //     setFormValues({ email: '', password: '' })
            //     setErrors({})

            // } catch (error) {
            //     if (error.response.status == 401) {
            //         showToastError("Por favor ingresar las credenciales validas.")
            //     } else {
            //         showToastError("Error al iniciar sesión.")
            //         if (error.response) {
            //             console.error('Error status:', error.response.status);
            //             console.error('Error data:', error.response.data);
            //             console.error('Error headers:', error.response.headers);
            //         } else if (error.request) {
            //             console.error('Error request:', error.request);
            //         } else {
            //             console.error('Error message:', error.message);
            //         }
            //     }
            // } finally {
            //     setIsSending(false);
            // }
        }
    };


    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <SafeAreaView>
                    <Box backgroundColor={"#F4F1DF"} height="full">
                        <ScrollView>
                            <Image
                                source={plants}
                                alt="plantas"
                                style={{
                                    height: "22%",
                                    width: "100%",
                                    resizeMode: 'stretch',
                                    // backgroundColor: "#674636",
                                    marginRight: "2%"
                                }}
                            />
                            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} mt={height * 0.002}>
                                <Image
                                    source={logo}
                                    alt="Logo1"
                                    style={{
                                        height: "88",
                                        width: "97",
                                        resizeMode: 'stretch',
                                        // backgroundColor: "#674636",
                                        marginRight: "2%"
                                    }}
                                />
                                <Typography size={38}>Registrate</Typography>
                            </Box>
                            <Center flex={1} px="6">
                                {/* <Image
                                    source={logo}
                                    alt="Logo"
                                    style={{
                                        width: width * 0.9,
                                        height: height * 0.5,
                                        // resizeMode: 'contain',
                                        // backgroundColor: "red"
                                    }}
                                /> */}
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
                                                // style
                                                endIcon: <CheckIcon size="5" />,
                                            }}
                                            style={{
                                                color: 'white',
                                                fontSize: width * fontSizeFactor
                                            }}
                                            // _icon={{
                                            //     color: 'blue',  // Cambiar el color de la flecha en el input
                                            //     size: 6,         // Cambiar el tamaño de la flecha
                                            //   }}
                                            _icon={{
                                                display: 'none'  // Ocultar la flecha predeterminada
                                              }}
                                            
                                            isReadOnly
                                            onValueChange={(text) => setFormValues({ ...formValues, rol: text })}
                                        >
                                            <Select.Item label="Option 1" value="option1"/>
                                            <Select.Item label="Option 2" value="option2"/>
                                        </Select>
                                    </Box>
                                </FormControl>
                                <Center flex={1}>
                                    <Button mt={"7%"}
                                        style={{
                                            width: width * 0.55,
                                            backgroundColor: colors.green,
                                            height: height * 0.08,
                                            opacity: isSending ? 0.5 : 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            borderRadius: 20,
                                            padding: 8
                                        }}
                                        onPress={handleSubmit}
                                        disabled={isSending}
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