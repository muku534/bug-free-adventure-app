import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { COLORS, icons } from '../../../constants';

const CategoryButton = ({ title, onPress, imageSource }) => {
    return (
        <TouchableOpacity
            style={{
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                width: 'auto',
                // backgroundColor: COLORS.primaryBlue,
                // borderWidth: 1,
                borderRadius: 10,
                // paddingHorizontal: 1,
                marginHorizontal: 8,
                marginTop: 10,
                shadowColor: COLORS.secondaryBlack,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginBottom:5
            }}
            onPress={onPress} // Call the onPress function from props
        >
            <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 5
            }}>
                <View style={{
                    backgroundColor: COLORS.lightgray,
                    height: 30,
                    width: 30,
                    // paddingHorizontal:5,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                    <Image
                        source={imageSource}
                        style={{
                            height: 25,
                            width: 25,
                        }}
                    />
                </View>
                <Text style={{ color: COLORS.secondaryWhite, paddingHorizontal: 5 }}>{title}</Text>
            </View>
        </TouchableOpacity>

    );
};

export default CategoryButton;
