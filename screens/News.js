import {View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from "react-native";
import TopSvg from "../components/TopSvg";
import {width} from "../config/Dimension";
import {AntDesign, Feather} from "@expo/vector-icons";
import BookComp from "../components/BookComp";
import NewsComp from "../components/NewsComp";
import {useEffect, useState} from "react";
import {getNewsFromDb} from "../func/actions";
import {months} from "../config/Constants";

const News = () =>{

    const [news, setNews] = useState([])
    const [search, setSearch] = useState("")
    const [filterNews, setFilterNews] = useState([])
    const [modal, setModal] = useState(false)
    const [mon, setMon] = useState(0)

    const getNews = async () =>{
        const news = await getNewsFromDb()
        setNews(news)
        setFilterNews(news)
    }

    useEffect(()=>{
        getNews().then(()=> console.log('a'))
    }, [])

    const Search = (text) =>{
        setSearch(text)
        if (text){
            const newData = filterNews.filter(item => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })

            setNews(newData)

        }else {

            setNews(filterNews)


        }
    }

    const chooseMon = (flow) =>{
        setMon(flow)
        setModal(false)
        const filter = filterNews.filter((item) => item.month === mon)
        setNews(filter)
    }

    return(
        <SafeAreaView style={styles.container}>
            <TopSvg customStyle={styles.topSvgStyle} h={100} customD={"M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,250.7C672,245,768,203,864,165.3C960,128,1056,96,1152,122.7C1248,149,1344,235,1392,277.3L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"}/>
            <View style={styles.infoContainer}>
                <View style={styles.textBox}>
                    <Text style={{color:'white', fontSize:30, fontWeight:'bold'}}>Новости</Text>
                </View>
                <View style={styles.searchContainer}>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Поиск..."
                            placeholderTextColor="black"
                            onChangeText={(text) => Search(text)}
                        />
                        <TouchableOpacity style={styles.searchButton}>
                            <Feather name="search" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{height:'80%', width:'30%', marginRight:5}}>
                        <TouchableOpacity activeOpacity={10} onPress={()=>setModal(!modal)} style={styles.genreButton}>
                            <Text style={{fontSize: 16, marginLeft:8}}>Дата</Text>
                            <AntDesign style={{marginRight:8}} name="downcircleo" size={20} color="black" />
                        </TouchableOpacity>
                        {
                            modal?
                                <View style={{
                                    width:'100%',
                                    height:200,
                                    position:'absolute',
                                    bottom:-183,
                                    zIndex:20,
                                    backgroundColor:'white',
                                    borderBottomLeftRadius:20,
                                    borderBottomRightRadius: 20,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <View style={{width:'100%', height:'80%', justifyContent:'center'}}>
                                        <ScrollView>
                                            {months.map((item)=>(
                                                mon === item.flow?
                                                    <TouchableOpacity key={item.flow} onPress={()=>chooseMon(item.flow)} style={styles.chosenSearchCat}>
                                                        <Text style={{color: 'white'}}>{item.name}</Text>
                                                    </TouchableOpacity>:
                                                    <TouchableOpacity key={item.flow} onPress={()=>chooseMon(item.flow)} style={styles.searchCat}>
                                                        <Text>{item.name}</Text>
                                                    </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>

                                </View>:
                                null
                        }
                    </View>
                </View>

            </View>
            <View style={styles.newsContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        news.length>0?
                            news.map((item)=>(
                                <NewsComp key={item.id} n={item}/>
                            )):
                            null
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',

    },
    topSvgStyle:{
        position:'absolute',
        top:0,
        height:200,
        width:width,
    },
    infoContainer:{
        height: 125,
    },
    textBox:{
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    searchContainer:{
        height:50,
        marginTop:10,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputBox:{
        height:'80%',
        width:'65%',
        marginLeft:5
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
        flexDirection:'row',
        zIndex:30,
        height:'100%',
        width:'100%',
        backgroundColor:'white',
        borderRadius:20,
        justifyContent:'space-between',
        alignItems:'center',

    },
    newsContainer:{
        flex:1,
        marginTop: 10,
        marginBottom:10


    },
    searchCat:{
        width:'90%',
        height:30,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    chosenSearchCat:{
        width:'90%',
        height:30,
        backgroundColor:'#FB7200',
        borderRadius:10,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    }

})

export default News
