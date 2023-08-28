import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../../components/PageContainer'
import { FONTS, SIZES, images, COLORS } from '../../../constants'
import Button from '../../components/Button'


const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView >
            <PageContainer>
                <View style={{ flex: 1 }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 45
                    }}>
                        <Text style={{
                            ...FONTS.h2
                        }}> SCS </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{
                            backgroundColor: COLORS.primaryBlue,
                            height: 60,
                            width: 70,
                            marginVertical: 50,
                            borderRadius: 120,
                            marginLeft: 65,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image
                                source={images.Accessorie}
                                resizeMode='contain'
                                style={{
                                    width: 85,
                                    height: 85,
                                    marginHorizontal: -40,
                                    marginTop: -10
                                }}
                            />
                        </View>

                        <View style={{
                            backgroundColor: COLORS.primaryBlue,
                            height: 70,
                            width: 70,
                            marginVertical: 85,
                            marginHorizontal: 110,
                            borderRadius: 120,
                            // marginRight: 55,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image
                                source={images.Monitor}
                                resizeMode='contain'
                                style={{
                                    width: 100,
                                    height: 100,
                                    marginHorizontal: -40,
                                    marginTop: -10
                                }}
                            />
                        </View>
                    </View>



                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: -30
                    }}>
                        <View style={{
                            backgroundColor: COLORS.primaryBlue,
                            height: 155,
                            width: 150,
                            borderRadius: 120,
                            marginTop: -40,
                            marginHorizontal: 55,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image
                                source={images.dims}
                                resizeMode='contain'
                                style={{
                                    width: 260,
                                    height: 200,
                                    marginHorizontal: -40,
                                    marginTop: -10
                                }}
                            />
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 22,
                        marginTop: 10,
                    }}>
                        <View>
                            <Text style={{
                                ...FONTS.body2,
                                fontWeight: 'bold',
                                marginHorizontal: 10,
                            }}>
                                Find The Latest &
                            </Text>
                            <Text style={{
                                ...FONTS.body2,
                                fontWeight: 'bold',
                                marginHorizontal: 15,
                                marginTop: 5
                            }}>
                                Stylish Gadgets
                            </Text>
                        </View>


                        <View style={{ width: '100%', alignItems: 'center', marginTop: 22 }}>

                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <View style={{
                                    backgroundColor: COLORS.primaryBlue,
                                    paddingHorizontal: 70,
                                    paddingVertical: 15,
                                    // marginVertical: 18,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    // marginHorizontal: 52
                                }}>
                                    <Text style={{ ...FONTS.body3, color: COLORS.secondaryWhite, fontWeight: 'bold' }}>
                                        Start Shopping
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Welcome