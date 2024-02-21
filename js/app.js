// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

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

function signIn() {
  w3_close();
  document.querySelectorAll(".main").forEach((elem) => {
    elem.style.display = "none";
  });
  document.querySelector(".signIn").style.display = "";
}

function goBack() {
    if (loginForm.confirmPassword.style.display == "") {
        //document.getElementById("securityQuestions").style.display = "none";
        loginForm.confirmPassword.style.display = "none";
        document.getElementById("signUp").style.display = "";
        loginErrorMsg.style.opacity = 0;
    } else {
        document.querySelectorAll(".main").forEach((elem) => {
            elem.style.display = "";
        });
        document.querySelector(".signIn").style.display = "none";
        //document.getElementById("securityQuestions").style.display = "none";
        loginForm.confirmPassword.style.display = "none";
    
    }
    loginButton.innerHTML = '<i class="fa fa-sign-in"></i> LOGIN'
    loginErrorMsg.style.opacity = 0;
    loginForm.reset()
    w3_close()
}

function signUp() {
  loginButton.innerText = 'SIGN UP'
  //document.getElementById("securityQuestions").style.display = "";
  loginForm.confirmPassword.style.display = "";

  document.getElementById("signUp").style.display = "none";
}

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const defaultLogin = loginButton.innerHTML;
const loginErrorMsg = document.getElementById("login-error-msg");
loginForm.confirmPassword.style.display = "none";
//document.getElementById("securityQuestions").style.display = "none";
loginErrorMsg.style.opacity = 0;

var securityQuestions = [
  {
    value: "What was your childhood best friend’s nickname?",
    label: "What was your childhood best friend’s nickname?",
  },
  {
    value: "In which city did your parents meet?",
    label: "In which city did your parents meet?",
  },
  {
    value: "What’s your neighbor’s last name?",
    label: "What’s your neighbor’s last name?",
  },
  {
    value: "How many pets did you have at 10 years old?",
    label: "How many pets did you have at 10 years old?",
  },
  {
    value: "What month did you get married?",
    label: "What month did you get married?",
  },
];

function createRadioButtons(containerId, options) {
  var container = document.getElementById(containerId);

  options.forEach(function (option) {
    var radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "securityGroup"; // All radio buttons with the same name belong to the same group
    radioBtn.value = option.value;

    var paragraph = document.createElement("br");
    var label = document.createElement("label");
    radioBtn.style.marginRight = "5px";
    label.appendChild(radioBtn);
    label.appendChild(document.createTextNode(option.label));
    container.appendChild(label);

    container.appendChild(paragraph);
  });
  var answerInput = document.createElement("input");
  answerInput.id = "answer";
  answerInput.type = "text";
  answerInput.placeholder = "Enter answer here";
  answerInput.classList = "w3-input w3-border";
  container.appendChild(answerInput);
}

function getSelectedOption(radioButtons) {
  //var radioButtons = document.getElementsByName("securityGroup");

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      var selectedOption = radioButtons[i].value;
      //console.log("Selected Option: " + selectedOption);
      return selectedOption;
    }
  }

  console.log("No option selected");
}

//createRadioButtons("securityQuestions", securityQuestions);

var logged = false
var currentUser = undefined
