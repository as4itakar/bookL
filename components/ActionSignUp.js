import {View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Platform} from "react-native";
import {Feather, FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'
import {createUserWithEmailAndPassword} from "firebase/auth"
import {useEffect, useState} from "react";
import {auth, db, storage} from "../config/Firebase";
import {collection, addDoc, getDocs, query, where, updateDoc, doc, orderBy} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import * as ImagePicker from "expo-image-picker";

const ActionSignUp = ({navigation}) =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [birthdate, setBirthDate] = useState('')
    const [error, setError] = useState(true)
    const [image, setImage] = useState(null)

    const handleRegister = async () =>{
        if (image !== null){
            if(email && password !== ""){
                createUserWithEmailAndPassword(auth, email, password)
                    .then(() => setError(false))
                    .catch((err) => Alert.alert("Ошибка входа!", "Попробуйте еще раз..."));


                SubmitPic()



            }
        }else {
            Alert.alert('Ошибка', 'Вы не выбрали изображение...')
        }
    }

    useEffect( async () => {
        if (Platform.OS !== 'web'){
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted'){
                alert('Permission denied!')
            }
        }
    },[])

    const PickImage = async () =>{
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

    const SubmitPic = async () =>{
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
                    const userDoc = collection(db, 'users')
                    const user = {
                        "email": email,
                        'password':password,
                        'fullName':username,
                        'country': country,
                        "city":city,
                        'birth':birthdate,
                        "likes": [],
                        'rec': [],
                        'img': downloadURL
                    }
                    await addDoc(userDoc,user)
                    setImage(null)

                })
            })
    }

    return(
        <Animatable.View animation='bounceInRight' style={styles.container}>
            <View style={styles.section}>
                <View style={styles.icon}>
                    <Ionicons name="mail-outline" size={20} color="gray" />
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Введите почту..."
                        style={styles.textInput}
                        onChangeText={(text)=>setEmail(text)}
                    />
                </View>
            </View>
            <View style={[styles.section,{
                marginTop:15
            }]}>
                <View style={styles.icon}>
                    <Ionicons name="lock-open-outline" size={20} color="gray" />
                </View>
                <View style={styles.input}>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Введите пароль..."
                        style={styles.textInput}
                        onChangeText={(text)=>setPassword(text)}
                    />
                </View>
            </View>
            <View style={[styles.section,{
                marginTop:15
            }]}>
                <View style={styles.icon}>
                    <Feather name="user" size={20} color="gray" />
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Введите ФИО..."
                        style={styles.textInput}
                        onChangeText={(text)=>setUsername(text)}
                    />
                </View>
            </View>
            <View style={{width:'100%', marginTop:15, height:50, flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{
                    marginRight:5,
                    flex:1,
                    flexDirection:'row',
                    backgroundColor:'white',
                    paddingVertical:15,
                    paddingHorizontal:10,
                    borderRadius:7,
                }}>
                    <View style={styles.icon}>
                        <Ionicons name="location-outline" size={20} color="gray" />
                    </View>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Введите страну..."
                            style={styles.textInput}
                            onChangeText={(text)=>setCountry(text)}
                        />
                    </View>
                </View>
                <View style={{
                    marginLeft:5,
                    flex:1,
                    flexDirection:'row',
                    backgroundColor:'white',
                    paddingVertical:15,
                    paddingHorizontal:10,
                    borderRadius:7,
                }}>
                    <View style={styles.icon}>
                        <Ionicons name="ios-locate" size={20} color="gray" />
                    </View>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Введите город..."
                            style={styles.textInput}
                            onChangeText={(text)=>setCity(text)}
                        />
                    </View>
                </View>
            </View>
            <View style={[styles.section,{
                marginTop:15
            }]}>
                <View style={styles.icon}>
                    <MaterialIcons name="cake" size={20} color="gray" />
                </View>
                <View style={styles.input}>
                    <TextInput

                        placeholder="Введите дату рождения..."
                        style={styles.textInput}
                        onChangeText={(text)=>setBirthDate(text)}
                    />
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.button_container}>
                    <TouchableOpacity onPress={handleRegister} style={styles.button}>
                        <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Регистрация</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={PickImage} style={{position:'absolute', alignSelf:'center', right:0,width:40, height:40,
                        backgroundColor:'black',
                        borderRadius:40,
                        marginTop:10,
                        justifyContent:'center',
                        alignItems:'center'}}>
                        <FontAwesome name="picture-o" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:20
    },
    section:{
        flexDirection:'row',
        backgroundColor:'white',
        width:'100%',
        paddingVertical:15,
        paddingHorizontal:10,
        borderRadius:7,
        height:50
    },
    icon:{
        borderRightWidth:1,
        borderRightColor:'gray',
        paddingRight:10
    },
    input:{
        flex:1
    },
    textInput:{
        paddingLeft:10
    },
    bottom:{
        flexDirection:'row',
        marginTop:10
    },
    button_container:{
        flex:1,
        alignItems:'center'
    },
    button:{
        width:140,
        height:40,
        backgroundColor:'#FB7200',
        borderWidth:2,
        borderColor:'white',
        borderRadius:10,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center'
    }

})

export default ActionSignUp
