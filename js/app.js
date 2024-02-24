// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}


function signIn() {
  w3_close();
  document.querySelectorAll(".main").forEach((elem) => {
    if (!elem.className.includes('w3-top') && !elem.className.includes('bgimg-3')) {
        elem.style.display = "none";
    } 
  });
  document.querySelector(".signIn").style.display = "";
}

function goBack() {
    if (loginForm.confirmPassword.style.display == "") {
        //document.getElementById("securityQuestions").style.display = "none";
        loginForm.firstname.style.display = "none";
        loginForm.lastname.style.display = "none";
        loginForm.othernames.style.display = "none";
        loginForm.confirmPassword.style.display = "none";

        document.getElementById("loginTitle").innerHTML = "LOGIN"
        document.getElementById("signUp").parentNode.style.display = "";
        document.getElementById("signUp").parentNode.nextElementSibling.style.display = "none";
        loginErrorMsg.style.opacity = 0;
    } else {
        document.querySelectorAll(".main").forEach((elem) => {
            elem.style.display = "";
        });
        document.querySelector(".signIn").style.display = "none";
        //document.getElementById("securityQuestions").style.display = "none";
        loginForm.firstname.style.display = "none";
        loginForm.lastname.style.display = "none";
        loginForm.othernames.style.display = "none";
        loginForm.confirmPassword.style.display = "none";
    
    }
    document.querySelector('.bgimg-3').style.display = 'none'
    loginButton.innerHTML = '<i class="fa fa-sign-in"></i> LOGIN'
    loginErrorMsg.style.opacity = 0;
    loginForm.reset()
    w3_close()
}

function signUp() {
  loginButton.innerHTML = 'SIGN UP'
  //document.getElementById("securityQuestions").style.display = "";
  loginErrorMsg.innerHTML = "";
  loginForm.firstname.style.display = "";
  loginForm.lastname.style.display = "";
  loginForm.othernames.style.display = "";
  loginForm.confirmPassword.style.display = "";

  document.getElementById("loginTitle").innerHTML = "SIGN UP"
  document.getElementById("signUp").parentNode.style.display = "none";
  document.getElementById("signUp").parentNode.nextElementSibling.style.display = "";
}

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const defaultLogin = loginButton.innerHTML;
const loginErrorMsg = document.getElementById("login-error-msg");
loginForm.firstname.style.display = "none";
loginForm.lastname.style.display = "none";
loginForm.othernames.style.display = "none";
loginForm.confirmPassword.style.display = "none";
//document.getElementById("securityQuestions").style.display = "none";
loginErrorMsg.style.opacity = 0;


var logged = false
var currentUser = undefined
var currentMessage = {}

var navigationVue, navigationVue2, homeVue, aboutVue, coursesVue, qaVue, updatesVue, adminVue;

var allButtons = [
	{"title": "ANALYSTCS", "function": "homeVue"}, 
	{"title": "ABOUT", "function": "aboutVue"}, 
	{"title": "COURSES", "function": "coursesVue"}, 
	{"title": "QA", "function": "qaVue"},
	{"title": "LOGIN", "function": "loginPageVue"},
	{"title": "UPDATES", "function": "updatesVue"},
	{"title": "ADMIN", "function": "adminVue"},
  
]

document.querySelector('#navigation').innerHTML = `<template>
  <div class="w3-top main">
    <div class="w3-bar w3-white w3-card" id="myNavbar">
      <a @click="openButton('ANALYSTCS')" class="w3-bar-item w3-button w3-wide" style="color:#03a9f;padding-top:6px;padding-bottom:6px">AN<span style="color:#03a9f4;font-size:175%;margin-top:0;padding-top:0">A</span>LYSTS</a>
      <!-- Right-sided navbar links -->
      <div class="w3-right w3-hide-small">
        <a @click="openButton('ABOUT')" class="w3-bar-item w3-button">ABOUT</a>
        <a @click="openButton('COURSES')" class="w3-bar-item w3-button"><i class="fa fa-th"></i> COURSES</a>
        <a @click="openButton('QA')" class="w3-bar-item w3-button"><i class="fa fa-question"></i> Q&A</a>
        <a v-if="logged == true" @click="openButton('UPDATES')" class="w3-bar-item w3-button"><i class="fa fa-info-circle"></i> UPDATES<span id="updateCount-1"></span></a>
        <a v-if="admin == true" @click="openButton('ADMIN')" class="w3-bar-item w3-button"><i class="fa fa-user"></i> ADMIN</a>
        <a href="javascript:void(0)" id="logIn-1" onclick="signIn()" class="w3-bar-item w3-button"><i class="fa fa-sign-in"></i> LOGIN</a>
        <a href="javascript:void(0)" id="logOut-1" class="w3-bar-item w3-button" style="display:none"><i class="fa fa-sign-out"></i> SIGN OUT</a>
      </div>
      <!-- Hide right-floated links on small screens and replace them with a menu icon -->

      <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onclick="w3_open()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
  </div>
</template>`


