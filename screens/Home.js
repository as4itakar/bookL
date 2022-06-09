import {View,ScrollView, TextInput, Text, TouchableOpacity, SafeAreaView, StyleSheet} from "react-native";
import TopSvg from "../components/TopSvg";
import {height, width} from "../config/Dimension";
import Bar from "../components/Bar";
import {AntDesign, Feather} from "@expo/vector-icons";
import CategoriesComp from "../components/CategoriesComp";
import {useEffect, useState} from "react";
import UserInfoComp from "../components/UserInfoComp";
import BookComp from "../components/BookComp";
import {getBooksFromDB, getUserFromDb} from "../func/actions";


const Home = ({navigation}) =>{
    const [search, setSearch] = useState('')
    const [searchCat, setSearchCat] = useState('Название')
    const [modal, setModal] = useState(false)
    const [category, setCategory] = useState("Все")
    const [allBooks, setAllBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [user, setUser] = useState([])
    const [upd, setUpd] = useState(false)
    const [likes, setLikes] = useState([])
    const [rec, setRec] = useState([])

    const getBooks = async () =>{
        const books = await getBooksFromDB()
        setAllBooks(books)
        setFilteredBooks(books)
    }

    useEffect(()=>{
        getBooks().then(()=>console.log('aaa'))
    }, [])

    useEffect(()=>{
        if (category === "Все"){
            setFilteredBooks(allBooks)

        }else {
            const filter = allBooks.filter((item)=>item.genre === category)
            setFilteredBooks(filter)

        }
    },[category])

    const getUsers = async () =>{
        const user = await getUserFromDb()
        setUser(user)
        const like = user[0]?.likes
        const recommendation = user[0]?.rec
        setLikes(like)
        setRec(recommendation)
        console.log(rec)



    }

    useEffect(()=>{
        getUsers().then(()=>console.log('aaa'))
    },[upd])

    const handleNameSearch = (text) =>{
        setSearch(text)
        if (text){
            if (category === "Все"){
                const newData = allBooks.filter(item => {
                    const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
                    const textData = text.toUpperCase()
                    return itemData.indexOf(textData) > -1
                })

                setFilteredBooks(newData)
            }else {
                const data = allBooks.filter((item) => item.genre === category)
                const newData = data.filter(item => {
                    const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
                    const textData = text.toUpperCase()
                    return itemData.indexOf(textData) > -1
                })

                setFilteredBooks(newData)
            }
        }else {
            if (category === "Все"){
                setFilteredBooks(allBooks)

            }else {
                const filter = allBooks.filter((item)=>item.genre === category)
                setFilteredBooks(filter)

            }
        }
    }

    const handleAuthorSearch = (text) =>{
        setSearch(text)
        if (text){
            if (category === "Все"){
                const newData = allBooks.filter(item => {
                    const itemData = item.author ? item.author.toUpperCase() : ''.toUpperCase()
                    const textData = text.toUpperCase()
                    return itemData.indexOf(textData) > -1
                })

                setFilteredBooks(newData)
            }else {
                const data = allBooks.filter((item) => item.genre === category)
                const newData = data.filter(item => {
                    const itemData = item.author ? item.author.toUpperCase() : ''.toUpperCase()
                    const textData = text.toUpperCase()
                    return itemData.indexOf(textData) > -1
                })

                setFilteredBooks(newData)
            }
        }else {
            if (category === "Все"){
                setFilteredBooks(allBooks)

            }else {
                const filter = allBooks.filter((item)=>item.genre === category)
                setFilteredBooks(filter)

            }
        }
    }

    const chooseCat = (cat) =>{
        setSearchCat(cat)
        setModal(false)
    }

    return(
        <>
            <Bar/>
            <SafeAreaView style={styles.container}>
                <TopSvg customStyle={styles.topSvgStyle} h={200} customD={"M0,160L60,133.3C120,107,240,53,360,80C480,107,600,213,720,240C840,267,960,213,1080,202.7C1200,192,1320,224,1380,240L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"}/>
                <View style={styles.topContainer}>
                    <View style={styles.boxHeader}>
                        <View style={styles.boxHeaderTop}>
                            <UserInfoComp user={user}/>
                        </View>
                        <View style={styles.boxHeaderBottom}>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputBox}>
                                    {
                                        searchCat === 'Название' &&
                                        <TextInput
                                            style={styles.input}
                                            placeholder="По названию книги..."
                                            placeholderTextColor="black"
                                            onChangeText={(text)=>handleNameSearch(text)}
                                        />
                                    }
                                    {
                                        searchCat === 'Автор' &&
                                        <TextInput
                                            style={styles.input}
                                            placeholder="По автору книги..."
                                            placeholderTextColor="black"
                                            onChangeText={(text)=>handleAuthorSearch(text)}
                                        />
                                    }
                                    <TouchableOpacity style={styles.searchButton}>
                                        <Feather name="search" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    height:'80%',
                                    width:'30%',}}>
                                    <TouchableOpacity activeOpacity={10} onPress={()=>setModal(!modal)} style={styles.genreButton}>
                                        <Text style={{fontSize: 16, marginLeft:8}}>Название</Text>
                                        <AntDesign style={{marginRight:8}} name="downcircleo" size={20} color="black" />
                                    </TouchableOpacity>
                                    {
                                        modal?
                                            <View style={{
                                                width:'100%',
                                                height:100,
                                                position:'absolute',
                                                bottom:-80,
                                                zIndex:20,
                                                backgroundColor:'white',
                                                borderBottomLeftRadius:20,
                                                borderBottomRightRadius: 20,
                                                justifyContent:'center',
                                                alignItems:'center'
                                            }}>
                                                {
                                                    searchCat === 'Название'?
                                                        <TouchableOpacity onPress={()=>chooseCat('Название')} style={styles.chosenSearchCat}>
                                                            <Text style={{color: 'white'}}>Название</Text>
                                                        </TouchableOpacity>:
                                                        <TouchableOpacity onPress={()=>chooseCat('Название')} style={styles.searchCat}>
                                                            <Text>Название</Text>
                                                        </TouchableOpacity>
                                                }
                                                {
                                                    searchCat === 'Автор'?
                                                        <TouchableOpacity onPress={()=>chooseCat('Автор')} style={styles.chosenSearchCat}>
                                                            <Text style={{color: 'white'}}>Автор</Text>
                                                        </TouchableOpacity>:
                                                        <TouchableOpacity onPress={()=>chooseCat('Автор')} style={styles.searchCat}>
                                                            <Text>Автор</Text>
                                                        </TouchableOpacity>
                                                }
                                            </View>:
                                            null
                                    }
                                </View>
                            </View>
                            <CategoriesComp category={category} setCategory={setCategory}/>
                        </View>
                    </View>
                </View>
                <View style={styles.booksContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            filteredBooks.map(( item ) => (
                                allBooks.length>0?
                                    <BookComp key={item.id} book={item} navigation={navigation} user={user} upd={upd} setUpd={setUpd} likes={likes} setLikes={setLikes} rec={rec} setRec={setRec}/>:
                                    null
                            ))
                        }
                    </ScrollView>
                </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative'
    },
    booksContainer:{
        flex:1,
        marginTop:height/35
    },
    topSvgStyle:{
        position:'absolute',
        top:0,
        width:width,
    },
    topContainer:{
        height:200
    },
    boxHeader:{
        flex:1,
        marginHorizontal:10
    },
    boxHeaderTop:{
        flex:.6,

    },
    boxHeaderBottom:{
        flex:1
    },
    inputContainer:{
        flex:1,
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    inputBox:{
        height:'80%',
        width:'65%',
    },
    input:{
        height:'100%',
        width:'100%',
        backgroundColor:'white',
        borderRadius:20,
        paddingLeft:10,
        fontSize:16,
        color:'black'
    },
    searchButton:{
        position:'absolute',
        alignSelf:'center',
        right:0,
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
        height:"100%",
        width:"15%",
        justifyContent:'center',
        alignItems:'center',
        borderLeftColor:'black',
        borderLeftWidth:1,
        backgroundColor:'white'
    },
    genreButton:{
        zIndex:21,
        flexDirection:'row',
        height:'100%',
        width:'100%',
        backgroundColor:'white',
        borderRadius:20,
        justifyContent:'space-between',
        alignItems:'center',
    },
    searchCat:{
        width:'90%',
        height:30,

        justifyContent:'center',
        alignItems:'center'
    },
    chosenSearchCat:{
        width:'90%',
        height:30,
        backgroundColor:'#FB7200',
        borderRadius:10,

        justifyContent:'center',
        alignItems:'center'
    }
})

export default Home
