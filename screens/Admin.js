import {View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, AsyncStorage} from "react-native";
import {getBooksFromDB} from "../func/actions";
import {useEffect, useState} from "react";
import * as Animatable from 'react-native-animatable'
import AdminBookComp from "../components/AdminBookComp";
import TopSvg from "../components/TopSvg";
import {height, width} from "../config/Dimension";
import * as DocumentPicker from 'expo-document-picker';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../config/Firebase";
import {addDoc, collection, doc, updateDoc, deleteDoc} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";




const Admin = () =>{

    const [allBooks, setAllBooks] = useState([])
    const [filteredBook, setFilteredBook] = useState([])
    const [action, setAction] = useState('')
    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [pages, setPages] = useState('')
    const [modal, setModal] = useState(false)
    const [upd, setUpd] = useState(false)
    const [fileName, setFileName] = useState('')



    const getBooks = async () =>{
        const books = await getBooksFromDB()
        setAllBooks(books)

    }

    useEffect(()=>{
        getBooks().then(()=>console.log('aaa'))

    }, [modal, upd])

    const chooseBook = async () =>{
        setAction('Добавить')
    }

    const getFile = async () =>{
        const result = await DocumentPicker.getDocumentAsync({});
        setFile(result.uri)
        const filterBooks = allBooks.filter((item) => item.name === name)
        setFilteredBook(filterBooks)
        console.log(filterBooks)

    }

    const getAudio = async () =>{
        const result = await DocumentPicker.getDocumentAsync({});
        setFile(result.uri)
        const filterBooks = allBooks.filter((item) => item.name === name)
        setFilteredBook(filterBooks)
        console.log(filterBooks)

    }

    const getImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if (!result.cancelled){
            setImage(result.uri)
        }

    }

    const subAudio = async () =>{
        const lastName = new Date().getTime() + 'audioFile' + Math.random() * 100
        const imgR = ref(storage, lastName)
        const img = await fetch(file)
        const bytes = await img.blob()
        const uploadTask = uploadBytesResumable(imgR, bytes)

        uploadTask.on('state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                }
            },
            (error)=>{

            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                    const userDoc = doc(db, 'books', filteredBook[0]?.id)
                    const newField = {audio: downloadURL}
                    await updateDoc(userDoc, newField)
                    setFile(null)


                })
            })
    }

    const subFile = async () =>{
        const lastName = new Date().getTime() + 'bookFile' + Math.random() * 100
        const imgR = ref(storage, lastName)
        const img = await fetch(file)
        const bytes = await img.blob()
        const uploadTask = uploadBytesResumable(imgR, bytes)

        uploadTask.on('state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                }
            },
            (error)=>{

            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                    const userDoc = doc(db, 'books', filteredBook[0]?.id)
                    const newField = {file: downloadURL}
                    await updateDoc(userDoc, newField)
                    setFile(null)


                })
            })
    }

    const subPic = async () =>{
        const lastName = new Date().getTime() + 'image' + Math.random() * 100
        const imgR = ref(storage, lastName)
        const img = await fetch(image)
        const bytes = await img.blob()
        const uploadTask = uploadBytesResumable(imgR, bytes)

        uploadTask.on('state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                }
            },
            (error)=>{

            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    const bookDoc = collection(db, 'books')
                    const book = {
                        "name": name,
                        'description':description,
                        'author':author,
                        'img': downloadURL,
                        'fileName': fileName,
                        'genre': genre,
                        'pages': pages
                    }
                    await addDoc(bookDoc,book)
                    setImage(null)
                    setModal(true)



                })
            })
    }

    const handleClean = () =>{
        setName('')
        setDescription('')
        setAuthor('')
        setImageUrl('')
        setFileUrl('')
        setGenre('')
        setPages('')
        setAction('')

    }

    const deleteBook = async (id) =>{
        const bookDoc = doc(db, 'books', id)
        await deleteDoc(bookDoc)
        setUpd(!upd)
    }

    return(
        <View style={styles.container}>
            <TopSvg customStyle={styles.topSvgStyle} h={120} customD={"M0,160L60,133.3C120,107,240,53,360,80C480,107,600,213,720,240C840,267,960,213,1080,202.7C1200,192,1320,224,1380,240L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"}/>
            <View style={{
                height: 150,
                justifyContent:'center',
                alignItems:'center'
            }}>
                {
                    action === ''?
                        <TouchableOpacity onPress={chooseBook} style={{
                            height:50,
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'#FB7200',
                            borderWidth:2,
                            borderRadius:20,
                            borderColor:'white'
                        }}>
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                marginHorizontal: 10
                            }}>Добавить</Text>
                        </TouchableOpacity>:
                        <TouchableOpacity onPress={handleClean} style={{
                            height:50,
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'#FB7200',
                            borderWidth:2,
                            borderRadius:20,
                            borderColor:'white'
                        }}>
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                marginHorizontal: 10
                            }}>К книгам</Text>
                        </TouchableOpacity>
                }
            </View>
            {
                action ===  ''?
                    <Animatable.View animation='bounceInLeft' style={styles.booksContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                allBooks.map(( item ) => (
                                    allBooks.length>0?
                                        <AdminBookComp book={item} deleteBook={deleteBook} chooseBook={chooseBook}/>:
                                        null
                                ))
                            }
                        </ScrollView>
                    </Animatable.View>:
                        <Animatable.View animation='bounceInRight' style={styles.booksContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{
                                    height:50,
                                    marginBottom:10,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    marginTop:10
                                }}>
                                    <TextInput
                                        style={{
                                            paddingHorizontal:10,
                                            height:50,
                                            width:'80%',
                                            borderRadius:10,
                                            borderWidth:2,
                                            borderColor:'black'
                                        }}
                                        onChangeText={(text)=>setName(text)}
                                        placeholder='Введите название'
                                    />
                                </View>
                                <View style={{
                                    height:50,
                                    marginBottom:10,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <TextInput
                                        style={{
                                            paddingHorizontal:10,
                                            height:50,
                                            width:'80%',
                                            borderRadius:10,
                                            borderWidth:2,
                                            borderColor:'black'
                                        }}
                                        onChangeText={(text)=>setDescription(text)}
                                        placeholder='Введите описание'
                                    />
                                </View>
                                <View style={{
                                    height:50,
                                    marginBottom:10,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <TextInput
                                        style={{
                                            paddingHorizontal:10,
                                            height:50,
                                            width:'80%',
                                            borderRadius:10,
                                            borderWidth:2,
                                            borderColor:'black'
                                        }}
                                        onChangeText={(text)=>setGenre(text)}
                                        placeholder='Введите жанр'
                                    />
                                </View>
                                <View style={{
                                    height:50,
                                    marginBottom:10,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <TextInput
                                        style={{
                                            paddingHorizontal:10,
                                            height:50,
                                            width:'80%',
                                            borderRadius:10,
                                            borderWidth:2,
                                            borderColor:'black'
                                        }}
                                        onChangeText={(text)=>setFileName(text)}
                                        placeholder='Введите название файла'
                                    />
                                </View>
                                <View style={{
                                    height:50,
                                    marginBottom:10,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        height:50,
                                        width:'80%',
                                        flexDirection:'row',
                                    }}>
                                        <TouchableOpacity onPress={getImage} style={{
                                            height:50,
                                            borderRadius:40,
                                            justifyContent:'center',
                                            alignItems:'center',
                                            marginRight:10,
                                            backgroundColor:'#FB7200'
                                        }}>
                                            <Text style={{
                                                color:'white',
                                                fontWeight:'bold',
                                                marginHorizontal: 10
                                            }}>Изображение</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{
                                    height:50,
                                    marginBottom:10,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <TextInput
                                        style={{
                                            paddingHorizontal:10,
                                            height:50,
                                            width:'80%',
                                            borderRadius:10,
                                            borderWidth:2,
                                            borderColor:'black'
                                        }}
                                        onChangeText={(text)=>setAuthor(text)}
                                        placeholder='Введите автора'
                                    />
                                </View>
                                <View style={{
                                    height:50,
                                    marginBottom:10,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <TextInput
                                        style={{
                                            paddingHorizontal:10,
                                            height:50,
                                            width:'80%',
                                            borderRadius:10,
                                            borderWidth:2,
                                            borderColor:'black'
                                        }}
                                        onChangeText={(text)=>setPages(text)}
                                        placeholder='Введите кол-во страниц'
                                    />
                                </View>
                                <View style={{
                                    height:50,
                                    marginBottom:10,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <TouchableOpacity onPress={subPic} style={{
                                        height:50,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        backgroundColor:'#FB7200',
                                        borderWidth:2,
                                        borderRadius:20,
                                        borderColor:'white'
                                    }}>
                                        <Text style={{
                                            color:'white',
                                            fontWeight:'bold',
                                            marginHorizontal: 10
                                        }}>Добавить</Text>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        </Animatable.View>
            }
            {
                modal?
                    <Animatable.View animation="fadeInUp" style={{
                        position:'absolute',
                        bottom:-5,
                        width:'80%',
                        backgroundColor:'white',
                        height:250,
                        alignSelf:'center',
                        borderTopLeftRadius:40,
                        borderTopRightRadius:40,
                        borderWidth: 2,
                        borderColor: 'black'

                    }}>
                        <View style={{
                            marginVertical: 10,
                            alignSelf:'center',
                            flex:1,

                        }}>
                            <View style={{
                                height:50,
                                justifyContent:'center',
                                alignItems:'center'
                            }}>
                                <Text>Выберите файл для книги!</Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center'
                            }}>

                                <View style={{
                                    height:40,
                                    marginBottom:10,
                                    width:'60%',
                                    justifyContent:'space-between',
                                    flexDirection:'row'
                                }}>
                                    <TouchableOpacity  onPress={getFile} style={{
                                        height:40,
                                        width:100,
                                        borderRadius: 20,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        backgroundColor:'#FB7200'
                                    }}>
                                        <Text style={{
                                            color:'white',
                                            fontWeight:'bold'
                                        }}>pdf</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={subFile} style={{
                                        height:40,
                                        width:40,
                                        borderRadius:40,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        backgroundColor:'#FB7200'
                                    }}>
                                        <Feather name="check" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    height:40,
                                    marginBottom:10,
                                    width:'60%',
                                    justifyContent:'space-between',
                                    flexDirection:'row'
                                }}>
                                    <TouchableOpacity  onPress={getAudio} style={{
                                        height:40,
                                        width:100,
                                        borderRadius: 20,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        backgroundColor:'#FB7200'
                                    }}>
                                        <Text style={{
                                            color:'white',
                                            fontWeight:'bold'
                                        }}>Аудио</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={subAudio} style={{
                                        height:40,
                                        width:40,
                                        borderRadius:40,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        backgroundColor:'#FB7200'
                                    }}>
                                        <Feather name="check" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                        <View style={{
                            height:50,
                            justifyContent:'center',
                            alignItems:'center',
                            marginBottom:5
                        }}>
                            <TouchableOpacity  onPress={()=>setModal(false)} style={{
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
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    topSvgStyle:{
        position:'absolute',
        top:0,
        height:200,
        width:width,
    },
    booksContainer:{
        flex:1,
        marginVertical:40,
        marginHorizontal:10,

    }
})

export default Admin
