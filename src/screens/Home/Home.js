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
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { COLORS, FONTS, images, SIZES } from '../../../constants';
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
            const response = await axios.get('http://192.168.42.184:5000/getProducts')
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
                                marginHorizontal: 22,
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

                            <TouchableOpacity>
                                <Ionicons name="ios-search-outline" size={28} color={COLORS.black} />
                            </TouchableOpacity>
                        </View>

                        {/* // Banner Section */}
                        <Banner />

                        {/* Categories Section */}
                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 25,
                            marginVertical: 5
                        }}>
                            {/* Display category buttons using a horizontal ScrollView */}
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {categories.map((category, index) => (
                                    <CategoryButton
                                        key={index}
                                        title={category}
                                        onPress={() => handleCategoryPress(category)} // Pass the category to the function
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
                            marginVertical: 22,
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
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginHorizontal: 10

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
                                        key={product._id}>
                                        <Card style={{
                                            height: 'auto',
                                            width: 150,
                                            marginHorizontal: 10,
                                            marginBottom: 2
                                        }}>
                                            <Card.Cover source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp' }}
                                                style={{
                                                    height: 90,
                                                    width: 150
                                                }} />
                                            <Card.Title title={product.name} />
                                            <Card.Content>
                                                <Text variant="titleLarge" style={{ ...FONTS.body4 }}>₹ {product.price}</Text>
                                            </Card.Content>
                                        </Card>
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


export default Home