import React from 'react';
import {Text as DefualtText} from 'react-native';

const Text = ({style = {}, ...rest}) => {
    let fontFamily = 'Rubik-Regular';
    let {fontWeight = ''} = style;
    if (fontWeight === '900') fontFamily = 'Rubik-Black';
    if (fontWeight.toString().toLowerCase() === 'bold' || fontWeight === '700')
        fontFamily = 'Rubik-Bold';
    if (fontWeight === '600') fontFamily = 'Rubik-Medium';
    if (fontWeight === '300') fontFamily = 'Rubik-Light';

    return <DefualtText {...rest} style={[style, {fontFamily}]}></DefualtText>;
};

export default Text;
