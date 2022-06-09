import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import BookLikesComp from "./BookLikesComp";
import * as Animatable from 'react-native-animatable'
import {Ionicons} from "@expo/vector-icons";

const ScrollLikes = ({allBooks, navigation, likes}) =>{
    return(
        <Animatable.View animation='bounceInRight' style={styles.booksContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={{width:50, height:50, alignSelf:'center', marginVertical:10, borderRadius:40, backgroundColor:'#FB7200', justifyContent:'center', alignItems:'center'}}>
                    <Ionicons name="reload" size={24} color="white" />
                </TouchableOpacity>
                {
                    allBooks.map(( item ) => (

                        <BookLikesComp key={item.id} book={item} navigation={navigation} likes={likes}/>

                    ))
                }
            </ScrollView>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    booksContainer:{
        height:300,
        marginTop: 20,
    }
})

export default ScrollLikes
