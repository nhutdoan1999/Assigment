import React from 'react';
import { Image } from 'react-native';

const HeaderLogo = () => (
    <Image
        source={require('../assets/IELTSICON.jpg')}
        style={{ width: 40, height: 40, marginRight: 10 }}
    />
);

export default HeaderLogo;
