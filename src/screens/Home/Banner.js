import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../../constants';

const Banner = () => {
    return (
        <View style={{
            backgroundColor: COLORS.primaryBlue,
            height: '28%',
            width: 'auto',
            borderRadius: 15,
            marginHorizontal: 20,
            marginVertical: 20,
            shadowColor: COLORS.secondaryBlack,
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        }}>

            <Text style={{
                color: COLORS.secondaryGray,
                alignItems: 'center',
                ...FONTS.body4,
                paddingHorizontal: 18,
                paddingVertical: 15
            }}>
                Zenbook Duo
            </Text>

            <View style={{
                paddingHorizontal: 15,
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
                    marginTop: -30,
                }}>
                    <Image
                        source={require("../../../assets/images/banner.png")}
                        resizeMode='cover'
                        style={{
                            height: 120,
                            width: 125,
                        }}
                    />
                </View>
            </View>

            <View style={{
                paddingHorizontal: 20,
                marginTop: -18,
                // paddingBottom: 5,
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
    )
}

export default Banner
