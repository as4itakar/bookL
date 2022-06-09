import {View,Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import {Card} from "react-native-shadow-cards";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'
import {db} from "../config/Firebase";
import {addDoc, doc, updateDoc} from "firebase/firestore";
import {useEffect, useLayoutEffect, useState} from "react";

const BookComp = ({book, navigation, user, upd, setUpd, likes, setLikes, rec, setRec}) =>{

    const updateLikes = async (name) =>{
        likes.push(name)
        const users = doc(db, 'users', user[0]?.id.toString())
        await updateDoc(users, {likes: likes})
        setUpd(!upd)
        console.log(likes)


    }

    const deleteLike = async (name) =>{
        const delLike = likes.filter((item) => item !== name)
        const users = doc(db, 'users', user[0]?.id.toString())
        await updateDoc(users, {likes: delLike})
        setUpd(!upd)
        console.log(delLike)


    }

    return(
        <Animatable.View animation="fadeInLeft" style={{width:'80%', height:200,marginVertical:5,
            alignSelf:'center',}}>
            <TouchableOpacity activeOpacity={10} onPress={()=>navigation.navigate('Book', {book, rec, setRec})} style={{width:'100%', height:"100%"}}>
                <Card style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri:book.img}}
                            style={styles.image}/>
                        <Card style={styles.pagesBox}>
                            <Text>{book.pages} стр.</Text>
                        </Card>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoBox}>
                            <View style={{flex:1,justifyContent:'center'}}>
                                <Text>{book.name}</Text>
                                <Text>{book.author}</Text>
                            </View>
                            <View style={{height:'100%', width:50, justifyContent: 'center', alignItems: 'center'}}>
                                {
                                    likes.filter((item)=> item === book.name).length >0?
                                        <TouchableOpacity onPress={()=>deleteLike(book.name, book.genre)} style={{height:40, width:40, justifyContent: 'center', alignItems: 'center'}}>
                                            <AntDesign name="heart" size={24} color="red" />
                                        </TouchableOpacity>:
                                        <TouchableOpacity onPress={()=>updateLikes(book.name)} style={{height:40, width:40, justifyContent: 'center', alignItems: 'center'}}>
                                            <Ionicons name="heart-outline" size={24} color="black" />
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        borderRadius:20
    },
    imageContainer:{
        height:150,
        borderBottomColor:'black',
        borderBottomWidth:2
    },
    image:{
        width:'100%',
        height:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,


    },
    pagesBox:{
        width:80,
        height:40,
        position:'absolute',
        top:0,
        right:0,
        marginVertical:10,
        marginRight:10,
        justifyContent:'center',
        alignItems:'center'
    },
    infoContainer:{
        height:50,
    },
    infoBox:{
        flex:1,
        marginHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between'
    }
})

export default BookComp
