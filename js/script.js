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
  apiKey: "AIzaSyAH4KK0hIftsJZkMR1Hx6swzLmBCl42obM",
  authDomain: "analystbootcamp-e3060.firebaseapp.com",
  projectId: "analystbootcamp-e3060",
  storageBucket: "analystbootcamp-e3060.appspot.com",
  messagingSenderId: "810457809555",
  appId: "1:810457809555:web:7d97c7dd08caad99bdc366",
  measurementId: "G-7EJ0XCDT0S"
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
        email: currentUser.email,
        class: navigationVue.admin ? "bot-message" : "user-message",
        body: document.getElementById("messageInput").value,
        createdAt: serverTimestamp(),
        createdBy: currentUser.email
    })
    .then(() => {
        console.log("Verified user successfully.");
    })
})

async function checkUsername(email) {
    // get collection data
    // queries
    const q = query(colRef, where("email", "==", email))
    const snapshot = await getDocs(q)
    let users = []
    snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data() }.email)
    })
    if (users.includes(email)) {
        return true
    } else {
        return false
    }
}

async function checkSignIn(username, password) {
    // get collection data
    // queries
    const q = query(colRef, where("username", "==", username))
    const snapshot = await getDocs(q)
    let users = []
    snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id:doc.id })
    })
    console.log(users, username)
    if (users[0].username == username && users[0].password == password) {
        currentUser = users[0]
        return true
    } else {
        currentUser = undefined
        return false
    }
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
            //console.log('the user is signed out')
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
            loginForm.password.value !== loginForm.confirmPassword.value
            ) {
            loginErrorMsg.innerHTML = "Password does not match.";
            loginErrorMsg.style.opacity = 1
            return
        }
        createUserWithEmailAndPassword(auth, username, password)
            .then((cred) => {
                //console.log('user created:', cred.user)
                //console.log("You have successfully logged in.");
                //document.getElementById("securityQuestions").style.display = "none";
                loginForm.reset()
                loginForm.confirmPassword.style.display = "none";
                
                logged = true;
                
                loginErrorMsg.style.opacity = 0;
                goBack()
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent!
                        // ...
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
        //const existingUser = await checkUsername(username.toLowerCase())
        /*if (
            "" == username ||
            " " == username ||
            username.includes(" ")
        ) {
            loginErrorMsg.innerHTML = "Please enter a valid username.";
            loginErrorMsg.style.opacity = 1
        } else if (
            existingUser
        ) {
            
            loginErrorMsg.innerHTML = "Username already exists.";
            loginErrorMsg.style.opacity = 1
        } else if (
            "" == password
        ) {
            loginErrorMsg.innerHTML = "Please enter a valid password.";
            loginErrorMsg.style.opacity = 1
        } else if (
            loginForm.password.value !== loginForm.confirmPassword.value
            ) {
            loginErrorMsg.innerHTML = "Password is not the same.";
            loginErrorMsg.style.opacity = 1
        } else {

            createUserWithEmailAndPassword(auth, username, password)
                .then((cred) => {
                    console.log('user created:', cred.user)
                    document.querySelector(".login").innerHTML = '<i class="fa fa-sign-out"></i> SIGN OUT'
                    document.querySelector(".login-2").innerHTML = 'SIGN OUT'
                    console.log("You have successfully logged in.");
                    //document.getElementById("securityQuestions").style.display = "none";
                    loginForm.reset()
                    loginForm.confirmPassword.style.display = "none";
                    
                    logged = true;
                    
                    loginErrorMsg.style.opacity = 0;
                    goBack()
                })
                .catch((err) => {
                    console.log(err.message)
                    if (err.message == 'Firebase: Error (auth/email-already-in-use).') {
                        loginErrorMsg.innerHTML = "Email already in use."
                        loginErrorMsg.style.opacity = 1
                    }
                })*/
            /*
            addDoc(colRef, {
                username: username.toLowerCase(),
                password: password,
                securityQuestion: getSelectedOption(document.getElementsByName("securityGroup")),
                securityAnswer: document.querySelector("#answer").value.toLowerCase(),
                createdAt: serverTimestamp()
            })
            .then(() => {
                console.log("You have successfully logged in.");
                document.getElementById("securityQuestions").style.display = "none";
                loginForm.reset()
                loginForm.confirmPassword.style.display = "none";
                
                logged = true;
                
                loginErrorMsg.style.opacity = 0;
                goBack()
            })
        }*/
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
                }/* else if (err.message == 'Firebase: Error (auth/missing-password).') {
                    loginErrorMsg.innerHTML = "Enter password."
                    loginErrorMsg.style.opacity = 1
                } else if (err.message == 'Firebase: Error (auth/email-already-in-use).') {
                    loginErrorMsg.innerHTML = "Email already in use."
                    loginErrorMsg.style.opacity = 1
                } else if (err.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    oginErrorMsg.innerHTML = "Password should be at least 6 characters"
                    loginErrorMsg.style.opacity = 1
                }*/
            })
        /*
            const existingUser = await checkSignIn(username.toLowerCase(), password)
        if (
            existingUser
        ) {
            console.log("You have successfully logged in.");
            loginForm.reset()
            
            logged = true;
            
            loginErrorMsg.style.opacity = 0;
            goBack()
        }*/
    }
  });

  const unsubAuth = onAuthStateChanged(auth, async (user) => {
    console.log('user status changed:', user)
    if (user !== null) {
        document.querySelector("#logIn-1").style.display = 'none'
        document.querySelector("#logIn-2").style.display = 'none'
        document.querySelector("#logOut-1").style.display = ''
        document.querySelector("#logOut-2").style.display = ''
        navigationVue.logged = true
        navigationVue2.logged = true
    } else {
        document.querySelector("#logIn-1").style.display = ''
        document.querySelector("#logIn-2").style.display = ''
        document.querySelector("#logOut-1").style.display = 'none'
        document.querySelector("#logOut-2").style.display = 'none'
        navigationVue.logged = false
        navigationVue2.logged = false
    }
    if (user !== null && user.emailVerified) {
        const varified = await checkUsername(user.email)
        if (!varified) {
            addDoc(colRef, {
                email: user.email,
                access: "default",
                createdAt: serverTimestamp()
            })
            .then(() => {
                console.log("Verified user successfully.");
            })
        } else {
            const q = query(colRef, where("email", "==", user.email))
            var r = query(msgRef, where("email", "==", user.email), orderBy('createdAt'));
            const unsubCol = onSnapshot(q, (snapshot) => {
                let users = []
                snapshot.docs.forEach((doc) => {
                  users.push({ ...doc.data(), id:doc.id })
                })
                console.log(users)
                currentUser = users[0]
                if (users[0].access == 'admin') {
                    r = query(msgRef, orderBy('createdAt'))
                    console.log('Administrator')
                    navigationVue.admin = true
                    navigationVue2.admin = true
                } else {
                    r = query(msgRef, where("email", "==", user.email), orderBy('createdAt'))
                    navigationVue.admin = false
                    navigationVue2.admin = false
                }
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
                console.log(messages)
            })
        }
    }
  })

  function convertTimestampToUserFriendlyFormat(timestamp) {
    // Check if the timestamp is valid
    if (!timestamp || !(timestamp instanceof Date)) {
      return "Invalid timestamp";
    }
  
    // Format the date as a string, e.g., using toLocaleString()
    const formattedDate = timestamp.toLocaleString();
  
    return getCurrentTime(formattedDate);
  }

  function getCurrentTime(date) {
    var now = new Date(date);
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var timeString = hours + ':' + minutes + ' ' + ampm;
    return timeString;
  }
