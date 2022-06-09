import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Bar from "../components/Bar";
import TopSvg from "../components/TopSvg";
import {width} from "../config/Dimension";
import BottomSvg from "../components/BottomSvg";
import {addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc} from "firebase/firestore";
import {auth, db} from "../config/Firebase";
import {getBookRateFromDB, getCommentsFromDb, getUserFromDb, getUserRateFromDB} from "../func/actions";
import {useEffect, useState} from "react";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'


const Book = ({navigation, route}) =>{
    const [defaultRating, setDefaultRating] = useState(0)
    const [necRating, setNecRating] = useState([])
    const [maxRating, setMaxRating] = useState([1,2,3,4,5])
    const [user, setUser] = useState([])
    const [rec, setRec] = useState([])
    const [upd, setUpd] = useState([])
    const [com, setCom] = useState(false)
    const [input, setInput] = useState('')
    const [comments, setComments] = useState([])
    const [comUpd, setComUpd] = useState(false)
    const [file, setFile] = useState(false)

    const getUser = async () =>{
        const user = await getUserFromDb()
        setUser(user)
        const recommendation = user[0]?.rec
        setRec(recommendation)
    }

    const getComments = async () =>{
        const comment = await getCommentsFromDb()
        const bookCom = comment.filter((item) => item.book === route.params?.book.name)
        setComments(bookCom)
    }

    const addComment = async () =>{
        if (input !== ''){
            const comDoc = collection(db, 'comments')
            const comment = {
                "name": user[0]?.fullName,
                'book': route.params?.book.name,
                'comment': input,
                'date': serverTimestamp()
            }
            await addDoc(comDoc,comment)
            setComUpd(!comUpd)
        }else {
            Alert.alert('Ошибка','Вы ничего не ввели...')
        }
    }

    useEffect(()=>{
        getComments().then(()=>console.log('comments'))
    }, [user, comUpd])

    useEffect(()=>{
        getUser().then(()=>console.log('aaa'))
    },[upd])

    const updateGenre = async (genre) =>{
        if (rec.filter((item) => item === genre).length > 0){
            Alert.alert('', 'Нам уже известно, что вам нравится это ^_^')
            return  null
        }else {
            if (rec.length === 3){
                rec.splice(0,1)
                rec.push(genre)
            }else {
                rec.push(genre)
            }
            const users = doc(db, 'users', user[0]?.id.toString())
            await updateDoc(users, {rec: rec})
        }

    }

    const downloadFile = async () =>{
        let url = route.params?.book.file
        let path = url.split('/');
        const file_name = route.params?.book.fileName + '.pdf'
        FileSystem.downloadAsync(
            url,
            FileSystem.documentDirectory + file_name
        )
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
                MediaLibrary.createAssetAsync(uri).then(asset => {
                    console.log('asset', asset);
                    MediaLibrary.createAlbumAsync('myfolder', asset)
                        .then(() => {
                            console.log('a')
                        })
                        .catch(error => {
                            console.log(error)
                        });
                });

            })
            .catch(error => {
                console.error(error);
            });
    }

    const downloadAudio = async () =>{
        let url = route.params?.book.audio
        let path = url.split('/');
        const file_name = route.params?.book.fileName + '.mpeg'
        FileSystem.downloadAsync(
            url,
            FileSystem.documentDirectory + file_name
        )
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
                MediaLibrary.createAssetAsync(uri).then(asset => {
                    console.log('asset', asset);
                    MediaLibrary.createAlbumAsync('myfolder', asset)
                        .then(() => {
                            console.log('a')
                        })
                        .catch(error => {
                            console.log(error)
                        });
                });

            })
            .catch(error => {
                console.error(error);
            });
    }

    const checkRating = async () =>{
        const rate = await getUserRateFromDB(user[0]?.email)
        return rate.filter((item) => item.bookName === route.params?.book.name)

    }

    const deleteRating = async (id) =>{
        const rateDoc = doc(db, 'rating', id)
        await deleteDoc(rateDoc)
    }

    const createRating = async (numb) =>{
        const rateDoc = collection(db, 'rating')
        const rate = {
            'userEmail': auth.currentUser.email,
            'rateNumber': numb,
            'bookName': route.params?.book.name
        }
        await addDoc(rateDoc,rate)
    }

    const setRating = async (numb) =>{
        setDefaultRating(numb)
        const necRate = await checkRating()
        if (necRate.length>0){
            const rate = await checkRating()
            await deleteRating(rate[0]?.id)
            await createRating(numb)
        }else{
            await createRating(numb)
        }
    }

    const getBookRate = async () =>{
        const bookRate = await getBookRateFromDB(route.params?.book.name)
        let countRate = 0
        bookRate.map((item) =>{
            countRate = countRate + item.rateNumber
        })
        const trueRate = countRate / bookRate.length
        setDefaultRating(trueRate)
        console.log(trueRate)
    }


    useEffect(()=>{
        getBookRate().then(()=>console.log('rate'))
    }, [])



    return(

        <>
            <Bar/>
            <SafeAreaView style={styles.container}>
                <TopSvg customStyle={styles.topSvgStyle} h={120} customD={"M0,320L48,304C96,288,192,256,288,218.7C384,181,480,139,576,106.7C672,75,768,53,864,74.7C960,96,1056,160,1152,202.7C1248,245,1344,267,1392,277.3L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"}/>
                <BottomSvg customStyle={styles.bottomSvgStyle} h={20} customD={"M0,32L48,58.7C96,85,192,139,288,186.7C384,235,480,277,576,250.7C672,224,768,128,864,85.3C960,43,1056,53,1152,69.3C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"}/>
                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>{route.params?.book.author}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>{route.params?.book.name}</Text>
                    </View>
                </View>
                <View style={styles.bookContainer}>
                    <View style={styles.imageContainer}>
                        <View style={{
                            width:'100%',
                            height:'10%',
                            marginBottom:10,
                            flexDirection: 'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            marginLeft: 10,
                        }}>
                            <Text style={{fontWeight:'bold'}}>Рейтинг:</Text>
                            <View style={{
                                height:'100%',
                                flexDirection: 'row',
                                alignItems:'center',
                                marginRight: 5,
                            }}>
                                {
                                    maxRating.map((item) => (
                                        defaultRating >= item?
                                            <TouchableOpacity onPress={()=>setRating(item)}>
                                                <AntDesign name="star" size={24} color="#fde910" />
                                            </TouchableOpacity>:
                                            <TouchableOpacity onPress={()=>setRating(item)}>
                                                <AntDesign name="staro" size={24} color="#fde910" />
                                            </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>
                        <Image source={{uri:route.params?.book.img}} style={styles.image}/>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <View style={styles.descriptionBox}>
                            <View style={{width:'100%', marginBottom:5}}>
                                <Text style={{fontWeight:'bold'}}>Описание:</Text>
                            </View>
                            <View style={{height:160}}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Text>{route.params?.book.description}</Text>
                                </ScrollView>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => navigation.navigate('Books') } style={{width:'100%', height:30, borderRadius: 15, marginVertical:5, backgroundColor: '#FB7200', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:16, color:'white'}}>К книгам</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> updateGenre(route.params?.book.genre) } style={{width:'100%', height:30, borderRadius: 15, borderWidth: 2, marginBottom:5, backgroundColor:'black', alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{fontSize:16, color:'white'}}>Понравился жанр!</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ downloadFile } style={{width:'100%', height:30, borderRadius: 15, borderWidth: 2, borderColor: 'black', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:16}}>Читать</Text>
                                </TouchableOpacity>
                                {
                                    route.params?.book.audio?
                                        <TouchableOpacity onPress={ downloadAudio } style={{width:'100%', marginTop:5, height:30, borderRadius: 15, borderWidth: 2, borderColor: 'black', justifyContent:'center', alignItems:'center'}}>
                                            <Text style={{fontSize:16}}>Аудио</Text>
                                        </TouchableOpacity>:
                                        null
                                }

                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>setCom(true)} style={{
                    height:40,
                    position:'absolute',
                    bottom: 0,
                    alignSelf:'center',
                    marginBottom:10,
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: 'white',
                    backgroundColor:'#FB7200'
                }}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold', marginHorizontal:5}}>Оставить комментарий</Text>
                </TouchableOpacity>
                {
                    com?
                        <Animatable.View animation="fadeInUp" style={{
                            position:'absolute',
                            bottom:-5,
                            width:'80%',
                            backgroundColor:'white',
                            height:400,
                            alignSelf:'center',
                            borderTopLeftRadius:40,
                            borderTopRightRadius:40,
                            borderWidth: 2,
                            borderColor: 'black'

                        }}>
                            <View style={{
                                width:'90%',
                                flexDirection: 'row',
                                alignItems:'center',
                                alignSelf:'center',
                                justifyContent:'space-between',
                                height:50,
                                marginTop: 10
                            }}>
                                <TextInput
                                    style={{
                                        height:'100%',
                                        width:'75%',
                                        borderRadius: 20,
                                        borderWidth: 2,
                                        borderColor: 'black',
                                        paddingHorizontal:10,
                                    }}
                                    onChangeText={(text)=>setInput(text)}
                                    placeholder="Введите комментарий..."
                                />
                                <TouchableOpacity onPress={addComment} style={{
                                    width:50,
                                    height:50,
                                    borderRadius: 40,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    backgroundColor:'#FB7200'
                                }}>
                                    <Ionicons name="send" size={20} color="white" />
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                marginVertical: 10,
                                alignSelf:'center',
                                width:'90%',
                                height:270,
                            }}>
                                <ScrollView>
                                    {
                                        comments.map((item)=>(
                                            <Animatable.View animation="lightSpeedIn" style={{
                                                width:'95%',

                                                marginVertical:5,
                                                borderBottomColor:'black',
                                                borderBottomWidth:2
                                            }}>
                                                <Text style={{
                                                    fontWeight:'bold', marginVertical:3
                                                }}>{item.name}:</Text>
                                                <Text style={{
                                                    marginLeft: 10
                                                }}>
                                                    {item.comment}
                                                </Text>
                                            </Animatable.View>
                                        ))
                                    }
                                </ScrollView>

                            </View>
                            <View style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                marginBottom:5
                            }}>
                                <TouchableOpacity  onPress={()=>setCom(false)} style={{
                                    width:40,
                                    height:40,
                                    borderRadius: 40,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    backgroundColor:'#FB7200'
                                }}>
                                    <AntDesign name="close" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>:
                        null
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
        height:200,
        width:width,
    },
    bottomSvgStyle:{
        position:'absolute',
        bottom:0,
        height:200,
        width:width,
    },
    infoContainer:{
        height:130,
        justifyContent:'center',

    },
    infoBox:{
        flex:1,
        marginLeft:20,
        marginVertical:5,

        justifyContent:'center'
    },
    bookContainer:{
        height:400,
        marginTop:50,
        flexDirection:'row',
        alignItems:'center'
    },
    imageContainer:{
        flex:.9,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:"95%",
        height:'70%',
        borderRadius:20,
        borderWidth:2,
        borderColor:'black'
    },
    descriptionContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    descriptionBox:{
        width:'90%',
        height:'80%'
    },
    buttonContainer:{
        flex:1,
        marginVertical:5,
        justifyContent:'center'
    }
})

export default Book
