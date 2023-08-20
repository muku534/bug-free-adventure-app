import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { FONTS } from '../../../constants';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const getWishlistDetails = async () => {
        try {
            const response = await axios.get('http://192.168.42.184:5000/whishlist');
            setWishlistItems(response.data.wishlistItems);
            console.log(response.data.wishlistItems);
        } catch (error) {
            console.log('Error fetching wishlist items:', error.message);
        }
    }

    useEffect(() => {
        getWishlistDetails();
    }, []);

    const renderWishlistItem = ({ item }) => (
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
                Price: ₹{item.product.price}
            </Text>
        </View>
    );

    return (
        <SafeAreaView>
            <FlatList
                data={wishlistItems}
                keyExtractor={(item) => item._id}
                renderItem={renderWishlistItem}
                contentContainerStyle={{
                    // Add your flatlist's container styling here
                }}
            />
        </SafeAreaView>
    )
}

export default Wishlist;
