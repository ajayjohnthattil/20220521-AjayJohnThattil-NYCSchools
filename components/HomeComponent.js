import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View , SafeAreaView, TouchableHighlight, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const HomeComponent = () => {


    // useState hooks

    const [isLoading, setLoading] = useState(true);
    const [isGradeLoading, setGradeLoading] = useState(true);
    const [activeTile, setActiveTile] = useState('');
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
  

    // Methods to fetch data from APIs

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
        setGradeLoading(true);
        try {
          
            const response = await fetch(`https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=${DBN}`);
            const json = await response.json();
            console.log(json)
            setData2(json[0]);
        } catch (error) {
            console.error(error);
        } finally {
            setGradeLoading(false);
        }
   }
  
   // useEffect hooks

    useEffect(() => {
      getSchools();
    }, []);

    useEffect(() => {
        if(activeTile)
            getGrades(activeTile);
      }, [activeTile]);
  
      
    // Handling Clicks

    const showGrades=(school)=>{
       setData2(null);
       activeTile===school.dbn?setActiveTile(null):
        setActiveTile(school.dbn);
      
    }
    // component  JSX

    return (
      <View style={{ flex: 1, padding: 10, justifyContent:'center'}}>
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
                    onPress={() => {showGrades(item);}}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
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
            
                {activeTile===item.dbn && 
                    <View style={{height:60,backgroundColor:"#4F7942", padding:5, alignContent:"center"}}>
                        <View style={{flexDirection:'row', justifyContent:'center' , alignItems:"stretch", paddingRight:5}}>
                        <Icon
                            style={styles.smallIcon}
                            name='book-outline'
                            size={30}
                            color={ "red" }
                        />
                        <Text style={styles.scoreText}>
                            {isGradeLoading?
                                <ActivityIndicator/>
                                :data2?.sat_critical_reading_avg_score }
                        </Text>
                        <Icon
                            style={styles.smallIcon}
                            name='ios-bonfire-outline'
                            size={30}
                            color={ "red" }
                        />
                        <Text style={styles.scoreText}>
                            {isGradeLoading?
                                <ActivityIndicator/>
                                :data2?.sat_math_avg_score }
                        </Text>
                        <Icon
                            style={styles.smallIcon}
                            name='reader-outline'
                            size={30}
                            color={ "red" }
                        />
                        <Text style={styles.scoreText}>
                            {isGradeLoading?
                                <ActivityIndicator/>
                                :data2?.sat_writing_avg_score }
                        </Text>
                        </View>
                    </View>
                }
                </View>
            )}
            />
        )}
      </View>
    );
};

export default HomeComponent;


// CSS stylesheet code
// ideally i would have liked to get all the inline CSS into this stylesheet
// also overhaul the CSS styling in the whole

const styles= StyleSheet.create({
    icon:{
      backgroundColor : '#eee999',
      color           : '#F5F5F5',
      size            : 40,
      margin          : 15,
      width           : 80,
      height          : 80,
      borderRadius    : 40,
    },
    smallIcon:{
        color           : '#F5F5F5',
        textAlign       : 'center',
        margin          : 5,
        width           : 40,
        height          : 40,
        borderRadius    : 20,
      },
    scoreText:{
        
        fontSize        : 30,
        flex            : 1,
        color           : "white",

    },
    info:{
      flex: 0.95,
      justifyContent :'center',
      flexDirection  : 'column',
    },
    name:{
      justifyContent :'center',
      overflow       :'hidden',
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
      fontSize       : 12,
      fontFamily     : undefined,
      paddingBottom  : 3,
      paddingTop     : 3,
      paddingLeft    : 5,
      paddingRight   : 5,
      
    }
  });