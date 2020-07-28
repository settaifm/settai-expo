import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Image,
    ImageBackground,
    Dimensions, View
} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import  {appStyles as styles} from '../../constants/generic-styles'
import { materialTheme, products, Images } from '../../constants';
import {TouchableOpacity,TouchableHighlight} from 'react-native-gesture-handler'

const { width } = Dimensions.get('screen');
import * as Linking from 'expo-linking';



export function SocialMedia() {


    function onFacebookPagePressed() {

        console.log("pressd")
      // Linking.openURL("https://www.facebook.com/settaifm/");
        //
        let url = "fb://profile/settaifm";

        Linking.canOpenURL(url).then(supported => {
            if (supported) {

                //return Linking.openURL(url);
                return Linking.openURL("https://www.facebook.com/settaifm/");
            } else {
                return Linking.openURL("https://www.facebook.com/settaifm/");
            }
        })
    }

    return (
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
        <Button
            round
            onlyIcon
            shadowless
            icon="facebook"
            iconFamily="font-awesome"
            iconColor={theme.COLORS.WHITE}
            iconSize={theme.SIZES.BASE * 3.625}
            color={theme.COLORS.BLACK}
            onPress ={() => onFacebookPagePressed()}
            style={[styles.alignrightpos,styles.social]}

        />
    </View>)
}


