import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image} from "react-native";
import Bar from "../components/Bar";
import TopSvg from "../components/TopSvg";
import {width} from "../config/Dimension";
import {useEffect, useState} from "react";
import BookComp from "../components/BookComp";
import UserInfoComp from "../components/UserInfoComp";
import UserInfoContainer from "../components/UserInfoContainer";
import {getBooksFromDB, getUserFromDb} from "../func/actions";
import BookLikesComp from "../components/BookLikesComp";
import ScrollLikes from "../components/ScrollLikes";
import ScrollRec from "../components/ScrollRec";


const Profile = ({navigation}) =>{

    const [button, setButton] = useState('like')
    const [allBooks, setAllBooks] = useState([])
    const [user, setUser] = useState([])
    const [likes, setLikes] = useState([])
    const [rec, setRec] = useState([])


    const getBooks = async () =>{
        const books = await getBooksFromDB()
        setAllBooks(books)

    }

    const getUsers = async () =>{
        const user = await getUserFromDb()
        setUser(user)
        const like = user[0]?.likes
        const recommendation = user[0]?.rec
        setLikes(like)
        setRec(recommendation)

    }

    useEffect(()=>{
        getUsers().then(()=>console.log('user'))
    }, [button])

    useEffect(()=>{
        getBooks().then(()=>console.log('books'))
    }, [user])

    return(
        <>
            <Bar/>
            <SafeAreaView style={styles.container}>
                <TopSvg customStyle={styles.topSvgStyle} h={200} customD={"M0,32L48,74.7C96,117,192,203,288,245.3C384,288,480,288,576,256C672,224,768,160,864,128C960,96,1056,96,1152,101.3C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"}/>
                <View style={styles.infoContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{uri:user[0]?.img}}
                        />
                    </View>
                    <UserInfoContainer user={user}/>

                </View>
                <View style={styles.chooseContainer}>

                    {
                        button === "like"?
                            <TouchableOpacity onPress={() => setButton('like')} style={styles.chosenButton}>
                                <Text style={{marginHorizontal:10, color:'white'}}>Понравившиеся</Text>
                            </TouchableOpacity>:
                            <TouchableOpacity onPress={() => setButton('like')} style={styles.Button}>
                                <Text style={{marginHorizontal:10, color:'black'}}>Понравившиеся</Text>
                            </TouchableOpacity>
                    }
                    {
                        button === "rec"?
                            <TouchableOpacity onPress={() => setButton('rec')} style={styles.chosenButton}>
                                <Text style={{marginHorizontal:10, color:'white'}}>Рекомендации</Text>
                            </TouchableOpacity>:
                            <TouchableOpacity onPress={() => setButton('rec')} style={styles.Button}>
                                <Text style={{marginHorizontal:10, color:'black'}}>Рекомендации</Text>
                            </TouchableOpacity>
                    }

                </View>
                {
                    button === 'like'?
                        <ScrollLikes likes={likes} allBooks={allBooks} navigation={navigation}/>:
                        <ScrollRec rec={rec} allBooks={allBooks} navigation={navigation}/>
                }
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative'
    },
    topSvgStyle:{
        position:'absolute',
        top:0,
        width:width,
    },
    infoContainer:{
        height:200,
        flexDirection: 'row',
    },
    imageContainer:{
        flex:.6,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:'80%',
        height:'80%',
        borderRadius:15,
        borderWidth:2,
        borderColor:'white'
    },
    chooseContainer:{
        height:50,
        marginTop:80,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Button:{
        height:'100%',
        borderRadius:20,
        borderColor:"#FB7200",
        borderWidth:2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:5
    },
    chosenButton:{
        height:'100%',
        borderRadius:20,
        borderColor:"#FB7200",
        borderWidth:2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:5,
        backgroundColor:'#FB7200',
    },
    booksContainer:{
        height:300,
        marginTop: 20,
    }

})

export default Profile
