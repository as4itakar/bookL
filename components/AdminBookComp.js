import {View,Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import {Card} from "react-native-shadow-cards";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'


const AdminBookComp = ({book, chooseBook, deleteBook}) =>{

    return(
        <Animatable.View animation="fadeInLeft" style={{width:'80%', height:200,marginVertical:5,
            alignSelf:'center',}}>
            <TouchableOpacity activeOpacity={10} style={{width:'100%', height:"100%"}}>
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
                            <TouchableOpacity onPress={()=>deleteBook(book.id)} style={styles.but}>
                                <AntDesign name="delete" size={24} color="white" />
                            </TouchableOpacity>
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
        position:'absolute',
        right:0,
        height:'100%',
        flexDirection:'row',
        alignItems:'center'
    },
    but:{
        width:40,
        height:40,
        borderRadius:40,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:'#FB7200',
        marginHorizontal:5,
    }
})

export default AdminBookComp
