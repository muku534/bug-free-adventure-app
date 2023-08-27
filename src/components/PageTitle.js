import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../constants';

const PageTitle = (props) => {
    return (
        <View style={styles.pageTitleContainer}>
            <TouchableOpacity onPress={props.onPress}
             style={{ marginLeft: -15 }}>
                <MaterialIcons name='keyboard-arrow-left' color={COLORS.black} size={SIZES.padding * 3} />
            </TouchableOpacity>
            {
                props.title && (
                    <Text style={{ ...FONTS.h4, color: COLORS.black }}>
                        {props.title}
                    </Text>
                )
            }
        </View>
    )
};

const styles = StyleSheet.create({
    pageTitleContainer: {
        marginHorizontal: 22,
        // marginVertical: 42,
        marginTop: 42,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})

export default PageTitle