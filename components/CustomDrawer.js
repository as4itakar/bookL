import {View, StyleSheet,Image, TouchableOpacity, Text} from "react-native";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {auth} from "../config/Firebase";
import {signOut} from 'firebase/auth'
import {getUserFromDb} from "../func/actions";

import {useEffect, useState} from "react";

const CustomDrawer = (props) =>{

    const [user, setUser] = useState([])

    const getUsers = async () =>{
        const user = await getUserFromDb()
        setUser(user)
    }

    useEffect(()=>{
        getUsers().then(()=>console.log('user'))
    }, [])

    const handleSignOut = () =>{
        signOut(auth).catch(error => console.log(error))
    }

    return(
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#FB7200'}}>
                <View style={styles.userInfo}>
                    <Image style={styles.image} source={{uri:user[0]?.img}}/>
                    <Text style={{fontSize:16, color:'white', marginLeft: 10, marginTop:5}}>{user[0]?.email}</Text>
                </View>
                <View style={styles.itemList}>
                    <DrawerItemList {...props}/>
                </View>
            </DrawerContentScrollView>
            <View style={styles.signOutContainer}>
                <TouchableOpacity  onPress={handleSignOut} style={styles.signOutButton}>
                    <Text style={{color:'white', fontSize:16}}>Выйти</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    userInfo:{
        width:'100%',
        height:150,
        justifyContent:'center',
        backgroundColor:'#FB7200',
        borderBottomLeftRadius:20
    },
    image:{
        height:50,
        width:50,
        borderRadius:40,
        marginLeft:10,
        borderWidth:2,
        borderColor:'white'
    },
    itemList:{
        flex:1,
        backgroundColor:'white',
        paddingTop:10
    },
    signOutContainer:{
        height:50,
        justifyContent:'center',
    },
    signOutButton:{
        height:'80%',
        borderRadius:10,
        backgroundColor:'#FB7200',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10
    }
})

export default CustomDrawer
