import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES, icons } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";
import { Avatar, Button, Card, } from 'react-native-paper';


const PopularProducts = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Products</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 16,}}>
        <Card>
          {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
          <Card.Cover source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp' }} />
          <Card.Title title="Lenovo - Flex 3 ChromeBook" />
          <Card.Content style={{ marginTop: 2}}>
            {/* <Text variant="titleLarge">Lenovo - Flex 3 ChromeBook</Text> */}
            <Text variant="bodyMedium">Some quick example text to build on the card title and make up the bulk of the card's content.</Text>
          </Card.Content>
        </Card>
       

      </View>
    </View>
  );
};

export default PopularProducts;
