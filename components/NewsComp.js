import {View, Image, TouchableOpacity, StyleSheet, Text} from "react-native";
import {Card} from "react-native-shadow-cards";
import * as Animatable from 'react-native-animatable'

const NewsComp = ({n}) =>{

    return(
        <Animatable.View animation='lightSpeedIn' style={styles.container}>
            <TouchableOpacity style={{width:'100%', height:'100%'}}>
                <Card style={styles.card}>
                    <Image source={{uri: n?.img}} style={styles.image}/>
                    <View style={styles.infoContainer}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{marginLeft:5, color:'white'}}>{n?.name}</Text>
                        </View>
                        <View style={{flex:.4, justifyContent: 'center', alignItems:'flex-end'}}>
                            <Text style={{marginRight:5, color:'white'}}>{n?.day}.{n?.month}.{n?.year}</Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'80%',
        height:200,
        marginVertical:5,
        alignSelf:'center',
    },
    card:{
        width:"100%",
        height:"100%",
        borderRadius:20
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:20
    },
    infoContainer:{
        position:'absolute',
        alignSelf:'center',
        height:50,
        width:'100%',
        zIndex:30,
        top:0,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'rgba(0,0,0,.4)',
        flexDirection:'row',
        justifyContent:'center'
    }
})

export default NewsComp
