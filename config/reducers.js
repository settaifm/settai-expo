import { combineReducers } from 'redux';
import player from '../core/player/player-store'
import settings from '../core/settings-store'
import log from '../shared/log-store'

export default combineReducers({
    player,
    settings,
    log

})


