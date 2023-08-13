import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../../components/PageContainer'
import { FONTS, SIZES, images } from '../../../constants'
import Button from '../../components/Button'


const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={{flex:1}}>
            <PageContainer>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginHorizontal: 22 , height:"100%" }}>
                    <Image source={images.illustration} style={{ width: SIZES.width * 0.7, height: SIZES.width * 0.7, marginVertical: 48 }} />

                    <Text style={{
                        ...(SIZES.width <= 360 ?
                            { ...FONTS.h2 }
                            : { ...FONTS.h1 }
                        ), textAlign: 'center', marginHorizontal: SIZES.padding * 0.8
                    }}>
                        Conneect easily with your family and friends over countries
                    </Text>

                    <View style={{ width: '100%', alignItems: 'center', marginTop:32 }}>
                        <Text style={{ ...FONTS.body3, marginVertical: 12 }}>
                            Terms & Conditions
                        </Text>
                        <Button title="Start Messaging"
                            onPress={() => navigation.navigate('Login')}
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                marginBottom: 40
                            }}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Welcome