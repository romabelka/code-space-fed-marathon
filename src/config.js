import firebase from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyArhl0E-EIVDb1-_GTPfxyZ67__nNYsKjY",
    authDomain: "guild-day.firebaseapp.com",
    databaseURL: "https://guild-day.firebaseio.com",
    projectId: "guild-day",
    storageBucket: "guild-day.appspot.com",
    messagingSenderId: "187820023749"
}

firebase.initializeApp(config)