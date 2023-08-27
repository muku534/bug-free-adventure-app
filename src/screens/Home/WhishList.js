import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FONTS, COLORS, images } from '../../../constants';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';

const Wishlist = ({ navigation }) => {
    const [wishlist, setWishlist] = useState([]);

    const getWishlistDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/wishlist`);
            setWishlist(response.data.wishlist);
            console.log(response.data.wishlist);
        } catch (error) {
            console.log('Error fetching wishlist items:', error.message);
        }
    }

    useEffect(() => {
        getWishlistDetails();
    }, []);

    const renderWishlist = ({ item }) => (
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
                        Price: ₹{item.product.price}
                    </Text>

                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView>
            <PageContainer>
                <PageTitle title="My Wishlist" onPress={() => navigation.navigate('Home')} />
                <View style={{ flex: 1 }}>
                    <View>
                        <FlatList
                            data={wishlist}
                            keyExtractor={(item) => item._id}
                            renderItem={renderWishlist}
                            contentContainerStyle={{
                                // Add your flatlist's container styling here
                            }}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Wishlist;
