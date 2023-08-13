import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../../constants/colors'
import { FONTS, SIZES } from '../../constants';

const Button = (props) => {
    const enabledBgColor = props.color || COLORS.primary;
    const disableBgColor = COLORS.secondaryWhite;
    const bgColor = props.disabled ? disableBgColor : enabledBgColor;
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ ...FONTS.body3, color: props.disabled ? COLORS.primary : COLORS.white }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        // paddingBottom: 16,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding3,
        borderColor: COLORS.primary,
        // borderWidth: 2,
        borderRadius: SIZES.padding,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Button