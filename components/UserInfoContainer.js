import {View, Text, StyleSheet} from "react-native";
import {Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";

const UserInfoContainer = ({user}) =>{
    return(
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.pointBox}>
                    <Feather style={styles.icon} name="user" size={22} color="white" />
                    <Text style={styles.text}>{user[0]?.fullName}</Text>
                </View>
                <View style={styles.pointBox}>
                    <Ionicons style={styles.icon} name="ios-mail-outline" size={22} color="white" />
                    <Text style={styles.text}>{user[0]?.email}</Text>
                </View>
                <View style={styles.pointBox}>
                    <MaterialIcons style={styles.icon} name="date-range" size={22} color="white" />
                    <Text style={styles.text}>{user[0]?.birth}</Text>
                </View>
                <View style={styles.pointBox}>
                    <Ionicons style={styles.icon} name="location-outline" size={22} color="white" />
                    <Text style={styles.text}>{user[0]?.country}, {user[0]?.city}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    infoContainer:{
        width:'90%',
        height:'90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pointBox:{
        height: 30,
        width: "100%",
        flexDirection:'row',
        alignItems:'center'
    },
    text:{
        color:'white'
    },
    icon:{
        marginRight:5
    }
})

export default UserInfoContainer
