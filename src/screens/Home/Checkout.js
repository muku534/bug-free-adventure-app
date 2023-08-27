import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import { COLORS, FONTS, SIZES, } from '../../../constants';
import Button from '../../components/Button';
import { getUserData } from '../auth/Storage';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useStripe } from '@stripe/stripe-react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

const Checkout = ({ navigation }) => {

    const route = useRoute();
    const totalCartPrice = route.params.totalCartPrice;

    const [userData, setUserData] = useState(null);
    const [fname, setFname] = useState('');
    const [lname, setLnane] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNimber, setPhoneNumber] = useState('');



    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserData();
            if (user) {
                setUserData(user);
                setFname(user.fname);
                setFname(user.lname);
                setEmail(user.email);
                setAddress(user.address);
                setPhoneNumber(user.phoneNumber);
                console.log("This is the userData:")
            }
        }

        fetchUserData();
    }, []);

    const { confirmPayment } = useStripe();

    const handlePayment = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/intents`, {
                amount: totalCartPrice
            });
            const clientSecret = response.data.paymentIntent;

            const result = await confirmPayment(clientSecret, {
                payment_method: {
                    card: {
                        number: '4242424242424242', // Replace with actual card number
                        exp_month: 12, // Replace with actual expiration month
                        exp_year: 24, // Replace with actual expiration year
                        cvc: '123', // Replace with actual CVC
                    },
                    paymentMethodType: 'card', // Add this line
                },
            });

            if (result.error) {
                console.log('Payment error', result.error)
            } else {
                if (result.paymenIntent.status === ' succeeded') {
                    console.log('Payment succeeded');

                    // After successful payment, create a new order
                    const orderData = {
                        orderItems: [],
                        itemsPrice: totalCartPrice,
                        totalPrice: totalCartPrice,
                        paymentInfo: 'Card Payment',
                        rootUser: userData,
                    };

                    try {
                        const orderResponse = await axios.post(`${process.env.REACT_APP_API_URL}/newOrder`, orderData);
                        if (orderResponse.data.success) {
                            console.log('Order created successfully:', orderResponse.data.order);
                        } else {
                            console.log('Failed to create order:', orderResponse.data.message);
                        }
                    } catch (orderError) {
                        console.log('Order creation error:', orderError);
                    }
                }
            }

        } catch (error) {
            console.log('API error:', error)
        }
    }

    return (
        <SafeAreaView>
            <PageContainer>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 22,
                                marginTop: 35,
                                paddingBottom: 10
                            }}
                        >
                            <TouchableOpacity onPress={() => navigation.navigate("Home")}
                                style={{ marginLeft: -10 }} >
                                <MaterialIcons name='keyboard-arrow-left'
                                    size={28}
                                    style={{ color: COLORS.secondaryBlack }} />
                            </TouchableOpacity>
                            <Text style={{ ...FONTS.h4 }}>Laptops</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{
                                ...(SIZES.width <= 360 ?
                                    { ...FONTS.h2 }
                                    : { ...FONTS.h1 }
                                ),
                                marginTop: 5,
                                paddingHorizontal: 12,
                                fontWeight: '400',
                                // marginVertical: 8,
                            }}>
                                Payable amount : {totalCartPrice}
                            </Text>
                        </View>

                        <View style={{ width: '100%', paddingHorizontal: 22, paddingVertical: 0 }}>

                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                marginTop: 22,
                            }}>First name</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                marginVertical: 12,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                                // borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <TextInput
                                    keyboardType='default'
                                    style={{
                                        width: "100%",
                                        height: 54,
                                        fontSize: 14,
                                        backgroundColor: COLORS.secondaryWhite,
                                        paddingLeft: 22,
                                        borderRadius: SIZES.padding
                                        ,
                                        paddingLeft: SIZES.padding
                                        ,
                                        color: '#111'
                                    }}
                                    value={userData?.fname}
                                    onChangeText={setFname}
                                />

                            </View>


                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                // marginTop: 22,
                            }}>Last Name</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                marginVertical: 12,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                                // borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <TextInput
                                    keyboardType='default'
                                    style={{
                                        width: "100%",
                                        height: 54,
                                        fontSize: 14,
                                        backgroundColor: COLORS.secondaryWhite,
                                        paddingLeft: 22,
                                        borderRadius: SIZES.padding
                                        ,
                                        paddingLeft: SIZES.padding
                                        ,
                                        color: '#111'
                                    }}
                                    value={userData?.lname}
                                    onChangeText={setLnane}
                                />
                            </View>


                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                // marginTop: 22,
                            }}>Email Address</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                marginVertical: 12,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                                // borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <TextInput
                                    placeholder='Hi there! My name is Mukesh'
                                    placeholderTextColor={COLORS.secondaryGray}
                                    keyboardType='email-address'
                                    style={{
                                        width: "100%",
                                        height: 54,
                                        fontSize: 14,
                                        backgroundColor: COLORS.secondaryWhite,
                                        paddingLeft: 22,
                                        borderRadius: SIZES.padding
                                        ,
                                        paddingLeft: SIZES.padding
                                        ,
                                        color: '#111'
                                    }}
                                    value={userData?.email}
                                    onChangeText={setEmail}
                                />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                // marginTop: 22,
                            }}>Address</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                marginVertical: 12,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                                // borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <TextInput
                                    placeholder='Hi there! My name is Mukesh'
                                    placeholderTextColor={COLORS.secondaryGray}
                                    keyboardType='default'
                                    style={{
                                        width: "100%",
                                        height: 54,
                                        fontSize: 14,
                                        backgroundColor: COLORS.secondaryWhite,
                                        paddingLeft: 22,
                                        borderRadius: SIZES.padding
                                        ,
                                        paddingLeft: SIZES.padding
                                        ,
                                        color: '#111'
                                    }}
                                    value={userData?.address}
                                    onChangeText={setAddress}
                                />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                // marginTop: 22,
                            }}>Phone Number</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                marginVertical: 12,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                                // borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <TextInput
                                    placeholder='Hi there! My name is Mukesh'
                                    placeholderTextColor={COLORS.secondaryGray}
                                    keyboardType='numeric'
                                    style={{
                                        width: "100%",
                                        height: 54,
                                        fontSize: 14,
                                        backgroundColor: COLORS.secondaryWhite,
                                        paddingLeft: 22,
                                        borderRadius: SIZES.padding
                                        ,
                                        paddingLeft: SIZES.padding
                                        ,
                                        color: '#111'
                                    }}
                                    value={userData?.phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />
                            </View>
                            <TouchableOpacity onPress={handlePayment}>
                                <View style={{
                                    backgroundColor: COLORS.primaryBlue,
                                    paddingHorizontal: 52,
                                    paddingVertical: 15,
                                    marginVertical: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    marginHorizontal: 52
                                }}>
                                    <Text style={{ ...FONTS.body3, color: COLORS.secondaryWhite, }}>
                                        Order
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Checkout