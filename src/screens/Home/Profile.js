import { View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import { COLORS, FONTS, SIZES, } from '../../../constants';
import { AntDesign } from '@expo/vector-icons';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getUserData } from '../auth/Storage';

const AddProfile = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewProfileModalVisible, setViewProfileModalVisible] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleMenuOption = async (option) => {
        if (option === 'viewProfile') {
            setViewProfileModalVisible(true);
        } else if (option === 'removeProfile') {
            setSelectedImage(null);
        } if (option === 'changeProfile') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission denied');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                console.log('Selected image:', result.uri);
                setSelectedImage(result.uri);
            }
        }
        toggleMenu();
    };

    const handleSaveProfile = async () => {
        if (!selectedImage) {
            Alert.alert('Profile Image Missing', 'Please select a profile image.', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
            return;
        }

        const fileExtension = selectedImage.split('.').pop(); // Get the file extension
        const imageType = `image/${fileExtension === 'png' ? 'png' : 'jpeg'}`; // Determine image type

        const updatedProfile = new FormData();
        updatedProfile.append('fname', userData.fname);
        updatedProfile.append('lname', userData.lname);
        updatedProfile.append('email', userData.email);
        updatedProfile.append('uploadedImage', {
            uri: selectedImage,
            type: imageType,
            name: `profile.${fileExtension}`,
        });


        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateProfile`, updatedProfile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                console.log('Profile updated successfully :', response.data.user)
            } else {
                console.log('Failed to update profile :', response.data.error)
            }
        } catch (error) {
            console.log('Error updating profile:', error)
        }

    };

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserData();
            if (user) {
                setUserData(user);
                console.log("This is the userData:")
                console.log("Avatar URL:", userData?.avatar?.url);
            }
        }

        fetchUserData();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <ScrollView>
                    {/* <PageTitle title="Profile" onPress={() => navigation.navigate('Contact')} /> */}

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{
                            ...(SIZES.width <= 360 ?
                                { ...FONTS.h2 }
                                : { ...FONTS.h1 }
                            ),
                            marginTop: 5,
                            paddingHorizontal: 12,
                            fontWeight: '400',
                            // marginVertical: 8,
                        }}>
                            Complete your profile
                        </Text>
                        <Text style={{
                            ...FONTS.body3,
                            paddingHorizontal: 12,
                            fontWeight: '400',
                            // marginVertical: 8,
                            // color: 'red'
                        }}>Add a profile photo, name and bio to let people know who you are </Text>
                        <TouchableOpacity onPress={toggleMenu}>
                            <View
                                style={{
                                    width: 130,
                                    height: 130,
                                    marginVertical: 15,
                                    borderRadius: 100,
                                    backgroundColor: COLORS.secondaryWhite,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {selectedImage ? (
                                    <Image source={{ uri: selectedImage }} style={{ width: 130, height: 130, borderRadius: 100 }} />
                                ) : (
                                    <AntDesign name="user" size={64} color="#111" />
                                )}
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                    }}
                                >
                                    <AntDesign name="pluscircle" size={30} color={COLORS.gray} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Modal to view profile image */}
                        <Modal visible={viewProfileModalVisible} transparent animationType="fade">
                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                onPress={() => setViewProfileModalVisible(false)}
                            >
                                <View style={{ backgroundColor: COLORS.white, borderRadius: 8, padding: 16, width: 250, height: 250 }}>
                                    {selectedImage ? (
                                        <Image source={{ uri: selectedImage }} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
                                    ) : (
                                        <Text>No profile image selected</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </Modal>

                        <Modal visible={showMenu} transparent animationType="fade">
                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                onPress={toggleMenu}
                            >
                                <View style={{
                                    backgroundColor: COLORS.white, borderRadius: 8, padding: 16, width: 250,
                                    height: 150,
                                }}>
                                    <TouchableOpacity style={{ paddingVertical: 8 }} onPress={() => handleMenuOption('viewProfile')}>
                                        <Text style={{ ...FONTS.body3 }}>View Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ paddingVertical: 8 }} onPress={() => handleMenuOption('removeProfile')}>
                                        <Text style={{ ...FONTS.body3 }}>Remove Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ paddingVertical: 8 }} onPress={() => handleMenuOption('changeProfile')}>
                                        <Text style={{ ...FONTS.body3 }}>Change Profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </Modal>

                        <View style={{ width: '100%', paddingHorizontal: 22, paddingVertical: 0 }}>

                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                marginTop: 22,
                            }}>First name</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                marginVertical: 12,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                                // borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <TextInput
                                    placeholder='example@ Mukesh534'
                                    placeholderTextColor={COLORS.secondaryGray}
                                    keyboardType='email-address'
                                    style={{
                                        width: "100%",
                                        height: 54,
                                        fontSize: 14,
                                        backgroundColor: COLORS.secondaryWhite,
                                        paddingLeft: 22,
                                        borderRadius: SIZES.padding
                                        ,
                                        paddingLeft: SIZES.padding
                                        ,
                                        color: '#111'
                                    }}
                                    value={userData?.fname}
                                />
                            </View>

                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                // marginTop: 22,
                            }}>Last Name</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                marginVertical: 12,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                                // borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <TextInput
                                    placeholder='Hi there! My name is Mukesh'
                                    placeholderTextColor={COLORS.secondaryGray}
                                    keyboardType='email-address'
                                    style={{
                                        width: "100%",
                                        height: 54,
                                        fontSize: 14,
                                        backgroundColor: COLORS.secondaryWhite,
                                        paddingLeft: 22,
                                        borderRadius: SIZES.padding
                                        ,
                                        paddingLeft: SIZES.padding
                                        ,
                                        color: '#111'
                                    }}
                                    value={userData?.lname}

                                />
                            </View>

                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                // marginTop: 22,
                            }}>Email Address</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                marginVertical: 12,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                                // borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <TextInput
                                    placeholder='Hi there! My name is Mukesh'
                                    placeholderTextColor={COLORS.secondaryGray}
                                    keyboardType='email-address'
                                    style={{
                                        width: "100%",
                                        height: 54,
                                        fontSize: 14,
                                        backgroundColor: COLORS.secondaryWhite,
                                        paddingLeft: 22,
                                        borderRadius: SIZES.padding
                                        ,
                                        paddingLeft: SIZES.padding
                                        ,
                                        color: '#111'
                                    }}
                                    value={userData?.email}

                                />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                // marginTop: 22,
                            }}>Address</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                marginVertical: 12,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                                // borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <TextInput
                                    placeholder='Hi there! My name is Mukesh'
                                    placeholderTextColor={COLORS.secondaryGray}
                                    keyboardType='email-address'
                                    style={{
                                        width: "100%",
                                        height: 54,
                                        fontSize: 14,
                                        backgroundColor: COLORS.secondaryWhite,
                                        paddingLeft: 22,
                                        borderRadius: SIZES.padding
                                        ,
                                        paddingLeft: SIZES.padding
                                        ,
                                        color: '#111'
                                    }}
                                    value={userData?.address}

                                />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                // marginTop: 22,
                            }}>Phone Number</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                marginVertical: 12,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                                // borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <TextInput
                                    placeholder='Hi there! My name is Mukesh'
                                    placeholderTextColor={COLORS.secondaryGray}
                                    keyboardType='numeric'
                                    style={{
                                        width: "100%",
                                        height: 54,
                                        fontSize: 14,
                                        backgroundColor: COLORS.secondaryWhite,
                                        paddingLeft: 22,
                                        borderRadius: SIZES.padding
                                        ,
                                        paddingLeft: SIZES.padding
                                        ,
                                        color: '#111'
                                    }}
                                    value={userData?.phoneNumber}
                                />
                            </View>
                            <Button
                                title="Save"
                                filled
                                onPress={handleSaveProfile}
                                style={{
                                    marginTop: 15,
                                    // marginVertical: 55,
                                    marginBottom: 24,
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    )
}

export default AddProfile