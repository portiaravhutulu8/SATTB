import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign.js';
import { Dimensions, Image, ScrollView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableOpacityComponent } from 'react-native';
import { AutourOne_400Regular } from '@expo-google-fonts/dev';
import axios from 'axios';
import { setLocalDatastoreController } from 'parse';
import { Card, Provider } from 'react-native-paper';
import { useEffect, useState } from 'react';


const RegisterButton = () => {
  const navigation = useNavigation();

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);


  const [tournamentList, setTournamentList] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.8.103:8000/api/user/tournaments",).then((response) => {
      console.log(response);
      setTournamentList(response.data);
    });
  }, []);
 

  const Info = () =>{
    //console.log(tournamentList)
    //navigation.navigate('TournamentInfo');
    alert('Joined tournament successful');
  }




  /*const persons = [This is dummy data 
    {
      id: "1",
      name: "Earnest Green",
      place:"West",
    },
    {
      id: "2",
      name: "Winston Orn",
      place:"West",
    },
    {
      id: "3",
      name: "Carlton Collins",
      place:"West",
    },
    {
      id: "4",
      name: "Malcolm Labadie",
      place:"West",
    },
    {
      id: "5",
      name: "Michelle Dare",
      place:"West",
    },
    {
      id: "6",
      name: "Carlton Zieme",
      place:"West",
    },
    {
      id: "7",
      name: "Jessie Dickinson",
      place:"West",
    },
    {
      id: "8",
      name: "Julian Gulgowski",
      place:"West",
    },
    {
      id: "9",
      name: "Ellen Veum",
      place:"West",
    },
    {
      id: "10",
      name: "Lorena Rice",
      place:"West",
    },

    {
      id: "11",
      name: "Carlton Zieme",
      place:"West",
    },
    {
      id: "12",
      name: "Jessie Dickinson",
      place:"West",
    },
    {
      id: "13",
      name: "Julian Gulgowski",
      place:"West",
    },
    {
      id: "14",
      name: "Ellen Veum",
      place:"West",
    },
    {
      id: "15",
      name: "Lorena Rice",
      place:"West",
    },
  ];*/




  return (
    <>
      <Provider>
        <View style={stylesheet.TournamentsCont}>



          <Image source={require('/Users/thilivhaliportiaravhutulu/SATTB/player_project/SATableTennisApp/player_project/client/Image/TournamentHeader.png')}
            style={stylesheet.styleTournamentHeader}>

          </Image>

          <AntDesign
            name="arrowleft"
            size={45}
            style={{
              position: 'absolute',
              top: 40,
              left: 15
            }}
            color="rgba(0,0,0,1)"
            onPress={() => navigation.goBack(null)}
          />



        </View>

        <View style={stylesheet.container}>
          <ScrollView>
            {tournamentList.map((val, key) => {
              return (

                <View key={key} style={stylesheet.abc}>
                  <TouchableOpacity style={stylesheet.button}
                  onPress={Info}>
                    <View  >
                      <Text style={stylesheet.item}>{val.tournamentName}</Text>
                    </View>

                    <View>
                      <Text style={stylesheet.rightSide}>{val.tournamentLocation}</Text>
                    </View>
                    <View>
                      <Text style={stylesheet.rightSide}>{val.tournamentDate}</Text>
                    </View>
                    <View>
                      <Text style={stylesheet.rightSide}>{val.tournamentTime}</Text>
                    </View>
                    
                  
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* <View style={stylesheet.mainbox}>
          
          {data.map((l,i) =>(
            <Card key ={i}>
              <Card.Title 
              style={stylesheet.cardbox}
              title={l.tournamentName}
              date={l.tournamentDate}
              location={l.tournamentLocation}
              tournament={l.tournamentTime}
              />   
            </Card>
          ))}
          
          </View>*/}
      </Provider>
    </>


  );
};

export default RegisterButton;

const stylesheet = StyleSheet.create({

  TournamentsCont: {
    position: "absolute",
    width: "100%",
    height: 180,
    borderRadius: 1000,
    right: 0,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" },],
    backgroundColor: "rgba(235,235,235,1)",
    left: 0,
    top: 10,
  },
  styleTournamentHeader: {
    position: "absolute",
    //left: 76,
    top: 40,
    bottom: "auto",
    alignSelf: "center",
    resizeMode: "contain",
    borderRadius: null,
    width: 250,
    height: 120,
  },
  container: {
    flex: 1,
    padding: 50,
    marginTop: 150,
    marginBottom: -50,
    paddingHorizontal:35,
    alignSelf:"stretch",
    

  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    paddingRight: 80,
    textAlign:"left",
    
  },
  abc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    justifyContent:"space-between",
  },
  rightSide: {
    alignItems:"flex-end",
    width: 210,
    opacity: 0.6,
    height:-20,

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'gray',
  },

})