function processNavigation() {

  navigationVue = new Vue({
      el: document.querySelector('#navigation'),
      data: {
          buttons: [],
          logged: false,
          admin: false,
          display: false,
      },
      computed: {
          
      },
      methods: {
        inputMode() {
          return 'w3-bar-item w3-search ' + mode.replace('w3-card ','')
        },
        searchMode() {
          return 'w3-bar-item w3-select ' + mode.replace('w3-card ','')
        },
        async openButton(button) {
          gotoView(allButtons.filter(elem=>elem.title == button)[0].function)
          
        },
      }
  })
}

var currentView;

processNavigation()


document.querySelector('#mySidebar').innerHTML = `<template>
  <a href="javascript:void(0)" onclick="w3_close()" class="w3-bar-item w3-button w3-large w3-padding-16">Close ×</a>
  <a @click="openButton('ABOUT')" onclick="w3_close()" class="w3-bar-item w3-button">ABOUT</a>
  <a @click="openButton('COURSES')" onclick="w3_close()" class="w3-bar-item w3-button">COURSES</a>
  <a @click="openButton('QA')" onclick="w3_close()" class="w3-bar-item w3-button">Q&A</a>
  <a v-if="logged == true" @click="openButton('UPDATES')" onclick="w3_close()" class="w3-bar-item w3-button">UPDATES<span id="updateCount-2"></span></a>
  <a v-if="admin == true" @click="openButton('ADMIN')" onclick="w3_close()" class="w3-bar-item w3-button">ADMIN</a>
  <a href="javascript:void(0)" id="logIn-2" onclick="signIn()" class="w3-bar-item w3-button">LOGIN</a>
  <a href="javascript:void(0)" id="logOut-2" class="w3-bar-item w3-button" style="display:none">SIGN OUT</a>
</template>`

