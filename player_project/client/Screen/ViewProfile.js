import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewProfile =({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    
    const dispatch = useDispatch();
    
    const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAge(userInfo.age);
      setAddress(userInfo.address);

    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, age, address }));
  };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image
                     source={require('/Users/thilivhaliportiaravhutulu/SATTB/player_project/SATableTennisApp/player_project/client/Image/userDefault.png')}
                     size={80}
                    />
                    <View style={{marginLeft: 20}}>
                      <Title style={[styles.title, {
                        marginTop: 15,
                        marginBottom: 5,
                      }]}>{user.name}</Title>
                    </View>
                </View>
            </View>
           <View style={styles.userInfoSection}>
            <View style={styles.row}>
                <Icon name="map-marker-radius" color="#777777" size={20}/>
                <Text style={{color: "#777777", marginLeft: 20}}>Placeholder for home province</Text>
            </View>
            <View style={styles.row}>
                <Icon name="phone" color="#777777" size={20}/>
                <Text style={{color: "#777777", marginLeft: 20}}>Placeholder for age</Text>
            </View>
            <View style={styles.row}>
                <Icon name="email" color="#777777" size={20}/>
                <Text style={{color: "#777777", marginLeft: 20}}>Placeholder for email address</Text>
            </View>
           </View>
           <TouchableOpacity style={styles.commandButton} onPress={() => navigation.navigate('EditProfile')}>
           
              <Text style={styles.panelButtonTitle}>EDIT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ViewProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    commandButton:{
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
});
