import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { COLORS, FONTS, SIZES, images } from '../../../constants';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import { AntDesign } from '@expo/vector-icons';
import Input from '../../components/Input';
import Button from '../../components/Button';


const Profile = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleMenuOption = (option) => {
        if (option === 'viewProfile') {
            console.log('View Profile');
        } else if (option === 'removeProfile') {
            console.log('Remove Profile');
        } else if (option === 'changeProfile') {
            const options = {
                title: 'Select Profile Picture',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
        }
        toggleMenu();
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <PageTitle title="Profile" onPress={() => navigation.navigate('PhoneNumber')} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={toggleMenu}>
                        <View
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: COLORS.secondaryWhite,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >

                            <Image source={images.user4} style={{
                                width: 100,
                                height: 100,
                                borderRadius:100,
                                marginVertical: 48
                            }} />
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                }}
                            >
                                <AntDesign name="pluscircle" size={24} color={COLORS.gray} />
                            </View>
                        </View>
                    </TouchableOpacity>
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
                    <View style={{ width: '100%', paddingHorizontal: 22, paddingVertical: 60 }}>
                        <Input id="firstNameInput" placeholder="Mr.Mukesh" />
                        <Input id="lastNameInput" placeholder="Last Name" />
                        <Button
                            title="Save"
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                marginVertical: 12,
                                marginBottom: 48,
                            }}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    );
};

export default Profile;
