import { View, Text, TouchableOpacity, Modal, TextInput, Image, Alert } from 'react-native';
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

const AddProfile = ({ navigation, route }) => {
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
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                {/* <PageTitle title="Profile" onPress={() => navigation.navigate('Contact')} /> */}

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{
                        ...(SIZES.width <= 360 ?
                            { ...FONTS.h2 }
                            : { ...FONTS.h1 }
                        ),
                        marginTop: 50,
                        paddingHorizontal: 12,
                        fontWeight: '400',
                        marginVertical: 8,
                    }}>
                        Complete your profile
                    </Text>
                    <Text style={{
                        ...FONTS.body3,
                        paddingHorizontal: 12,
                        fontWeight: '400',
                        marginVertical: 8,
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
                        <Button
                            title="Save"
                            filled
                            onPress={handleSaveProfile}
                            style={{
                                marginTop: 15,
                                // marginVertical: 55,
                                marginBottom: 4,
                            }}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default AddProfile