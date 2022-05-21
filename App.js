import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View , SafeAreaView, TouchableHighlight, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import ModalComponent from './components/ModalComponent';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [showGrade, setShowGrade] = useState(false);
  const [activeTile, setActiveTile] = useState('');
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [schoolData, setSchoolData] = useState([]);

  const getSchools = async () => {
     try {
      const response = await fetch('https://data.cityofnewyork.us/resource/s3k6-pzi2.json');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getGrades = async (DBN) => {
    try {
     const response = await fetch(`https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=${DBN}`);
     const json = await response.json();
     console.log(json)
      json[0]===undefined? setData2(null) : setData2(json[0]);
     
   } catch (error) {
     console.error(error);
   } finally {
     //setLoading(false);
   }
 }

 
  

  useEffect(() => {
    getSchools();
  }, []);

  const showGrades=(school)=>{
    getGrades(school.dbn);
      setShowGrade(!showGrade);
      setActiveTile(school.dbn);
      setSchoolData(school);
    
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 10}}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
        data={data}
        extraData={data2}
        renderItem={({ item, index, separators }) => (
          <View>
          <TouchableHighlight
            style={{padding: 2, borderWidth: 0.2, borderColor:"#ECECEC"}}
            underlayColor="#DDDDDD"
            key={item.key}
            //onPress={() => this._onPress(item)}
            onPress={() => showGrades(item)}

            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            {/* <View style={{ backgroundColor: '#eee' ,alignItems:'center'}}>
              <Text style={{padding:10}}>{item.dbn} : {item.school_name}</Text>
            </View> */}
            <View style={{flexDirection:'row'}}>
              <View style={styles.icon}>
              <Icon
                style={ {textAlign: 'center'} }
                name='ios-bonfire-outline'
                size={ 70}
                color={ "green" }
              />
              </View>
              <View style={styles.info}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={ styles.name }>{item.school_name}</Text>
                <Text style={ styles.location}>{item.city}</Text>
              </View>
              
            </View>
            
          </TouchableHighlight>
          {showGrade && (activeTile===item.dbn) && item!==null&& <Text>{data2.sat_critical_reading_avg_score}</Text>}
          </View>
        )}
        />
      )}
      {/* <ModalComponent
                school={schoolData}
                modalVisible={showGrade}
                onClose={() => setShowGrade(false)}
            /> */}
    </SafeAreaView>
  );
};

const styles= StyleSheet.create({
  icon:{
    backgroundColor : '#eee999',
    color           : '#F5F5F5',
    size            : 40,
    margin          : 15,
    width           : 80,
    height          : 80,
    borderRadius    : 40,
   // borderWidth     : 0.5,
    withBackground  : true,
    withBorder      : false,
    
  },
  info:{
    flex: 0.95,
    justifyContent:'center',
    flexDirection: 'column',
  },
  name:{
    justifyContent :'center',
    //flexWrap       : 'wrap',
    overflow:'hidden',
    //textAlign      : 'center',
    fontWeight     : 'bold',
    fontSize       : 14,
    fontFamily     : undefined,
    paddingBottom  : 8,
    paddingTop     : 8,
    paddingLeft    : 5,
    paddingRight   : 5,
    
  },
  location:{
    justifyContent :'center',
    flexWrap       : 'wrap',
    // textAlign      : 'center',
    //fontWeight     : 'bold',
    fontSize       : 12,
    fontFamily     : undefined,
    paddingBottom  : 3,
    paddingTop     : 3,
    paddingLeft    : 5,
    paddingRight   : 5,
    
  }
})