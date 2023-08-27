import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { Login, Signup, Welcome } from "./screens";
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import Welcome from './src/screens/Home/Welcome'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { Accessories, Cart, Computers, Home, Laptops, Product, Profile, Wishlist, Checkout } from './src/screens';
import SingleProduct from './src/screens/Home/SingleProduct';
import { Cloudinary } from 'cloudinary-react-native'
import { StripeProvider } from '@stripe/stripe-react-native'

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {

  //Load fonts
  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Mulish-Black.ttf'),
    regular: require('./assets/fonts/Mulish-Regular.ttf'),
    bold: require('./assets/fonts/Mulish-Bold.ttf'),
    medium: require('./assets/fonts/Mulish-Medium.ttf'),
    meediumItalic: require('./assets/fonts/Mulish-MediumItalic.ttf'),
    semiBold: require('./assets/fonts/Mulish-SemiBold.ttf'),
    semiBoldItalic: require('./assets/fonts/Mulish-SemiBoldItalic.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }

  const CloudinaryConfig = {
    clouName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  }

  const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StripeProvider publishableKey={stripePublishableKey}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Welcome'
          >
            <Stack.Screen name='BottomTabNavigation' component={BottomTabNavigation}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen name='DrawerNavigator' component={DrawerNavigator}
              options={{
                headerShown: false
              }}
            />


            <Stack.Screen
              name="Home"
              component={BottomTabNavigation}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false
              }}
            />

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Product"
              component={Product}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Laptops"
              component={Laptops}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Computers"
              component={Computers}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Accessories"
              component={Accessories}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Wishlist"
              component={Wishlist}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{
                headerShown: false
              }}
            />

            <Stack.Screen
              name="SingleProduct"
              component={SingleProduct}
              options={({ route }) => ({
                headerShown: false,
                title: 'Product Details',
                params: { productId: route.params.productId }
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    </SafeAreaProvider>
  );
}