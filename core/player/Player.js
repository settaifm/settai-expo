import {useDispatch, useSelector} from "react-redux";
import {SET_PLAY_STATE} from "./player-store";
import {Dimensions, ImageBackground, Platform, StatusBar, StyleSheet,View} from "react-native";

import React, {Fragment, useEffect} from "react";
import {Audio} from "expo-av";

import {SET_INSTANCE} from "../settings-store";
import {Block, Button, Text, theme,} from 'galio-framework';
import {Images, materialTheme} from '../../constants';
import {HeaderHeight} from "../../constants/utils";
import {SocialMedia} from "../components/SocialMedia";
import {checkConnection, debounce, setPlayInSpeaker, throttle} from "../services";
import {PlayControl} from "../components/PlayControl";
import {Deemwar} from "../components/Deemwar";
import * as Linking from "expo-linking";
import TouchableHighlight from "react-native-web/dist/exports/TouchableHighlight";



const { height, width } = Dimensions.get('screen');


const FM_URL ="http://stream.zeno.fm/b0qy1rp884zuv";



export function Player() {

    const {isLoaded,error} = useSelector(state => state.player);
    const {url} = useSelector(state => state.settings);

    const dispatch = useDispatch();

    useEffect(() => {

        if(null == url)
            return;







        const source = { uri: url };
        const initialState = {

            shouldPlay: false,
            rate: 1.0,
            shouldCorrectPitch: true,
            volume: 1.0,
            isMuted: false,
            isLooping: false,
            isBuffering:false,
            isPlaying:false,
            error:null


        };


        const debouncedSetStatus = new throttle((status)=>{

            if(status.error)
                checkConnection(dispatch)

            dispatch({type: SET_PLAY_STATE,payload:status});

        },1000)



        async function loadSound() {
            await setPlayInSpeaker(true)
            const { sound, status } = await Audio.Sound.createAsync(
                source,
                initialState,
                (status)=>{

                    // if (status.isLoaded && status.isPlaying)
                    //     dispatch({type: SET_PLAY_STATE,payload:status.isPlaying});
                    //

                    debouncedSetStatus(status)
                    //dispatch({type: SET_PLAY_STATE,payload:value});
                }
            );
            dispatch({type: SET_INSTANCE,payload:sound})
            await sound.playAsync();

        }

        loadSound()


    }, [url]);



    let component =<Fragment></Fragment>

    if(isLoaded)
        component =<PlayControl/>;



    return (<Fragment><Block row top>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                        }}>
                            <Block row top middle>
                                <Text color="white" size={60}>Settai FM</Text>

                                <Block top style={styles.pro}>
                                    <Text size={16} color="white">24 hours</Text>
                                </Block>
                            </Block>
                            <Deemwar/>
                        </View>


                    </Block>


                <Block row style={styles.bottomContainer} >
                    {component}
                </Block></Fragment>);




}



function AudioRate() {

}



function ProgressBar() {

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.BLACK,
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    },
    viewcontainer: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        zIndex: 3,
        position: 'absolute',
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
    },
    paddedTitle: {




    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
    },
    pro: {
        backgroundColor: materialTheme.COLORS.LABEL,
        paddingHorizontal: 8,
        marginLeft: 12,
        borderRadius: 2,
        height: 22
    },
    bottomContainer: {


        marginLeft: 12,
        marginRight: 12,
        marginBottom:12


    },
    gradient: {
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 66,
    },
});
