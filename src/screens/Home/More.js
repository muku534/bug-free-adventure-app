import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { COLORS, FONTS, images } from '../../../constants'
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { getUserData } from '../auth/Storage'
import axios from 'axios'

const More = ({ navigation }) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserData();
            if (user) {
                setUserData(user);
                console.log("This is the userData:")
                console.log("Avatar URL:", userData);

            }
        }

        fetchUserData();
    }, []);

    const Logout = async () => {
        try {
            const response = await axios.post('http://192.168.42.149:5000/logout')
            if (response.status === 200) {
                console.log('Logged out successfully');
            }
        } catch (error) {
            console.log('Logout error:', error)
        }
    }

    return (
        <SafeAreaView >
            <PageContainer>
                <View style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: 22,
                        marginVertical: 22,
                        marginTop: 40,
                    }}>
                        <Text style={{ ...FONTS.h4 }}>Settings</Text>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        // justifyContent: 'center',
                        marginHorizontal: 22
                    }}>

                        <View style={{
                            height: 40,
                            width: 40,
                            borderRadius: 34,
                            backgroundColor: COLORS.secondaryWhite,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {/* {userData && userData.avatar && (
                                <Image source={{ uri: userData.avatar.url }} style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 100,
                                    marginVertical: 48
                                }} />
                            )} */}
                            <Image source={images.user4} style={{
                                width: 55,
                                height: 55,
                                borderRadius: 100,
                                marginVertical: 48
                            }} />
                        </View>
                        <Text style={{ ...FONTS.h3, marginVertical: 6 ,marginHorizontal:32 }}>
                            {userData?.fname} {userData?.lname}
                        </Text>
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <AntDesign name='user'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Account
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            console.log("presser")
                        }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Entypo name='light-down'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Appearance
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            console.log("presser")
                        }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Ionicons name='notifications-outline'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Notifications
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            console.log("presser")
                        }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <MaterialCommunityIcons name='shield-lock-open-outline'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Privacy
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            console.log("presser")
                        }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <MaterialCommunityIcons name='email-outline'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Invite Your Friends
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={Logout}
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                marginHorizontal: 22,
                                paddingVertical: 12,
                                alignItems: "center"
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 22
                            }}>
                                <MaterialCommunityIcons name='logout-variant'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12, color: 'red' }}>
                                    Logout
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView >
    )
}

export default More