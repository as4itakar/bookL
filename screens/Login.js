import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity} from "react-native";
import Bar from "../components/Bar";
import ActionSignIn from "../components/ActionSignIn";
import ActionSignUp from "../components/ActionSignUp";
import {useState} from "react";
import {width} from "../config/Dimension";
import {FontAwesome} from "@expo/vector-icons";
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from "react-native-reanimated";

const Login = () =>{

    const [enable, setEnable] = useState(true)


    return(
        <>
            <Bar/>
            <SafeAreaView style={styles.container}>
                <Animated.View style={[styles.header, {height: enable? 400: 200, width:'100%'}]}>
                    <View style={styles.logo}>
                        <Image
                            resizeMode={"stretch"}
                            style={{width:'100%',height:'100%', borderBottomLeftRadius:200,
                                borderBottomRightRadius:200}}
                            source={{uri:'https://i.pinimg.com/originals/57/d7/f8/57d7f80100000741ecfa3a39eab39a0a.jpg'}}/>
                    </View>
                    <View style={styles.tabbar}>
                        <View style={styles.box}>
                            <TouchableOpacity onPress={() => setEnable(true)} style={[styles.item, {backgroundColor:enable?'#FB7200':'white', borderBottomLeftRadius:30, borderTopLeftRadius:30}]}>
                                <FontAwesome name="sign-in" size={30} color={enable? 'white' : 'black'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setEnable(false)} style={[styles.item, {borderBottomRightRadius:30, borderTopRightRadius:30, backgroundColor:enable?'white':'#FB7200'}]}>
                                <FontAwesome name="registered" size={30} color={enable? 'black' : 'white'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
                {
                    enable?
                        <ActionSignIn/>
                        :
                        <ActionSignUp/>
                }
            </SafeAreaView>
        </>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FB7200'
    },
    header:{
        paddingHorizontal:20
    },
    logo:{
        flex:1,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:1,
        shadowRadius:2.62,
        elevation:4,
        borderBottomLeftRadius:200,
        borderBottomRightRadius:200,
    },
    tabbar:{
        position:'absolute',
        bottom:0,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        width:width
    },
    box:{
        width:"50%",
        height:70,
        borderRadius:30,
        elevation:10,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#f2f2f2',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.7,
        shadowRadius:2.62,
        flexDirection:'row',
    },
    item:{
        width:"51%",
        height:70,
        justifyContent:'center',
        alignItems:'center',
    }

})

export default Login

