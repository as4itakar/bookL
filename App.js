import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import Navigation, {LoginNavigation} from "./navigation/Navigation";
import {Image, LogBox, View, Text} from 'react-native';
import {createContext, useContext, useEffect, useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "./config/Firebase";
import { onAuthStateChanged } from 'firebase/auth';


LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreAllLogs()

const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    return (
        <AuthenticatedUserContext.Provider value={{ user, setUser, userInfo, setUserInfo }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};

function RootNavigator (){
    const {userInfo, setUserInfo} = useContext(AuthenticatedUserContext)
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useContext(AuthenticatedUserContext);

    useEffect(() => {
        onAuthStateChanged(auth,  async authenticatedUser=>{
            if (authenticatedUser){
                setLoading(true)
                const usersCol = collection(db, 'users')
                const q = query(usersCol, where("email", "==", authenticatedUser.email))
                const userSnap = await getDocs(q)
                setUserInfo(userSnap.docs.map((doc) => ({...doc.data(), id: doc.id})))
                setUser(authenticatedUser)
                setLoading(false)
            }else{
                setUser(null)
                setUserInfo(null)
            }
        })
        console.log(user)
        console.log(userInfo)
    }, [user]);



    if (loading){
        return (
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <Image source={require('./assets/loader/cat.gif')} style={{width:250, height:250}}/>
                <Text style={{fontSize: 18, marginTop:10}}>Загрузка...</Text>
            </View>
        )
    }

    return(
        <NavigationContainer>
            {user ? <Navigation/>: <LoginNavigation/>}
        </NavigationContainer>

    )



}


const App = () => {
    return (
        <AuthenticatedUserProvider>
            <RootNavigator/>
        </AuthenticatedUserProvider>
    )
}

export default App
