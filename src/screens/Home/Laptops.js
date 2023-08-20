import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { COLORS, FONTS, images, SIZES } from '../../../constants';
import { Card, Text } from 'react-native-paper';
import PageContainer from '../../components/PageContainer';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import SkeletonCard from '../popular/SkeletonCard';


const Laptops = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const getProducts = async () => {
        try {

            const response = await axios.get('http://192.168.42.7:5000/getProducts')
            setProducts(response.data.Products);
            setLoading(false);
            console.log('all products get sucessfully')

        } catch (error) {
            setLoading(false);
            console.log('axios error', error.message)
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const skeletonCount = 10; // Set the number of skeleton cards
    const cardsPerRow = 2; // Number of skeleton cards per row






    const renderProducts = ({ item }) => (

        <TouchableOpacity
            onPress={() => {
                // Handle navigation to product details
            }}
            key={item._id}
            style={{
                flex: 1,
                marginVertical: 10,
                width: '50%',
                paddingHorizontal: 5,
                marginVertical: 5
            }}
        >
            <Card style={{
                height: 'auto',
                width: '90%',
                marginHorizontal: 10,
                marginBottom: 2
            }}>
                <Card.Cover source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp' }}
                    style={{
                        height: 90,
                        width: "100%"
                    }} />
                <Card.Title title={item.name} />
                <Card.Content>
                    <Text variant="titleLarge" style={{ ...FONTS.body4 }}>₹ {item.price}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>

    )


    return (
        <>
            <SafeAreaView>
                <PageContainer>
                    <View style={{ flex: 1 }} >
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
                                value={searchQuery}
                                onChangeText={(text) => setSearchQuery(text)}
                            />
                        </View>

                        {isLoading ? (
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 25,
                                marginHorizontal: 10
                            }}>
                                {Array.from({ length: cardsPerRow }, (_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </View>
                        ) : (

                            < FlatList
                                data={products.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                                keyExtractor={(item) => item._id}
                                renderItem={renderProducts}
                                numColumns={2}
                                contentContainerStyle={{
                                    marginHorizontal: 10,
                                    paddingBottom: 25,
                                    marginVertical: 18
                                }}
                            />
                        )
                        }
                    </View>
                </PageContainer>
            </SafeAreaView>
        </>
    )
}

export default Laptops
