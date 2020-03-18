import 'react-native-gesture-handler';
import React from 'react';
import {UIManager, Platform} from 'react-native';
import AppNavigator from './src/routes/AppRouter';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

let App = () => {
    return <AppNavigator />;
};

export default App;
