// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { 
  getFirestore, collection, getDocs, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { 
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDb1EoYGjAwshrZx_Egqn7yCKyMBCgqZJo",
    authDomain: "analystsbootcamp.firebaseapp.com",
    projectId: "analystsbootcamp",
    storageBucket: "analystsbootcamp.appspot.com",
    messagingSenderId: "640983431626",
    appId: "1:640983431626:web:577922ba57b170829a7733",
    measurementId: "G-QQL8SFSQFK"
};


// Initialize Firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'users')
const msgRef = collection(db, 'messages')

/*
const q = query(colRef, orderBy('createdAt'))

const unsubCol = onSnapshot(q, (snapshot) => {
    let users = []
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id:doc.id })
    })
    console.log(users)
})*/

const sendMessageButton = document.getElementById('sendButton')

sendMessageButton.addEventListener('click', () => {
    addDoc(msgRef, {
        email: currentMessage.email,
        class: navigationVue.admin ? "bot-message" : "user-message",
        body: currentMessage.body,//document.getElementById("messageInput").value,
        accountName: currentMessage.firstname,
        createdAt: serverTimestamp(),
        createdBy: currentMessage.email,
        createdByName: currentMessage.firstname
    })
    .then(() => {
        //console.log("Verified user successfully.");
    })
})

async function checkUsername(email) {
    // get collection data
    // queries
    const q = query(msgRef, where("email", "==", email))
    const snapshot = await getDocs(q)
    let users = []
    snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data() }.email)
    })
    //console.log(users)
    await checkSignIn(email)
    if (users.includes(email)) {
        return true
    } else {
        return false
    }
}

async function checkSignIn(email) {
    // get collection data
    // queries
    const q = query(colRef, where("email", "==", email))
    const snapshot = await getDocs(q)
    let users = []
    snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id:doc.id })
    })
    //console.log(users, email)
    currentUser = users[0]
    return
}

async function updateProperties(id, properties) {
    const docRef = doc(db, "users", id)
    const snapshot = await updateDoc(docRef, properties)
}

//updateProperties(, {"username":"new", "access":"admin"})

const logOutButton1 = document.querySelector('#logOut-1')
logOutButton1.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            navigationVue.admin = false
            navigationVue2.admin = false
            goBack()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

