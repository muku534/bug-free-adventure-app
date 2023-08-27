import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
    Image,
    StyleSheet,
} from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import PageContainer from '../../components/PageContainer';
import { ScrollView } from 'react-native';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import { Card, } from 'react-native-paper';
import axios from 'axios'
import SkeletonCard from '../popular/SkeletonCard';
import Product from '../popular/Product';
import CategoryButton from './Categories';
import Banner from './Banner';

const Home = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [isLoading, setLoading] = useState(true);

    const nav = useNavigation();

    const getProduct = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getProducts`)
            setProducts(response.data.Products);
            setLoading(false)
            // console.log(Res.data)
            console.log('data get sucessfully')
        } catch (error) {
            // Handle API call or AsyncStorage access error
            console.error('Error during login:', error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [])


    const currentProducts = products.slice(0, 2);

    const skeletonCount = 4;// Set the number of skeleton cards you want to display

    const categories = ['Laptops', 'Computers', 'Accessories'] // List of categories

    const getCategoryImage = (category) => {
        const imageMapping = {
            'Laptops': (icons.Laptops), // Update with actual image paths
            'Computers': (icons.Computers),
            'Accessories': (icons.Accessories),
            // Add more categories and image paths as needed
        };
        return imageMapping[category] || null;
    };

    const handleCategoryPress = (Category) => {
        // Use the navigate function to navigate to the desired screen
        nav.navigate(Category); // screen names match the category names
    }

    const handleDrawerOpen = () => {
        nav.dispatch(DrawerActions.openDrawer())
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        {/* Header  */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginHorizontal: 18,
                                marginTop: 35,
                            }}
                        >
                            <TouchableOpacity onPress={handleDrawerOpen} >
                                <Image
                                    source={images.user4}
                                    resizeMode="contain"
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 25,
                                    }}
                                />
                            </TouchableOpacity>

                            <Text style={{ ...FONTS.h4 }}>SCS</Text>

                            <TouchableOpacity onPress={() => navigation.navigate("Wishlist")}>
                                <AntDesign name='hearto'
                                    size={24}
                                    style={{ color: COLORS.secondaryBlack }} />
                            </TouchableOpacity>
                        </View>

                        {/* // Banner Section */}
                        <Banner />

                        {/* Categories Section */}
                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 10,
                        }}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {categories.map((category, index) => (
                                    <CategoryButton
                                        key={index}
                                        title={category}
                                        imageSource={getCategoryImage(category)}
                                        onPress={() => handleCategoryPress(category)}
                                    />
                                ))}
                            </ScrollView>
                        </View>

                        {/* Popular products */}

                        <View style={{
                            marginHorizontal: 22,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "space-between",
                            height: 48,
                            marginVertical: 12,
                            borderRadius: 20,
                        }}>
                            <Text style={{
                                ...(SIZES.width <= 360 ?
                                    { ...FONTS.h4 }
                                    : { ...FONTS.h4 }
                                ),
                                marginTop: 15,
                                fontWeight: '300',
                                marginVertical: 12,
                            }}>
                                Popular products
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Product')} >
                                <Text style={{
                                    ...(SIZES.width <= 360 ?
                                        { ...FONTS.h5 }
                                        : { ...FONTS.h2 }
                                    ),
                                    marginTop: 15,
                                    // paddingHorizontal: 12,
                                    // marginHorizontal: 12,
                                    color: COLORS.secondaryGray,
                                    fontWeight: '400',
                                    marginVertical: 12,
                                }}>
                                    View all
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}>

                            {isLoading ? (
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: 25,
                                    marginHorizontal: 10
                                }}>
                                    {Array.from({ length: currentProducts.length }, (_, i) => (
                                        <SkeletonCard key={i} />
                                    ))}
                                </View>
                            ) : (
                                currentProducts.map((product) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('SingleProduct', { productId: product._id });
                                        }}
                                        key={product._id}
                                    >
                                        <View style={{
                                            height: 205,
                                            width: 150,
                                            marginHorizontal: 10,
                                            marginBottom: 2,
                                            paddingBottom: 20,
                                            backgroundColor: COLORS.lightgray,
                                            borderRadius: 15,
                                            shadowColor: COLORS.secondaryBlack,
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                            marginBottom: 20
                                        }}>
                                            <Image source={images.dims}
                                                style={{
                                                    height: 100,
                                                    width: 150
                                                }} />

                                            <View style={{
                                                backgroundColor: COLORS.tertiaryWhite, justifyContent: 'center',
                                                borderRadius: 15,
                                                marginVertical: 5,
                                                marginHorizontal: 5,
                                                height: 'auto',
                                                paddingHorizontal: 5,
                                                paddingTop: 10,
                                                // paddingVertical: 5,
                                            }}>
                                                <Text style={{ lineHeight: 20, ...FONTS.body4, fontWeight: 'bold' }}>
                                                    {product.name}
                                                </Text>

                                                <View style={{
                                                    justifyContent: 'space-between', flexDirection: 'row',
                                                    paddingTop: 13,
                                                    paddingVertical: 2
                                                }}>
                                                    <Text variant="titleLarge" style={{
                                                        ...FONTS.body4, fontWeight: 'bold',
                                                    }}>₹ {product.price}</Text>

                                                    <View style={{
                                                        backgroundColor: COLORS.lightgray,
                                                        height: 30,
                                                        width: 30,
                                                        borderRadius: 8
                                                    }}>
                                                        <MaterialIcons name='keyboard-arrow-right'
                                                            size={28}
                                                            style={{ color: COLORS.primaryBlue }} />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            )
                            }
                        </View>
                    </View>
                </ScrollView>
            </PageContainer >
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({

});

export default Home