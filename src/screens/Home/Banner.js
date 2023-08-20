import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../../constants';

const Banner = () => {
    return (
        <View style={{
            backgroundColor: COLORS.primaryBlue,
            height: 'auto',
            width: 'auto',
            borderRadius: 15,
            marginHorizontal: 25,
            marginVertical: 35,
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
    )
}

export default Banner
