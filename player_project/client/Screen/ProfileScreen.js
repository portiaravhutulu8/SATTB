import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const ProfileScreen = () => {
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
  const {colors} = useTheme();

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton}>
        <Text styles={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}>
        <Text styles={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}
      onPress={() => this.bs.current.snapTo(1)}>
        <Text styles={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>

    </View>
   );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}/>
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

    return(
        <View style={styles.container}>
          <BottomSheet
          ref={this.bs}
          snapPoints={[330, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
          />
          <Animated.View style={{margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
          }}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                <View style= {{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
              <ImageBackground
               source={require('/Users/thilivhaliportiaravhutulu/SATTB/player_project/SATableTennisApp/player_project/client/Image/userDefault.png')}
              style={{height: 100, width: 100}}
              imageStyle={{borderRadius: 15}}
              >
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Icon
                  name="camera" size={35} color="#ffff" style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}
                  />

                </View>
              </ImageBackground>
              </View>
              </TouchableOpacity>
              <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
                Placeholder For Name
              </Text>
            </View>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <TextInput
              placeholder='Full Name'
              placeholderTextColor="#666666"
              value={name}
                  onChange={(e) => setName(e.target.value)}
              autoCorrect={false}
              style={[styles.textInput, {color: colors.text}]}
              />
            </View>
            
            <View style={styles.action}>
              <FontAwesome name="envelope-o" color={colors.text} size={20} />
              <TextInput
              placeholder='Email Address'
              keyboardType='email-address'
              placeholderTextColor="#666666"
              value={email}
                  onChange={(e) => setEmail(e.target.value)}
              autoCorrect={false}
              style={[styles.textInput, {color: colors.text}]}
              />
            </View>
            <View style={styles.action}>
              <Feather name="phone" color={colors.text} size={20} />
              <TextInput
              placeholder='Age'
              keyboardType='number-pad'
              placeholderTextColor="#666666"
              value={age}
                  onChange={(e) => setAge(e.target.value)}
              autoCorrect={false}
              style={[styles.textInput, {color: colors.text}]}
              />
            </View>
            <View style={styles.action}>
              <Icon name="map-marker-outline" color={colors.text} size={20} />
              <TextInput
              placeholder='Home Province'
              placeholderTextColor="#666666"
              value={address}
                  onChange={(e) => setAddress(e.target.value)}
              autoCorrect={false}
              style={[styles.textInput, {color: colors.text}]}
              />
            </View>
            {/*{loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}*/}
            <TouchableOpacity onSubmit={submitHandler} style={styles.commandButton} onPress={() => {}}>
              <Text style={styles.panelButtonTitle}>Update</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
      },
      commandButton:{
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
      },
      panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        //borderTopLeftRadius: 20,
        //borderTopRightRadius: 20,
        //shadowColor: '#000000',
        //shadowOffset: {width: 0, height: 0},
        //shadowRadius: 5,
        //shadowOpacity: 0.4,
      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height:-3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        //elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      action : {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
      },
      actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
      },
      textInput: {
        flex: 1,
        //marginTop: Platform.OS === 'ios ? 0 : -12',
        paddingLeft: 10,
        color: '#05375a',
      },
    });