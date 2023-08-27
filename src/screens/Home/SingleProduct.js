import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import PageContainer from '../../components/PageContainer'
import PageTitle from '../../components/PageTitle';
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
    const [wishlist, setWishlist] = useState([]);
    const [userData, setUserData] = useState(null);


    const getProductDetail = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/ProductDetails/${productId}`)
            setProduct(response.data.getSingleProducts);
            console.log('product get sucessfully',)
            setLoading(false);
        } catch (error) {
            console.log('Error fecthing product deatils:', error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductDetail();
    }, []);


    const addToCart = async () => {
        try {
            if (userData && userData.isAuth) {
                console.log('Please log in first.');
                navigation.navigate('Login');
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-to-cart`, {
                    product: product._id,
                    quantity,
                    price: product.price
                });
                setCart([...cart, response.data.cartItem]);
                setPrice(response.data.price)
                console.log(response.data.message);
                //passing the updated cart item to the cart screen
                navigation.navigate('Cart', { updatedCartItem: response.data.cartItem })
            }
        } catch (error) {
            console.log('Error to add the product in to cart:', error.message)
        }
    }


    const addToWishList = async () => {
        try {
            if (userData && userData.isAuth) {
                console.log('Please log in first.');
                navigation.navigate('Login')
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/wishlist`, {
                    product: product._id,
                    price: product.price
                });
                setWishlist(response.data.wishlist)
                console.log(response.data);
            }
        } catch (error) {
            console.log('Error adding product to wishlist', error.message)
        }
    }

    return (
        <SafeAreaView>
            <PageContainer>
                <PageTitle title="Product Details" onPress={() => navigation.navigate('Home')} />
                <ScrollView>
                    <View style={{ flex: 1 }}>
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
                                    width: 330,
                                }}
                                onError={(error) => console.log('Image loading error:', error)}
                            />

                            <View style={{ marginVertical: 40 }}>
                                <TouchableOpacity onPress={addToWishList} >
                                    <AntDesign name='hearto'
                                        size={28}
                                        style={{ color: COLORS.secondaryBlack }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10
                        }}>
                            <View style={{
                                backgroundColor: COLORS.lightgray,
                                height: 60,
                                width: 65,
                                borderRadius: 10,
                                marginHorizontal: 8
                            }}>
                                <Image
                                    source={images.dims}
                                    resizeMode="contain"
                                    style={{
                                        height: 60,
                                        width: 65,
                                    }}
                                    onError={(error) => console.log('Image loading error:', error)}
                                />
                            </View>
                            <View style={{
                                backgroundColor: COLORS.lightgray,
                                height: 60,
                                width: 65,
                                borderRadius: 10,
                                marginHorizontal: 8
                            }}>
                                <Image
                                    source={images.dims}
                                    resizeMode="contain"
                                    style={{
                                        height: 60,
                                        width: 65,
                                    }}
                                    onError={(error) => console.log('Image loading error:', error)}
                                />
                            </View>
                            <View style={{
                                backgroundColor: COLORS.lightgray,
                                height: 60,
                                width: 65,
                                borderRadius: 10,
                                marginHorizontal: 8
                            }}>
                                <Image
                                    source={images.dims}
                                    resizeMode="contain"
                                    style={{
                                        height: 60,
                                        width: 65,
                                    }}
                                    onError={(error) => console.log('Image loading error:', error)}
                                />
                            </View>

                        </View>

                        <View style={{
                            backgroundColor: COLORS.secondaryWhite,
                            borderTopLeftRadius: 25,
                            borderTopRightRadius: 25,
                            height: '100%',
                            width: 'auto',
                            shadowColor: COLORS.black,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.85,
                            elevation: 5,
                            marginVertical: 15
                        }}>

                            <View style={{
                                color: COLORS.secondaryBlack,
                                paddingHorizontal: 22,
                                marginVertical: 22
                            }}>
                                <Text style={{ ...FONTS.h2, paddingBottom: 10 }}>
                                    {product.name}
                                </Text>

                                <Text style={{
                                    ...FONTS.body3,
                                    fontWeight: 'bold',
                                    marginVertical: 15,
                                    paddingBottom: 10,
                                    color: COLORS.secondaryGray
                                }}>
                                    {product.description}
                                    {product.description}
                                    {product.description}
                                </Text>

                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={{ ...FONTS.h4, paddingTop: 15 }}>
                                    ₹ {product.price}
                                </Text>
                                <TouchableOpacity onPress={addToCart}>
                                    <View style={{
                                        backgroundColor: COLORS.primaryBlue,
                                        paddingHorizontal: 52,
                                        paddingVertical: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 10
                                    }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.secondaryWhite, }}>
                                            Add To Cart
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </PageContainer>
        </SafeAreaView >
    )
}

export default SingleProduct
