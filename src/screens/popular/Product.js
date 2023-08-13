import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, FONTS, images, SIZES } from '../../../constants';
import { Card, Text } from 'react-native-paper';
import PageContainer from '../../components/PageContainer';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';


const Product = ({ navigation }) => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {

            const response = await axios.get('http://192.168.42.16:5000/getProducts')
                .then((res) => {
                    setProducts(res.data.Products);
                    console.log('all products get sucessfully')
                })
        } catch (error) {
            console.log('axios error', error.message)
        }
    }

    useEffect(() => {
        getProducts();
    }, []);


    const renderProducts = ({ item }) => (
        <>
            <View style={{
                flex: 1,
                marginVertical: 10
            }}>
                <TouchableOpacity
                    onPress={() => {
                        // Handle navigation to product details
                    }}
                    key={item._id}>
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
                        <Card.Title title={item.name} />
                        <Card.Content>
                            <Text variant="titleLarge" style={{ ...FONTS.body4 }}>₹ {item.price}</Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </View>
        </>
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
                            }}
                        >
                            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ marginLeft: -10 }} >
                                <MaterialIcons name='keyboard-arrow-left'
                                    size={28} style={{ color: COLORS.secondaryBlack }} />
                            </TouchableOpacity>
                            <Text style={{ ...FONTS.h4 }}>Popular Products</Text>
                        </View>
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item._id}
                            renderItem={renderProducts}
                            numColumns={2}
                        />
                    </View>
                </PageContainer>
            </SafeAreaView>
        </>
    );
};

export default Product;