function processNavigation2() {

    navigationVue2 = new Vue({
        el: document.querySelector('#mySidebar'),
        data: {
          display: false,
          logged:false,
          admin:false,
        },
        computed: {

        },
        methods: {
			
			mode() {
				return 'w3-bar-item w3-button ' + mode.replace('w3-card ','')
			},
			async openButton(button) {
                //console.log(button)
				w3_close()
				gotoView(allButtons.filter(elem=>elem.title == button)[0].function)
			},
			buttons() {
                return navigationVue.buttons
            },
        }
    })
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

processNavigation2()


// Toggle between showing and hiding the sidebar when clicking the menu icon
var mySidebar = document.getElementById("mySidebar");

function w3_open() {
  if (mySidebar.style.display === "block") {
    mySidebar.style.display = "none";
  } else {
    mySidebar.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
}

document.querySelector('#home').innerHTML = `<template>
  <div v-if="display == true" class="w3-display-left w3-text-brown" style="padding:8px 48px 16px 24px;background: #ffffffef;">
    <span class="w3-jumbo w3-hide-small">The Right Mentorship</span><br>
    <span class="w3-xlarge w3-hide-large w3-hide-medium">The Right Mentorship</span><br>
    <span class="w3-xlarge w3-hide-small">Invest your time in acquiring skills that sets you on a Global stage.</span>
    <span class="w3-medium w3-hide-large w3-hide-medium">Invest your time in acquiring skills that sets you on a Global stage.</span>
    <p class="w3-hide-small"><a @click="openButton('ABOUT')" class="w3-button w3-brown w3-padding-large w3-xlarge w3-margin-top w3-opacity w3-hover-opacity-off">Learn more</a></p>
    <p class="w3-hide-large w3-hide-medium"><a @click="openButton('ABOUT')" class="w3-button w3-brown w3-padding-medium w3-margin-top w3-opacity w3-hover-opacity-off">Learn more</a></p>
  </div>
</template>`

function processHome() {

    homeVue = new Vue({
        el: document.querySelector('#home'),
        data: {
          display: true,
        },
        computed: {

        },
        methods: {
          async openButton(button) {
            gotoView(allButtons.filter(elem=>elem.title == button)[0].function)
            
          },
          mode() {
            return 'w3-bar-item w3-button ' + mode.replace('w3-card ','')
          },
        }
    })
}

processHome()

document.querySelector('#about').innerHTML = `<template>
<h3 v-if="display == true" class="w3-center" style="margin-top:84px">ANALYSTS BOOTCAMP</h3>
<p v-if="display == true" class="w3-center w3-large">Our Key role is:</p>
<div v-if="display == true" class="w3-row-padding w3-center" style="margin-bottom:32px">
  <div>
      <image src="images/mentorship.png" style="height:100px;margin:2px">
    <p class="w3-large">Mentorship</p>
    <p>Attaining <strong>Global Data and Business Analyst Certifications</strong> <em>- A New Vista & Gateway to International Job Mobility.</em></p>
  </div>
</div>
<!-- Promo Section - "We know design" -->
<div v-if="display == true" class="w3-container w3-light-grey main" style="padding:64px 16px; margin: 0 -16px">
  <div class="w3-row-padding">
    <div class="w3-col m6">
      <h3>Our Goal</h3>
      <p>As Global businesses inch towards Artificial Intelligence and a data-driven environment, it's about time the workforce stay in tune with the essentials of data and business analysis so as to deliver up-to-date intelligence, that will shape business decisions.</p>
    </div>
  </div>
  <div class="w3-row-padding">
    <div class="w3-col m6">
      <p>Our goal is providing support and mentoring towards achieving Data and Business Analyst Certifications with huge job potentials.</p>
    </div>
  </div>
</div>
</template>`

function processAbout() {

    aboutVue = new Vue({
        el: document.querySelector('#about'),
        data: {
          display: false,
        },
        computed: {

        },
        methods: {
			
          mode() {
            return 'w3-bar-item w3-button ' + mode.replace('w3-card ','')
          },
        }
    })
}

processAbout()

document.querySelector('#courses').innerHTML = `<template>
  <h3 v-if="display == true" class="w3-center" style="margin-top:84px">COURSES</h3>
  <p v-if="display == true" class="w3-center w3-large">Training will cover full Certifications in:</p>

  <div v-if="display == true" class="w3-row-padding" style="margin-top:64px;">
    <div class="w3-col l4 m8">
      <img src="images/Microsoft-Excel.png" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="Microsoft Excel">
    </div>
    <div class="w3-col l4 m8">
      <img src="images/PivotTables.png" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="Pivot Tables">
    </div>
    <div class="w3-col l4 m8">
      <img src="images/PowerBI.png" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="Power BI">
    </div>
  </div>

  <div v-if="display == true" class="w3-row-padding w3-section" style="margin-bottom:32px">
      <div class="w3-col l4 m8">
          <img src="images/Tableau.png" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="Tableau">
      </div>
      <div class="w3-col l4 m8">
          <img src="images/sql.png" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="SQL">
      </div>
      <div class="w3-col l4 m8">
          <img src="images/pyton.png" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="Pyton">
      </div>
  </div>
  <!-- Skills Section -->
  <div v-if="display == true" class="w3-container w3-light-grey w3-padding-64 main" style="padding:64px 16px; margin: 0 -16px">
      <div class="w3-row-padding">
        <div class="w3-col m6">
          <h3>First Step</h3>
          <p>Study at your own pace with videos on demand.</p>
          <h4>What you get:</h4>
          <ol>
              <li>Certificates</li>
              <li>Full lifetime access</li>
              <li>Downloadable resources</li>
          </ol>
        </div>
        <div class="w3-col m6">
          <h3>Second Step</h3>
          <p>With indepth know-how of these courses and having acquired the Certificates, you now have the power to decide where on earth you want to work and which country you want to relocate to. So, take yourself there!</p>
        </div>
      </div>
    </div>
</template>`

function processCourses() {

  coursesVue = new Vue({
        el: document.querySelector('#courses'),
        data: {
          display: false,
        },
        computed: {

        },
        methods: {
			
          mode() {
            return 'w3-bar-item w3-button ' + mode.replace('w3-card ','')
          },
        }
    })
}

processCourses()

document.querySelector('#qa').innerHTML = `<template>
<div v-if="display == true">
  <h3 class="w3-center" style="margin-top:84px">Q&A</h3>
  <div style="padding:16px">
    <p><strong>Q.</strong> Who is a Business Analyst?</p>
    <p><strong>A.</strong> This is a person who processes, interprets and documents business processes, products, services and software through analysis of data.</p>
    <br>
    <p><strong>Q.</strong> What does a Data Analyst do?</p>
    <p><strong>A.</strong> Collect, clean, study and interpret data sets in order to answer a question or solve a problem.</p>  
    <br>
    <p><strong>Q.</strong> Is this for only those who have studied subjects related to IT or Computer?</p>
    <p><strong>A.</strong> No. Everything, just everything we know now, we learned them. We’ve all got the potential. Our Brain never gets full and you don’t need to delete any file for a lack of storage.</p>
    <br>
    <p><strong>Q.</strong> Can I become a data analyst without a degree?</p>
    <p><strong>A.</strong> It is not always necessary to have a degree to get hired as a data analyst. Data analysts are in demand, and employers want to know that you have the skills to do the job. If you don't have a degree, focus on making your portfolio shine with your best.</p>
    <br>
    <p><strong>Q.</strong> Can I become a business analyst with no experience?</p>
    <p><strong>A.</strong> Include transferable skills. Even if you don't have direct experience in business analysis, you likely have transferable skills that can be applied to the role. Keywords like problem-solving, project management, and communication are all valuable skills for a business analyst.</p>
  </div>
</div>
</template>`

function processQA() {

    qaVue = new Vue({
        el: document.querySelector('#qa'),
        data: {
          display: false,
        },
        computed: {

        },
        methods: {
			
          mode() {
            return 'w3-bar-item w3-button ' + mode.replace('w3-card ','')
          },
        }
    })
}

processQA()

document.querySelector('#updates').innerHTML = `<template>
<div v-if="display == true" style="margin-top: 84px;display:flex">
  <div v-if="allUsers().length > 1" style="width:30%; height:90vh;overflow-Y:auto">
    <div v-for="(user, count) in allUsers()" class="chat-container user" @click="selectMessage(count, user, $event.target)" style="cursor:pointer">
      <h3 style="padding-left:10px;margin:0">{{ admin() ? user.accountName : 'Admin' }}<span><strong style="color:red;"> {{ newMessagesCount(allUsers()[count]) !== 0 ? '(' + newMessagesCount(allUsers()[count]) + ')' : '' }}</strong></span></h3>
      <p style="padding-left:10px;margin:0">{{ messages.filter(elem=>elem.email == user.email).slice(-1)[0].body }}</p>
    </div>
  </div>
  <div v-if="allUsers().length > 1" style="width:65%">
    <div class="chat-container">
      <div class="chat-messages">
          <div v-for="(message, count) in messages.filter(elem=>elem.email == allUsers()[currentMessage].email)" class="message-container">
              <div :class="message.class">{{ message.body }}<!--div class="w3-small">{{ getCurrentTime(message.time) }}</div--></div>
          </div>
      </div>
      <div class="user-input"><textarea class="messageInput" style="height: 45px;"></textarea> <button 
        @click="sendMessage(allUsers()[currentMessage], $event.target.parentNode)" class="w3-button w3-black" style="border-radius: 10px;"><i 
        class="fa fa-paper-plane"></i></button>
      </div>
    </div>
  </div>
  <div v-if="allUsers().length == 1" style="width:95%">
    <div class="chat-container">
      <div class="chat-messages">
          <div v-for="(message, count) in messages.filter(elem=>elem.email == allUsers()[currentMessage].email)" class="message-container">
              <div :class="message.class">{{ message.body }}<!--div class="w3-small">{{ getCurrentTime(message.time) }}</div--></div>
          </div>
      </div>
      <div class="user-input"><textarea @click="clearNewMessage()" class="messageInput" style="height: 45px;"></textarea> <button 
        @click="sendMessage(allUsers()[currentMessage], $event.target.parentNode)" class="w3-button w3-black" style="border-radius: 10px;"><i 
        class="fa fa-paper-plane"></i></button>
      </div>
    </div>
  </div>
  <div v-if="allUsers().length == 0" style="width:95%">
    <div class="chat-container">
      <div class="chat-messages">
          <div v-for="(message, count) in messages" class="message-container">
              <div :class="message.class">{{ message.body }}<!--div class="w3-small">{{ getCurrentTime(message.time) }}</div--></div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>`

function processUpdates() {

  updatesVue = new Vue({
        el: document.querySelector('#updates'),
        data: {
          display: false,
          messages: [],
          sortMessages: [],
          currentMessage: 0,
        },
        computed: {
          
        },
        methods: {
          newMessagesCount(user) {
            return newMessages.filter(elem=>user.email == elem.email && user.accountName == elem.accountName).length
          },
          selectMessage(count, user) {
            const prepareNewMessage = newMessages.filter(elem=>user.email !== elem.email && user.accountName !== elem.accountName)
            newMessages = [].concat(prepareNewMessage)
            if (document.querySelector('.selected')) {
              document.querySelector('.selected').classList.remove('selected')
            }
            document.querySelectorAll('.user')[count].classList.add('selected')
            this.currentMessage = count
            if (newMessages.length !== 0) {
                document.querySelector('#updateCount-1').innerHTML = `<strong style="color:red;"> (${newMessages.length})</strong>`
                document.querySelector('#updateCount-2').innerHTML = `<strong style="color:red;"> (${newMessages.length})</strong>`
            } else {
              document.querySelector('#updateCount-1').innerHTML = ``
              document.querySelector('#updateCount-2').innerHTML = ``
            }
          },
          allUsers() {
            return getUniqueElementsByProperty(this.sortMessages, ['email'])
          },
          mode() {
            return 'w3-bar-item w3-button ' + mode.replace('w3-card ','')
          },
          admin() {
            return navigationVue.admin
          },
          getCurrentTime(date) {
            var now = new Date(date);
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var timeString = hours + ':' + minutes + ' ' + ampm;
            return timeString;
          },
          clearNewMessage() {
            if (newMessages.length !== 0 && updatesVue.allUsers().length == 1) {
              document.querySelector('#updateCount-1').innerHTML = ``
              document.querySelector('#updateCount-2').innerHTML = ``
              newMessages.length = 0
            }
          },
          sendMessage(user, event) {
            if (newMessages.length !== 0 && updatesVue.allUsers().length == 1) {
              document.querySelector('#updateCount-1').innerHTML = ``
              document.querySelector('#updateCount-2').innerHTML = ``
              newMessages.length = 0
            }
            currentMessage = {
              "email": user.email,
              "firstname": user.accountName,
              "body": event.parentNode.querySelector("textarea").value
            }
            sendMessage(event.parentNode.querySelector("textarea"))
          }
        }
    })
}

var newMessages = [];

function getUniqueElementsByProperty(arr, propNames) {
  const uniqueSet = new Set();
  
  return arr.filter(obj => {
      const key = propNames.map(prop => obj[prop]).join('|');
      if (!uniqueSet.has(key)) {
          uniqueSet.add(key);
          return true;
      }
      return false;
  });
}

function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var timeString = hours + ':' + minutes + ' ' + ampm;
  return timeString;
}

function sendMessage(element) {
  document.getElementById('sendButton').click()
  element.value = "";
}

processUpdates()

document.querySelector('#admin').innerHTML = `<template>
<div class="outer-container" :style="slides[slideCount].style">
  <div class="inner-container">
    <div v-html="slides[slideCount].content" class="centered-div w3-text-brown" style="padding:48px;background: #ffffffef;">
      
    </div>
  </div>
</div>
</template>`

function processAdmin() {

  adminVue = new Vue({
        el: document.querySelector('#admin'),
        data: {
          display: false,
          slides: [
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">THE BOOT CAMP on Mentorship</span><br>
            <span class="w3-xxlarge w3-hide-small">To Attain GLOBAL Certifications</span><br>
            <span class="w3-xlarge w3-hide-small"> - A New Vista & Gateway to  International job Mobility</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Today's Reality:</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Today's Reality:</span><br>
            <ul>
              <li class="w3-xxlarge">Loss in value of the National Currency</li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Today's Reality:</span><br>
            <ul>
              <li class="w3-xxlarge">Loss in value of the National Currency</li>
              <li class="w3-xxlarge">Spiraling Inflation</li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Today's Reality:</span><br>
            <ul>
              <li class="w3-xxlarge">Loss in value of the National Currency</li>
              <li class="w3-xxlarge">Spiraling Inflation</li>
              <li class="w3-xxlarge">Unprecedented unemployment rate</li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Today's Reality:</span><br>
            <ul>
              <li class="w3-xxlarge">Loss in value of the National Currency</li>
              <li class="w3-xxlarge">Spiraling Inflation</li>
              <li class="w3-xxlarge">Unprecedented unemployment rate</li>
              <li class="w3-xxlarge"><strong>Frustration</strong></li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Direction of traffic:</span><br>
            <ul>
                <li class="w3-xxlarge">Leverage on soft skills, <em>no matter our educational level.</em><ul>
                <li class="w3-xxlarge">Right Instructors that will teach you from <strong>Newbie</strong> to <strong>Pro</strong></li>
                <li class="w3-xxlarge">Right Resources</li>
                <li class="w3-xxlarge">Firm Commitment</li>
                </ul>
              </li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">The world has transitioned:</span><br>
            <ul>
              <li class="w3-xxlarge">AI<span> - Artificial Intelligence</span></li>
              <li class="w3-xxlarge">IOT<span> - Internet of Things</span></li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Stay afloat:</span><br>
            <ul>
              <li class="w3-xxlarge">Follow the direction of<em> traffic.</em></li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Q&A</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Who is a Business Analyst?</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-xxlarge">This is a person who processes, interprets and documents business processes, products, services and software through analysis of data.</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">What does a Data Analyst do?</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-xxlarge">Collect, clean, study and interpret data sets in order to answer a question or solve a problem.</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Is this for only those who have studied subjects related to IT or Computer?</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-xxlarge">No. Everything, just everything we know now, we learned them. We’ve all got the potential. Our Brain never gets full and you don’t need to delete any file for a lack of storage.</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Can I become a data analyst without a degree?</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-xxlarge">Yes. It is not always necessary to have a degree to get hired as a data analyst. Data analysts are in demand, and employers want to know that you have the skills to do the job. If you don't have a degree, focus on making your portfolio shine with your best.</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Can I become a business analyst with no experience?</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-xxlarge">When preparing your CV, include transferable skills. Even if you don't have direct experience in business analysis, you likely have transferable skills that can be applied to the role. Keywords like problem-solving, project management, and communication are all valuable skills for a business analyst.</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">What then, is needed?</span>`},
            {"style": "background-position: 200% 100%", "content":`<ul>
              <li class="w3-xxlarge">Mentoring <span> - that's what you've started having at the moment.</span>
                <ul>
                  <li>Telling you what is happening at the moment</li>
                  <li>Prompting you to act now</li>
                </ul>
              </li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Then</span><br>
            <ul>
              <li class="w3-xxlarge">Study<span><em> at your own pace</em> with video on Demand.</span></li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Then</span><br>
            <ul>
              <li class="w3-xxlarge">Study<span><em> at your own pace</em> with video on Demand.</span>
                <ul>
                  <li>Certification</li>
                </ul>
              </li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Then</span><br>
            <ul>
              <li class="w3-xxlarge">Study<span><em> at your own pace</em> with video on Demand.</span>
                <ul>
                  <li>Certification</li>
                  <li>Full lifetime access</li>
                </ul>
              </li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Then</span><br>
            <ul>
              <li class="w3-xxlarge">Study<span><em> at your own pace</em> with video on Demand.</span>
                <ul>
                  <li>Certification</li>
                  <li>Full lifetime access</li>
                  <li>Downloadable resources for your library</li>
                </ul>
              </li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Then</span><br>
            <ul>
              <li class="w3-xxlarge">Study<span><em> at your own pace</em> with video on Demand.</span>
                <ul>
                  <li>Certification</li>
                  <li>Full lifetime access</li>
                  <li>Downloadable resources for your library</li>
                </ul>
              </li>
            </ul>
            <span class="w3-xxlarge w3-hide-small"><strong>Please note, this could be achieved in less than 12 months from tonight.</strong></span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-xxlarge w3-hide-small">The courses to be covered are the basic foundation upon which, each candidate could top up at their own time and pace.</span>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">Next</span><br>
            <ul>
              <li class="w3-xxlarge">Prepare your CV</li>
              <li class="w3-xxlarge">Start applying for jobs globally</li>
            </ul>`},
            {"style": "background-position: 200% 100%", "content":`<span class="w3-jumbo w3-hide-small">This entire Package will go for ??</span>`},
            {"style": "background: #fff", "content":`<div style="font-size:64px; margin-bottom:50px">If you are interested, please kindly send an email to: analystbcamp@gmail.com</div>
            <!--div style="font-size:24px;font-weight:700">
              <ol>
                <li>Go to Menu (On mobile device) OR click LOGIN > then Sign Up to Create an account</li>
                <li>Verify email by checking for link in your Inbox, Spam or Junk</li>
                <li>Click link</li>
                <li>Refresh the page</li>
                <li>Click UPDATES and send your message.</li>
              <ol>
            </div-->`},
            {"style": "background-position: 200% 100%", "content":`<h1 style="font-size:128px">Thank you!</h1>`},
        ],
          slideCount: 0,
        },
        computed: {

        },
        methods: {
			
          mode() {
            return 'w3-bar-item w3-button ' + mode.replace('w3-card ','')
          },
        }
    })
}

processAdmin()

document.addEventListener('keydown', function (e) {
  if (adminVue.display !== true) {return}
  switch (e.key) {
    case 'ArrowRight':
      if (adminVue.slideCount == adminVue.slides.length - 1) {adminVue.slideCount = -1}
      adminVue.slideCount++;
      break;
    case 'ArrowLeft':
      if (adminVue.slideCount == 0) {adminVue.slideCount = adminVue.slides.length}
      adminVue.slideCount--;
      break;
    case 'ArrowDown':
      if (adminVue.slideCount == adminVue.slides.length - 1) {adminVue.slideCount = -1}
      adminVue.slideCount++;
      break;
    case 'ArrowUp':
      if (adminVue.slideCount == 0) {adminVue.slideCount = adminVue.slides.length}
      adminVue.slideCount--;
      break;
    case 'Enter':
      document.querySelector(".w3-top").style.display = 'none';
      break;
    case 'Escape':
      document.querySelector(".w3-top").style.display = '';
      break;
  }
});

async function gotoView(button) {
	homeVue.display = false
	aboutVue.display = false
	coursesVue.display = false
	qaVue.display = false
  adminVue.display = false
  updatesVue.display = false
  
  if (button == 'loginPageVue') {
    document.querySelector('#loginPage').style.display = ''
    return
  } else {
    document.querySelectorAll(".main").forEach((elem) => {
      if (!elem.className.includes('w3-top') && !elem.className.includes('bgimg-3')) {
          elem.style.display = "";
      } 
    });
    document.querySelector(".signIn").style.display = "";
    document.querySelector('#loginPage').style.display = 'none' 
  }
  if (button == 'homeVue') {
    document.querySelector('.bgimg-1').style.display = ''
    document.querySelector('.bgimg-3').style.display = 'none'
  } else if (button == 'adminVue') {
    document.querySelector('.bgimg-3').style.display = ''
    document.querySelector('.bgimg-1').style.display = 'none' 
  } else {
    document.querySelector('.bgimg-1').style.display = 'none'
    document.querySelector('.bgimg-3').style.display = 'none'
  }
  if (button == 'updatesVue' && updatesVue.allUsers().length == 1) {
    document.querySelector('#updateCount-1').innerHTML = ``
    document.querySelector('#updateCount-2').innerHTML = ``
    newMessages.length = 0
  }
  window[`${button}`].display = true
  await shortWait()
  if (button == 'updatesVue' && updatesVue.allUsers().length > 1) {
    document.querySelectorAll('.user')[updatesVue.currentMessage].classList.add('selected')
  }
}

async function shortWait() {
  await new Promise((e) => setTimeout(e, 50));
}
