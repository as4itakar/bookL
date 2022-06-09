import {View,Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import {Card} from "react-native-shadow-cards";



const BookLikesComp = ({book, navigation, likes}) =>{

    if (likes.filter((item) => item === book.name).length>0){
        return(
            <View style={{width:'80%', height:200,marginVertical:5,
                alignSelf:'center',}}>
                <TouchableOpacity activeOpacity={10} onPress={()=>navigation.navigate('Book', {book})} style={{width:'100%', height:"100%"}}>
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
                                </View>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }else {
        return null
    }
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

export default BookLikesComp
