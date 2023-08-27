import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES, images } from '../../../constants';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import Button from '../../components/Button';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';

const Cart = ({ navigation }) => {
    // const POLL_INTERVAL = 5000;
    const [cartItems, setCartItems] = useState([]);
    const [totalCartPrice, setTotalCartPRice] = useState(0);

    const GetCartDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart`);
            setCartItems(response.data.cartItems);
            calculateTotalCartPrice(response.data.cartItems)
            console.log(response.data.cartItems);
        } catch (error) {
            console.log('Error fetching cart items:', error.message);
        }
    }

    //poll again after a delay
    // setTimeout(GetCartDetails, POLL_INTERVAL)
    const updateCartItems = (updatedItem) => {
        setCartItems(prevCarttems => {
            const updatedCartItems = prevCarttems.map(item => {
                if (cartItems._id === updatedItem._id) {
                    return { ...item, quantity: updatedItem.quantity, product: { ...item.product, price: updatedItem.product.price } }
                }
                return item;
            })
            return updatedCartItems
        })
    }

    const calculateTotalCartPrice = (cartItems) => {
        const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        setTotalCartPRice(totalPrice)
    }

    useEffect(() => {
        GetCartDetails();
    }, []);


    const renderCartItem = ({ item }) => (
        <View style={{
            marginVertical: 20,
            backgroundColor: COLORS.tertiaryWhite,
            borderRadius: 15,
            marginHorizontal: 15,
            shadowColor: COLORS.black,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        }}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                marginVertical: 10,
                width: '50%',
                paddingHorizontal: 5,
                marginVertical: 5,
            }}>
                <Image
                    source={images.dims}
                    resizeMode="cover"
                    style={{
                        height: 80,
                        width: 80,
                    }}
                />
                <Text style={{ ...FONTS.body4, paddingVertical: 15, marginHorizontal: 15 }}>
                    {item.product.name}
                </Text>
                <View style={{
                    marginHorizontal: 10,
                    marginVertical: 15
                }}>
                    <Text style={{ ...FONTS.body4 }}>
                        Price: ₹{item.product.price * item.quantity}
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>
                        Quantity: {item.quantity}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView>
            <PageContainer>
                <PageTitle title="My Cart" onPress={() => navigation.navigate('Home')} />
                <View style={{ flex: 1, }}>
                    <View >
                        <FlatList
                            data={cartItems}
                            keyExtractor={(item) => item._id}
                            renderItem={renderCartItem}
                            contentContainerStyle={{
                                // Add your flatlist's container styling here
                            }}
                        />
                        <View style={{
                            backgroundColor: COLORS.secondaryWhite,
                            height: 100,
                            borderRadius: 15,
                            marginHorizontal: 15,
                            marginVertical: 25,
                            shadowColor: COLORS.black,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <View style={{
                                paddingHorizontal: 10,
                                marginVertical: 5,
                                flexDirection: 'row'
                            }}>
                                <Text style={{ ...FONTS.body4 }}>
                                    Delivery Charges :  <Text style={{ color: COLORS.green }}> Free Delivery</Text>
                                </Text>
                            </View>
                            <View style={{
                                paddingHorizontal: 10,
                                marginVertical: 5,
                                flexDirection: 'row',
                            }}>
                                <Text style={{ ...FONTS.body4 }}>
                                    Total Price  :  ₹{totalCartPrice}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("Checkout", { totalCartPrice })} >
                            <View style={{
                                backgroundColor: COLORS.primaryBlue,
                                paddingHorizontal: 52,
                                paddingVertical: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                marginHorizontal: 52
                            }}>
                                <Text style={{ ...FONTS.body3, color: COLORS.secondaryWhite, }}>
                                    Buy Now
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Cart;
