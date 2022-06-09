import {View, StyleSheet, TextInput, TouchableOpacity, Text, Alert} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'
import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/Firebase";


const ActionSignIn = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () =>{
        if(email && password !== ""){
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log('ssss'))
                .catch((err) => Alert.alert("Ошибка входа!", "Попробуйте еще раз..."));
        }
    }

    return(
        <Animatable.View animation='bounceInLeft' style={styles.container}>
            <View style={styles.section}>
                <View style={styles.icon}>
                    <Ionicons name="mail-outline" size={20} color="gray" />
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Введите почту..."
                        style={styles.textInput}
                        onChangeText={(text)=>setEmail(text)}
                    />
                </View>
            </View>
            <View style={[styles.section,{
                marginTop:15
            }]}>
                <View style={styles.icon}>
                    <Ionicons name="lock-open-outline" size={20} color="gray" />
                </View>
                <View style={styles.input}>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Введите пароль..."
                        style={styles.textInput}
                        onChangeText={(text)=>setPassword(text)}
                    />
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.button_container}>
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:20
    },
    section:{
        flexDirection:'row',
        backgroundColor:'white',
        width:'100%',
        paddingVertical:15,
        paddingHorizontal:10,
        borderRadius:7
    },
    icon:{
        borderRightWidth:1,
        borderRightColor:'gray',
        paddingRight:10
    },
    input:{
        flex:1
    },
    textInput:{
        paddingLeft:10
    },
    bottom:{
        flexDirection:'row',
        marginTop:10
    },
    button_container:{
        flex:1,
        alignItems:'center'
    },
    button:{
        width:140,
        height:40,
        backgroundColor:'#FB7200',
        borderWidth:2,
        borderColor:'white',
        borderRadius:10,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center'
    }

})

export default ActionSignIn
