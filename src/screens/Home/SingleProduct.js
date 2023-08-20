import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, images, SIZES } from '../../../constants';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { getUserData } from '../auth/Storage'

const SingleProduct = ({ navigation }) => {

    const route = useRoute();
    const { productId } = route.params;
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(1);

    const getProductDetail = async () => {

        try {
            const response = await axios.get(`http://192.168.42.184:5000/ProductDetails/${productId}`)
            setProduct(response.data.getSingleProducts);
            console.log('product get sucessfully',)
            setLoading(false);
        } catch (error) {
            console.log('Error fecthing product deatils:', error.message);
            setLoading(false);
        }
    };


    const addToCart = async () => {
        try {
            if (userData && userData.isAuth) {
                console.log('Please log in first.');
                navigation.navigate('Login');
            } else {
                const response = await axios.post('http://192.168.42.184:5000/add-to-cart', {
                    product: product._id,
                    quantity,
                    price: product.price
                });
                setCart([...cart, response.data.cartItem]);
                setPrice(response.data.price)
                console.log(response.data.message);
            }
        } catch (error) {
            console.log('Error to add the product in to cart:', error.message)
        }
    }


    useEffect(() => {
        getProductDetail();
    }, []);

    // const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         const user = await getUserData();
    //         if (user) {
    //             setUserData(user);
    //             console.log("This is the userData:")
    //             console.log("Avatar URL:", userData?.avatar?.url);
    //         }
    //     }

    //     fetchUserData();
    // }, []);


    const addToWhishList = async () => {
        try {
            if (userData && userData.isAuth) {
                console.log('Please log in first.');
                navigation.navigate('Login')
            } else {
                const response = await axios.post('http://192.168.42.184:5000/whishlist', {
                    product: product._id,
                });
                console.log(response.data.message);
            }
        } catch (error) {
            console.log('Error adding product to whishlist', error.message)
        }
    }

    return (
        <SafeAreaView>
            <PageContainer>
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
                        <Text style={{ ...FONTS.h4 }}>Product Details</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp' }}
                            resizeMode="contain"
                            style={{
                                height: 250,
                                width: 300,
                            }}
                            onError={(error) => console.log('Image loading error:', error)}
                        />

                        <View>
                            <TouchableOpacity onPress={addToWhishList} >
                                <AntDesign name='hearto'
                                    size={28}
                                    style={{ color: COLORS.secondaryBlack }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <AntDesign name='sharealt' size={28}
                                    style={{ color: COLORS.secondaryBlack, marginVertical: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: COLORS.secondaryWhite,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        height: '60%',
                        width: '100%',
                        shadowColor: COLORS.secondaryBlack,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6
                    }}>

                        <View style={{
                            color: COLORS.secondaryBlack,
                            paddingHorizontal: 22,
                            marginVertical: 22
                        }}>
                            <Text style={{ ...FONTS.h2, paddingBottom: 10 }}>
                                {product.name}
                            </Text>

                            <Text style={{ ...FONTS.h4, marginVertical: 15, paddingBottom: 10 }}>
                                Lenovo Flex - 3 Core i5 12th Gen - (16 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVIDIA GeForce RTX 3050) AN515-58 Gaming Laptop  (15.6 inch, Shale Black, 2.5 kg)
                            </Text>

                            <Text style={{ ...FONTS.h4, marginVertical: 15, paddingTop: 15 }}>
                                ₹{product.price}
                            </Text>
                        </View>

                        <TouchableOpacity onPress={addToCart}>
                            <View style={{
                                backgroundColor: COLORS.secondaryPrimary,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ ...FONTS.body3 }}>
                                    Add To Cart
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView >
    )
}

export default SingleProduct
