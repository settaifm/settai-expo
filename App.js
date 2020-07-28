import * as React from 'react';
import {Provider} from "react-redux";

import {PersistGate} from 'redux-persist/integration/react'
import {persistor, store} from './config/store'

import {Player} from "./core/player/Player";
import {SocialMedia} from "./core/components/SocialMedia";
import {Block} from "galio-framework";

const appstore = store();



export  default function App(props) {

    return (

        <Provider store={appstore}>
            <PersistGate loading={null} persistor={persistor}>

                <Player />
            </PersistGate>
        </Provider>


    );

}



//
// const Wrapped = props => (
//     <Provider store={store}>
//         <App />
//     </Provider>
// )
//
// export default Wrapped; // wrong!
