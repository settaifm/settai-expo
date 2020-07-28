import {useDispatch, useSelector} from "react-redux";
import {Dimensions, ImageBackground} from "react-native";

import React from "react";
import {Block, Button, Text, theme} from 'galio-framework';
import  { useState} from "react";
import {appStyles as styles} from '../../constants/generic-styles'
import {VolumeControl} from "./VolumeControl";
import {setPlayInSpeaker} from "../services";
import {SET_PLAYING_IN_SETTING, TOGGLE_AUDIO_OUTPUT} from "../settings-store";
import {  Image } from 'react-native';
const { height, width } = Dimensions.get('screen');
import { MaterialIcons } from '@expo/vector-icons';
import {SET_PLAY_STATE} from "../player/player-store";
import {Images} from "../../constants";
import TouchableHighlight from "react-native-web/dist/exports/TouchableHighlight";
import * as Linking from "expo-linking";

export  function PlayControl() {

    const {playbackInstance,output_speaker} = useSelector(state => state.settings);
    const {isPlaying} = useSelector(state => state.player);

    const [playing, setPlaying] = useState(isPlaying);
    const [inProgress, setInProgress] = useState(false);




    const onTogglePlayPressed = async () => {


        if(inProgress)
            return

        setInProgress(true)
        setPlaying(!isPlaying)

        //console.log("updating to" ,updatedState)
        //dispatch({type: SET_PLAYING_IN_SETTING,payload:updatedState});

        if(isPlaying)
             await playbackInstance.pauseAsync();
        else
             await playbackInstance.playAsync();

        setInProgress(false)

    }

    const onFacebookPagePressed =() => {

        console.log("pressd")
        Linking.openURL("https://www.facebook.com/settaifm/");
        //
        // let url = "fb://page/settaifm";
        //
        // Linking.canOpenURL(url).then(supported => {
        //     if (supported) {
        //         console.log("opening fb")
        //         return Linking.openURL(url);
        //     } else {
        //         return Linking.openURL("https://www.facebook.com/settaifm/");
        //     }
        // })
    }
    const onToggleSpeakerPressed = async () => {

        const modifiedStateToPlayInSpeaker = !output_speaker;

        await setPlayInSpeaker(modifiedStateToPlayInSpeaker)

        dispatch({type:TOGGLE_AUDIO_OUTPUT})

    }

    const dispatch = useDispatch();
    const playPauseIcon =playing?"pause":"play"
    const speakerIcon =output_speaker?"phone-bluetooth-speaker":"speaker"

    return (<Block row center space="between">
                    <Block flex middle left>
                        <Button
                            round
                            onlyIcon
                            shadowless
                            icon={playPauseIcon}
                            iconFamily="font-awesome"
                            iconColor={theme.COLORS.WHITE}
                            iconSize={theme.SIZES.BASE * 4.625}
                            color={theme.COLORS.BLACK}
                            onPress={() => onTogglePlayPressed()}
                            style={[styles.playbutton, styles.shadow]}
                        />
                    </Block>
        <Block flex middle center>

            <Image
                style={styles.smallLogo}
                source={require("../../assets/images/settai-fm-small.png")}
            />

        </Block>
                <Block flex middle right>
                        <Button
                            round
                            onlyIcon
                            shadowless
                            icon={speakerIcon}
                            iconFamily="MaterialIcons"
                            iconColor={theme.COLORS.WHITE}
                            iconSize={theme.SIZES.BASE * 4.625}
                            color={theme.COLORS.BLACK}
                            onPress={() => onToggleSpeakerPressed()}
                            style={[styles.playbutton, styles.shadow]}
                        />
                    </Block>
                </Block>

    )
}


