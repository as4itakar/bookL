import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import * as Animatable from 'react-native-animatable'
import BooksRecComp from "./BooksRecComp";
import {Ionicons} from "@expo/vector-icons";


const ScrollRec = ({allBooks, navigation, rec}) =>{
    return(
        <Animatable.View animation='bounceInLeft' style={styles.booksContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={{width:50, height:50, alignSelf:'center', marginVertical:10, borderRadius:40, backgroundColor:'#FB7200', justifyContent:'center', alignItems:'center'}}>
                    <Ionicons name="reload" size={24} color="white" />
                </TouchableOpacity>
                {
                    allBooks.map(( item ) => (

                        <BooksRecComp key={item.id} book={item} navigation={navigation} rec={rec}/>

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

export default ScrollRec

