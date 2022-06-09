import {View, StyleSheet, Text, Image} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";

const UserInfoComp = ({user}) =>{
    return(
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <FontAwesome5 style={{color:'white', marginRight: 5}} name="user" size={20} color="black" />
                <Text style={{color:'white', fontSize:16}}>{user[0]?.fullName}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri:user[0]?.img}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    userInfo:{
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginRight:10,
        justifyContent:'flex-start'
    },
    imageContainer:{
        height:45,
        width:45,
        alignSelf:'center',
        justifyContent:'flex-end'
    },
    image:{
        height:'100%',
        width:'100%',
        borderRadius:40,
        borderWidth:2,
        borderColor:'white'
    }

})

export default UserInfoComp
