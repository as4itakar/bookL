import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {auth, db} from "../config/Firebase";

export const getBooksFromDB = async () =>{
    const booksCol = collection(db, 'books')
    const q = query(booksCol)
    const booksSnap = await getDocs(q)
    return booksSnap.docs.map((doc) => ({...doc.data(), id: doc.id}))
}

export const getUserRateFromDB = async (email) =>{
    const booksCol = collection(db, 'rating')
    const q = query(booksCol, where('userEmail', '==', email))
    const booksSnap = await getDocs(q)
    return booksSnap.docs.map((doc) => ({...doc.data(), id: doc.id}))
}

export const getBookRateFromDB = async (name) =>{
    const booksCol = collection(db, 'rating')
    const q = query(booksCol, where('bookName', '==', name))
    const booksSnap = await getDocs(q)
    return booksSnap.docs.map((doc) => ({...doc.data(), id: doc.id}))
}

export const getBooksFromDBWhere = async (name) =>{
    const booksCol = collection(db, 'books')
    const q = query(booksCol, where('name', '==', name))
    const booksSnap = await getDocs(q)
    return booksSnap.docs.map((doc) => ({...doc.data(), id: doc.id}))
}

export const getNewsFromDb = async () =>{
    const booksCol = collection(db, 'news')
    const q = query(booksCol, orderBy('date', 'desc'))
    const booksSnap = await getDocs(q)
    return booksSnap.docs.map((doc) => ({...doc.data(), necDate: doc.data().date.seconds * 1000, day:new Date(doc.data().date.seconds * 1000).getDate(), month: new Date(doc.data().date.seconds * 1000).getMonth()+1, year:new Date(doc.data().date.seconds * 1000).getFullYear(),id: doc.id}))
}

export const getCommentsFromDb = async () =>{
    const comCol = collection(db, 'comments')
    const q = query(comCol, orderBy('date', 'desc'))
    const comSnap = await getDocs(q)
    return comSnap.docs.map((doc) => ({...doc.data(), necDate: doc.data().date.seconds * 1000, day:new Date(doc.data().date.seconds * 1000).getDate(), month: new Date(doc.data().date.seconds * 1000).getMonth()+1, year:new Date(doc.data().date.seconds * 1000).getFullYear(),id: doc.id}))
}

export const getUserFromDb = async () =>{
    const userCol = collection(db, "users")
    const q = query(userCol, where("email", '==', auth.currentUser.email))
    const userSnap = await getDocs(q)
    return userSnap.docs.map((doc) => ({...doc.data(), id: doc.id}))
}
