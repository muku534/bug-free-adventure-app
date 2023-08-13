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
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, images, SIZES } from '../../../constants';
import PageContainer from '../../components/PageContainer';
import { ScrollView } from 'react-native';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import { Card, } from 'react-native-paper';
import axios from 'axios'
import SkeletonCard from '../popular/SkeletonCard';
import Product from '../popular/Product';

const Home = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [isLoading, setLoading] = useState(true);

    const getProduct = async () => {
        try {
            const response = await axios.get('http://192.168.42.16:5000/getProducts')
                .then((Res) => {
                    setProducts(Res.data.Products);
                    setLoading(false)
                    // console.log(Res.data)
                    console.log('data get sucessfully')
                })
        } catch {
            // Handle API call or AsyncStorage access error
            console.error('Error during login:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [])

    const currentProducts = products.slice(0, 2);




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginHorizontal: 22,
                                marginTop: 35,
                            }}
                        >
                            <TouchableOpacity  >
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

                        <View
                            style={{
                                marginHorizontal: 22,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: COLORS.secondaryWhite,
                                height: 48,
                                marginVertical: 22,
                                paddingHorizontal: 12,
                                borderRadius: 20,
                            }}
                        >
                            <Ionicons name="ios-search-outline" size={24} color={COLORS.black} />

                            <TextInput
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    marginHorizontal: 12,
                                }}
                                placeholder="Search Contact..."

                            />
                        </View>

                        <View style={{
                            backgroundColor: COLORS.primaryBlue,
                            height: 'auto',
                            width: 'auto',
                            borderRadius: 15,
                            marginHorizontal: 25,
                            // marginVertical: 35,
                        }}>

                            <Text style={{
                                color: COLORS.secondaryGray,
                                alignItems: 'center',
                                ...FONTS.body4,
                                paddingHorizontal: 18,
                                paddingVertical: 10
                            }}>
                                Zenbook Duo
                            </Text>

                            <View style={{
                                paddingHorizontal: 18,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    color: COLORS.secondaryWhite,
                                    ...FONTS.h4,
                                    lineHeight: 26
                                }}>
                                    Unbelievable Visual
                                    & Performance
                                </Text>

                                <View style={{
                                    marginTop: -35,
                                }}>
                                    <Image
                                        source={require("../../../assets/images/banner.png")}
                                        style={{
                                            height: 112,
                                            width: 112,
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={{
                                paddingHorizontal: 20,
                                marginTop: -10,
                                paddingBottom: 10,
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor: COLORS.secondaryWhite,
                                    width: 120,
                                    height: 35,
                                    borderRadius: 10
                                }} >
                                    <Text style={{
                                        paddingHorizontal: 30,
                                        paddingVertical: 8
                                    }}>
                                        Buy Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            <View style={{
                                flexDirection: 'row', marginHorizontal: 25,
                                marginVertical: 25
                            }}>
                                <TouchableOpacity style={{
                                    height: 32,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 100,
                                    borderColor: COLORS.black,
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    paddingHorizontal: 5,
                                    marginHorizontal: 12
                                }}>
                                    <Text >
                                        Laptops
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    height: 32,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 100,
                                    borderColor: COLORS.gray,
                                    borderWidth: 1,
                                    borderRadius: 50,
                                    paddingHorizontal: 5,
                                    // marginHorizontal: 12
                                }}>
                                    <Text>
                                        Computer
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    height: 32,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 100,
                                    borderColor: COLORS.gray,
                                    borderWidth: 1,
                                    borderRadius: 50,
                                    paddingHorizontal: 5,
                                    marginHorizontal: 12
                                }}>
                                    <Text  >
                                        Accessories
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>

                        <View style={{
                            marginHorizontal: 22,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "space-between",
                            height: 48,
                            // marginVertical: 22,
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

                        {/* Popular products */}

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginHorizontal: 10

                        }}>

                            {isLoading ? (
                                <SkeletonCard />
                            ) :
                                (
                                    currentProducts.map((product) => (
                                        <Product />
                                    ))

                                )}
                        </View>

                    </View>
                </ScrollView>
            </PageContainer >
        </SafeAreaView >
    )
}


export default Home