import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../../../constants';

const CategoryButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 5,
                marginHorizontal: 12,
            }}
            onPress={onPress} // Call the onPress function from props
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};

export default CategoryButton;
