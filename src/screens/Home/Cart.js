import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../../constants';
import axios from 'axios';

const Cart = () => {
    // const POLL_INTERVAL = 5000;
    const [cartItems, setCartItems] = useState([]);

    const GetCartDetails = async () => {
        try {
            const response = await axios.get('http://192.168.42.184:5000/cart');
            setCartItems(response.data.cartItems);
            console.log(response.data.cartItems);
        } catch (error) {
            console.log('Error fetching cart items:', error.message);
        }
    }

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

    //poll again after a delay
    // setTimeout(GetCartDetails, POLL_INTERVAL)

    useEffect(() => {
        GetCartDetails();
    }, []);

    const renderCartItem = ({ item }) => (
        <View style={{
            flex: 1,
            marginVertical: 10,
            width: '50%',
            paddingHorizontal: 5,
            marginVertical: 5
        }}>
            <Image
                source={{ uri: item.product.images[0].url }}
                resizeMode="cover"
                style={{
                    height: 150,
                    width: 150,
                }}
            />
            <Text style={{ ...FONTS.h4 }}>
                {item.product.name}
            </Text>
            <Text style={{ ...FONTS.body4 }}>
                Price: ₹{item.product.price * item.quantity}
            </Text>
            <Text style={{ ...FONTS.body4 }}>
                Quantity: {item.quantity}
            </Text>
        </View>
    );

    return (
        <SafeAreaView>
            {/* ... Your other components */}
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item._id}
                renderItem={renderCartItem}
                contentContainerStyle={{
                    // Add your flatlist's container styling here
                }}
            />
            {/* ... Rest of your components */}
        </SafeAreaView>
    )
}

export default Cart;