const logOutButton2 = document.querySelector('#logOut-2')
logOutButton2.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            //console.log('the user is signed out')
            navigationVue.admin = false
            navigationVue2.admin = false
            goBack()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    loginErrorMsg.innerHTML = ""

    if (loginForm.confirmPassword.style.display == "") {
        if (
            loginForm.firstname.value.trim() == ""
            ) {
            loginErrorMsg.innerHTML = "Please enter First Name.";
            loginErrorMsg.style.opacity = 1
            return
        } else if (
            loginForm.lastname.value.trim() == ""
            ) {
            loginErrorMsg.innerHTML = "Please enter Last Name.";
            loginErrorMsg.style.opacity = 1
            return
        } else if (
            loginForm.password.value !== loginForm.confirmPassword.value
            ) {
            loginErrorMsg.innerHTML = "Password does not match.";
            loginErrorMsg.style.opacity = 1
            return
        }
        createUserWithEmailAndPassword(auth, username, password)
            .then((cred) => {
                
                loginForm.confirmPassword.style.display = "none";
                
                logged = true;
                addDoc(colRef, {
                    email: loginForm.username.value,
                    firstname: loginForm.firstname.value,
                    lastname: loginForm.lastname.value,
                    othernames: loginForm.othernames.value,
                    createdAt: serverTimestamp(),
                    createdBy: loginForm.firstname.value
                })
                .then(() => {
                    console.log("saved user successfully.");
                    loginForm.reset()
                    loginErrorMsg.style.opacity = 0;
                    goBack()
                })
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        
                    });
            })
            .catch((err) => {
                console.log(err.message)
                if (err.message == 'Firebase: Error (auth/invalid-email).') {
                    loginErrorMsg.innerHTML = "Invalid email."
                    loginErrorMsg.style.opacity = 1
                } else if (err.message == 'Firebase: Error (auth/missing-password).') {
                    loginErrorMsg.innerHTML = "Enter password."
                    loginErrorMsg.style.opacity = 1
                } else if (err.message == 'Firebase: Error (auth/email-already-in-use).') {
                    loginErrorMsg.innerHTML = "Email already in use."
                    loginErrorMsg.style.opacity = 1
                } else if (err.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    oginErrorMsg.innerHTML = "Password should be at least 6 characters"
                    loginErrorMsg.style.opacity = 1
                }
            })
        
    } else {
        signInWithEmailAndPassword(auth, username, password)
            .then((cred) => {
                //console.log('user logged in:', cred.user)
                //document.getElementById("securityQuestions").style.display = "none";
                loginForm.reset()
                loginForm.confirmPassword.style.display = "none";
                
                logged = true;
                
                loginErrorMsg.style.opacity = 0;
                goBack()
            })
            .catch((err) => {
                console.log(err.message)
                if (err.message == 'Firebase: Error (auth/invalid-credential).') {
                    loginErrorMsg.innerHTML = "Invalid credential."
                    loginErrorMsg.style.opacity = 1
                }
            })
    }
  });

  const unsubAuth = onAuthStateChanged(auth, async (user) => {
    //console.log('user status changed:', user)

    homeVue.display = true
	aboutVue.display = false
	coursesVue.display = false
	qaVue.display = false
    adminVue.display = false
    updatesVue.display = false
    if (user !== null && user.emailVerified) {
        //console.log(user.email)
        const verified = await checkUsername(user.email)
        var r = query(msgRef, where("email", "==", user.email), orderBy('createdAt'));
        if (!verified) {
            addDoc(msgRef, {
                email: user.email,
                class: "bot-message",
                body: `Welcome ${currentUser.firstname}`,
                accountName: currentUser.firstname,
                createdAt: serverTimestamp(),
                createdBy: 'Admin',
                createdByName: 'Admin'
            })
            .then(() => {
                //console.log("Verified user successfully.");
            })
            const unsubMsg = onSnapshot(r, (snapshot) => {
                let messages = []
                snapshot.docs.forEach((doc) => {
                    messages.push({ ...doc.data(), id:doc.id })
                })
                updatesVue.messages = messages.map((element) => ({
                    ...element,
                    time: element.createdAt ? convertTimestampToUserFriendlyFormat(element.createdAt.toDate()) : getCurrentTime(new Date()),
                }));
                //console.log(messages)
            })
        } else {
            const q = query(colRef, where("email", "==", user.email))
            const unsubCol = onSnapshot(q, (snapshot) => {
                let users = []
                snapshot.docs.forEach((doc) => {
                  users.push({ ...doc.data(), id:doc.id })
                })
                //console.log(users)
                currentUser = users[0]
                if (users[0].access == 'admin') {
                    r = query(msgRef, orderBy('createdAt'))
                    //console.log('Administrator')
                    navigationVue.admin = true
                    navigationVue2.admin = true
                } else {
                    r = query(msgRef, where("email", "==", user.email), orderBy('createdAt'));
                    navigationVue.admin = false
                    navigationVue2.admin = false
                }
                const unsubMsg = onSnapshot(r, (snapshot) => {
                    let messages = []
                    snapshot.docs.forEach((doc) => {
                        messages.push({ ...doc.data(), id:doc.id })
                    })
                    if (updatesVue.messages.length !== 0) {
                        var messageChanges = messages.filter((elem) => {
                            return updatesVue.messages.findIndex(ele=>ele.email === elem.email && ele.firstname === elem.firstname && ele.body === elem.body) == -1
                        })
                        var found = messageChanges.findIndex(elem=>currentMessage.email == elem.email && currentMessage.firstname == elem.createdByName && currentMessage.body == elem.body)
                        //console.log(found, messageChanges,currentMessage)
                        if (found !== -1) {
                            messageChanges.splice(found, 1)
                            newMessages = newMessages.concat(messageChanges)
                        } else {
                            newMessages = newMessages.concat(messageChanges)
                        }
                        if (newMessages.length !== 0) {
                            document.querySelector('#updateCount-1').innerHTML = `<strong style="color:red;"> (${newMessages.length})</strong>`
                            document.querySelector('#updateCount-2').innerHTML = `<strong style="color:red;"> (${newMessages.length})</strong>`
                        } else {
                            document.querySelector('#updateCount-1').innerHTML = ``
                            document.querySelector('#updateCount-2').innerHTML = ``
                        }
                    }
                    updatesVue.messages = messages.map((element) => ({
                        ...element,
                        time: element.createdAt ? convertTimestampToUserFriendlyFormat(element.createdAt) : getCurrentTime(new Date()),
                    }));
                    
                    //console.log(messages)
                    updatesVue.sortMessages = [].concat(messages)
                    updatesVue.sortMessages.sort(sortByDateReverse)
                    
                    //console.log(messages)
                })
            })
        }
        
        document.querySelector("#logIn-1").style.display = 'none'
        document.querySelector("#logIn-2").style.display = 'none'
        document.querySelector("#logOut-1").style.display = ''
        document.querySelector("#logOut-2").style.display = ''
        document.querySelector('.bgimg-3').style.display = "none";
        navigationVue.logged = true
        navigationVue2.logged = true
    } else if (user !== null) {
        document.querySelector("#logIn-1").style.display = 'none'
        document.querySelector("#logIn-2").style.display = 'none'
        document.querySelector("#logOut-1").style.display = ''
        document.querySelector("#logOut-2").style.display = ''
        document.querySelector('.bgimg-3').style.display = "none";
        navigationVue.logged = true
        navigationVue2.logged = true
        updatesVue.messages[0] = {class:"bot-message", body:"Please verify your email account to continue."}
    } else {
        document.querySelector("#logIn-1").style.display = ''
        document.querySelector("#logIn-2").style.display = ''
        document.querySelector("#logOut-1").style.display = 'none'
        document.querySelector("#logOut-2").style.display = 'none'
        navigationVue.logged = false
        navigationVue2.logged = false
    }
  })

function convertTimestampToUserFriendlyFormat(timestamp) {
    // Check if the timestamp is valid
    if (!timestamp || !timestamp.toDate || typeof timestamp.toDate !== 'function') {
      return "Invalid timestamp";
    }
  
    // Convert Firestore Timestamp to JavaScript Date
    const dateObject = timestamp.toDate();
  
    // Format the date as a string, e.g., using toLocaleString()
    const formattedDate = dateObject.toLocaleString();
  
    return formattedDate;
}

// Function to sort by date in reverse order
function sortByDateReverse(a, b) {
    if (a.createdAt == null || b.createdAt == null) {
        return 0
    } else {
        return Number(b.createdAt.seconds.toString() + b.createdAt.nanoseconds.toString()) - Number(a.createdAt.seconds.toString() + a.createdAt.nanoseconds.toString());
    }
    
}

