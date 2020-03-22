import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import InnerHeader from '../../components/InnerHeader';
import ProductCard from '../../components/cards/ProductCard';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import Entypo from 'react-native-vector-icons/Entypo';
import {withNavigation} from 'react-navigation';

let productList = [
    {
        id: '1',
        name: 'Body BOOM, мыло для рук грейпфрукт 380 мл',
        price: 118200,
        subName: 'арт 36434',
        firmName: 'Fides Projects',
        type: 'soap',
        quantity: '12',
    },
    {
        id: '2',
        name: 'Body BOOM, мыло для рук грейпфрукт 380 мл',
        price: 118200,
        subName: 'арт 36434',
        firmName: 'Fides Projects',
        type: 'soap',
        quantity: '12',
    },
    {
        id: '3',
        name: 'Body BOOM, мыло для рук грейпфрукт 380 мл',
        price: 118200,
        subName: 'арт 36434',
        firmName: 'Fides Projects',
        type: 'soap',
        quantity: '12',
    },
    {
        id: '4',
        name: 'Body BOOM, мыло для рук грейпфрукт 380 мл',
        price: 118200,
        subName: 'арт 36434',
        firmName: 'Fides Projects',
        type: 'soap',
        quantity: '12',
    },
    {
        id: '5',
        name: 'Body BOOM, мыло для рук грейпфрукт 380 мл',
        price: 118200,
        subName: 'арт 36434',
        firmName: 'Fides Projects',
        type: 'soap',
        quantity: '12',
    },
    {
        id: '6',
        name: 'Body BOOM, мыло для рук грейпфрукт 380 мл',
        price: 118200,
        subName: 'арт 36434',
        firmName: 'Fides Projects',
        type: 'soap',
        quantity: '12',
    },
    {
        id: '7',
        name: 'Body BOOM, мыло для рук грейпфрукт 380 мл',
        price: 118200,
        subName: 'арт 36434',
        firmName: 'Fides Projects',
        quantity: '12',
        type: 'soap',
    },
];

const Product = ({navigation}) => {
    let [showType, setShowType] = useState('all');
    let [infoList, setInfoList] = useState(productList);
    useEffect(() => {
        if (showType !== 'all') {
            setInfoList(
                productList.filter(item => {
                    return showType === item.type;
                }),
            );
        } else {
            setInfoList(productList);
        }
    }, [showType]);
    return (
        <View style={styles.container}>
            <InnerHeader
                currentPage={strings.products}
                showTypes={[
                    {
                        label: strings.soapProducts,
                        value: 'soap',
                    },
                ]}
                setShowType={setShowType}
            />
            <View style={styles.cardWrapper}>
                <FlatList
                    contentContainerStyle={{
                        paddingTop: 10,
                    }}
                    showsVerticalScrollIndicator={false}
                    data={infoList}
                    renderItem={({item}) => (
                        <ProductCard item={item} key={item.id} />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate('Checkout');
                }}>
                <View style={styles.singleButton}>
                    <Entypo
                        name="shopping-cart"
                        size={25}
                        color={colors.dimGreen}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    cardWrapper: {
        flex: 1,
    },
    singleButton: {
        padding: 15,
        backgroundColor: colors.white,
        elevation: 3,
        borderRadius: 40,
        position: 'absolute',
        bottom: 10,
        right: 15,
    },
});

export default withNavigation(Product);
