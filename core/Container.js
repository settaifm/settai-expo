import {useSelector} from "react-redux";
import {Player} from "./player/Player";
import React, {Fragment} from "react";
import {ImageBackground, StatusBar, View} from "react-native";
import {SocialMedia} from "./components/SocialMedia";
import {PlayControl} from "./components/PlayControl";

export function Container() {
    const {isLoaded,error} = useSelector(state => state.player);
    const {isInternetReachable} = useSelector(state => state.settings);


    let component =<ReloadComponent/>

    if(isInternetReachable)
        component =<PlayControl/>;




    return <View style={styles.viewcontainer}>
        <StatusBar barStyle="light-content  " />


        <ImageBackground  source={require('../../assets/galaxy.png')}   style={styles.image}>
            <View style={{  flex: 1,                flexDirection: 'column',                justifyContent: 'space-between',}}>


                <View >
                    <SocialMedia/>

                </View>
            </View>
        </ImageBackground>
    </View>


                }



