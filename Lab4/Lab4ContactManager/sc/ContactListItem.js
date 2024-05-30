import { TouchableHighlight, Text, Image, View } from 'react-native';
import Styles from './Styles';

const ContactListItem = ({ name, avatar, phone, onPress }) => {
    return (
        <TouchableHighlight
            underlayColor="grey"
            style={Styles.listContainer}
            onPress={onPress}>
            <View style={Styles.contactInfo}>
                <Image source={{ uri: avatar }} style={Styles.avatar} />
                <View style={Styles.details}>
                    <Text style={Styles.title}>{name}</Text>
                    <Text style={Styles.subtitle}>{phone}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default ContactListItem;