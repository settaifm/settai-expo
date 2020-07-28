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


export function Deemwar() {

    return     <Block row center space="between"  style={[styles.deemwarlogocontainer]}>
        <Block flex middle right>
            <Text color="white"  style={[styles.deemwarlogo, styles.shadow]}>A Deemwar Product</Text>
        </Block>
    </Block>
}
