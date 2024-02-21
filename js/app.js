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
        document.getElementById("securityQuestions").style.display = "none";
        loginForm.confirmPassword.style.display = "none";
        document.getElementById("signUp").style.display = "";
        loginErrorMsg.style.opacity = 0;
    } else {
        document.querySelectorAll(".main").forEach((elem) => {
            elem.style.display = "";
        });
        document.querySelector(".signIn").style.display = "none";
        document.getElementById("securityQuestions").style.display = "none";
        loginForm.confirmPassword.style.display = "none";
    
        loginButton.innerHTML = '<i class="fa fa-sign-in"></i> LOGIN'
        loginErrorMsg.style.opacity = 0;
    }
    loginForm.reset()  
}

function signUp() {
  loginButton.innerText = 'SIGN UP'
  document.getElementById("securityQuestions").style.display = "";
  loginForm.confirmPassword.style.display = "";

  document.getElementById("signUp").style.display = "none";
}

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const defaultLogin = loginButton.innerHTML;
const loginErrorMsg = document.getElementById("login-error-msg");
loginForm.confirmPassword.style.display = "none";
document.getElementById("securityQuestions").style.display = "none";
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

createRadioButtons("securityQuestions", securityQuestions);

var logged = false
var currentUser = undefined

/*
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
  
    if (
        "" == username ||
        " " == username ||
        username.includes(" ")
      ) {
        loginErrorMsg.innerHTML = "Please enter a valid username.";
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
      } else if (
        "No option selected" ==
          getSelectedOption(document.getElementsByName("securityGroup"))
      ) {
        loginErrorMsg.innerHTML = "Please select a question.";
        loginErrorMsg.style.opacity = 1
      } else if (
        "" == document.querySelector("#answer").value.toLowerCase()
      ) {
        loginErrorMsg.innerHTML = "Please enter a valid answer.";
        loginErrorMsg.style.opacity = 1
      } else {
        
        console.log("You have successfully logged in.");
        document.getElementById("securityQuestions").style.display = "none";
        loginForm.reset()
        loginForm.confirmPassword.style.display = "none";
        
        logged = true;
        
        loginErrorMsg.style.opacity = 0;
        goBack()
    }
  });*/
/*
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  if (loginButton.value == "Create Account") {
    if (
      "" == username ||
      " " == username ||
      username.includes(" ") ||
      username.toLowerCase() == "reporter"
    ) {
      loginErrorMsg.innerHTML = "Please enter a different username.";
    } else if (
      "No option selected" ==
        getSelectedOption(document.getElementsByName("securityGroup")) ||
      "" == document.querySelector("#answer").value.toLowerCase()
    ) {
      loginErrorMsg.innerHTML = "Please select question and enter answer.";
    } else if (loginForm.password.value !== loginForm.confirmPassword.value) {
      loginErrorMsg.innerHTML = "Password is not the same.";
    } else if (
      allUsers.findIndex(
        (elem) => elem.username.toLowerCase() == username.toLowerCase()
      ) !== -1
    ) {
      var existingUser = allUsers.filter(
        (elem) => elem.username.toLowerCase() == username.toLowerCase()
      )[0];
      if (
        existingUser.accesses.findIndex((str) =>
          currentUser.accesses.includes(str)
        ) !== -1
      ) {
        loginErrorMsg.innerHTML =
          "User already exists. Please enter a different username.";
      } else if (existingUser.password !== password) {
        loginErrorMsg.innerHTML = "Invalid password.";
      } else if (
        existingUser.selectedQuestion !==
          getSelectedOption(document.getElementsByName("securityGroup")) ||
        existingUser.answer.trim() !==
          document.querySelector("#answer").value.toLowerCase().trim()
      ) {
        loginErrorMsg.innerHTML = "Invalid question and/or answer.";
      } else {
        console.log("You have successfully logged in.");
        document.getElementById("securityQuestions").style.display = "none";
        loginForm.username.value = "";
        loginForm.password.value = "";
        loginForm.confirmPassword.value = "";
        loginForm.confirmPassword.style.display = "none";
        hiddenElements.forEach((elem) => {
          document.getElementById(`${elem}`).style.display = "";
        });
        logged = true;
        existingUser.accesses = existingUser.accesses.concat(
          currentUser.accesses
        );
        currentUser = existingUser;

        document.getElementById("home").style.display = "none";
        DBWorker.postMessage({
          storeName: "settings",
          action: "save",
          value: [currentUser],
        });
        DBWorker.postMessage({
          dbName: "cong-" + currentUser.username.toLowerCase(),
          action: "init",
        });
        loginErrorMsg.style.opacity = 0;
      }
    } else {
      currentUser.username = loginForm.username.value;
      currentUser.password = loginForm.password.value;
      currentUser.selectedQuestion = getSelectedOption(
        document.getElementsByName("securityGroup")
      );
      currentUser.answer = document
        .querySelector("#answer")
        .value.toLowerCase()
        .trim();
      configurationVue.selectedProfile = currentUser.currentProfile;
      if (currentUser.currentProfile == "Service Overseer") {
        console.log("You have successfully logged in.");
        document.getElementById("securityQuestions").style.display = "none";
        loginForm.username.value = "";
        loginForm.password.value = "";
        loginForm.confirmPassword.value = "";
        loginForm.confirmPassword.style.display = "none";
        currentUser.name = currentUser.username;
        hiddenElements.forEach((elem) => {
          document.getElementById(`${elem}`).style.display = "";
        });
        logged = true;
        //reportEntry = true

        allUsers.push(currentUser);

        document.getElementById("home").style.display = "none";
        DBWorker.postMessage({
          storeName: "settings",
          action: "save",
          value: [currentUser],
        });
        DBWorker.postMessage({
          dbName: "cong-" + currentUser.username.toLowerCase(),
          action: "init",
        });
        loginErrorMsg.style.opacity = 0;
      }
      if (currentUser.currentProfile == "Territory Map") {
        console.log("You have successfully logged in.");
        document.getElementById("securityQuestions").style.display = "none";
        loginForm.username.value = "";
        loginForm.password.value = "";
        loginForm.confirmPassword.value = "";
        loginForm.confirmPassword.style.display = "none";
        currentUser.name = currentUser.username;
        hiddenElements.forEach((elem) => {
          document.getElementById(`${elem}`).style.display = "";
        });
        logged = true;
        //reportEntry = true

        allUsers.push(currentUser);

        document.getElementById("home").style.display = "none";
        DBWorker.postMessage({
          storeName: "settings",
          action: "save",
          value: [currentUser],
        });
        DBWorker.postMessage({
          dbName: "cong-" + currentUser.username.toLowerCase(),
          action: "init",
        });
        loginErrorMsg.style.opacity = 0;
      }
      if (currentUser.currentProfile == "Territory Servant") {
        console.log("You have successfully logged in.");
        document.getElementById("securityQuestions").style.display = "none";
        loginForm.username.value = "";
        loginForm.password.value = "";
        loginForm.confirmPassword.value = "";
        loginForm.confirmPassword.style.display = "none";
        currentUser.name = currentUser.username;
        hiddenElements.forEach((elem) => {
          document.getElementById(`${elem}`).style.display = "";
        });
        logged = true;
        //reportEntry = true

        allUsers.push(currentUser);

        document.getElementById("home").style.display = "none";
        DBWorker.postMessage({
          storeName: "settings",
          action: "save",
          value: [currentUser],
        });
        DBWorker.postMessage({
          dbName: "cong-" + currentUser.username.toLowerCase(),
          action: "init",
        });
        loginErrorMsg.style.opacity = 0;
      }
      if (currentUser.currentProfile == "Secretary") {
        console.log("You have successfully logged in.");
        document.getElementById("securityQuestions").style.display = "none";
        loginForm.username.value = "";
        loginForm.password.value = "";
        loginForm.confirmPassword.value = "";
        loginForm.confirmPassword.style.display = "none";
        currentUser.name = currentUser.username;
        hiddenElements.forEach((elem) => {
          document.getElementById(`${elem}`).style.display = "";
        });
        logged = true;
        //reportEntry = true

        allUsers.push(currentUser);

        document.getElementById("home").style.display = "none";
        DBWorker.postMessage({
          storeName: "settings",
          action: "save",
          value: [currentUser],
        });
        DBWorker.postMessage({
          dbName: "cong-" + currentUser.username.toLowerCase(),
          action: "init",
        });
        loginErrorMsg.style.opacity = 0;
      } else if (currentUser.currentProfile == "Secretary - Assistant") {
        console.log("You have successfully logged in.");
        document.getElementById("securityQuestions").style.display = "none";
        loginForm.username.value = "";
        loginForm.password.value = "";
        loginForm.confirmPassword.value = "";
        loginForm.confirmPassword.style.display = "none";
        currentUser.name = currentUser.username;
        hiddenElements.forEach((elem) => {
          document.getElementById(`${elem}`).style.display = "";
        });
        logged = true;
        //reportEntry = false
        navigationVue.displayDropdown = true;

        allUsers.push(currentUser);

        document.getElementById("home").style.display = "none";
        DBWorker.postMessage({
          storeName: "settings",
          action: "save",
          value: [currentUser],
        });
        DBWorker.postMessage({
          dbName: "cong-" + currentUser.username.toLowerCase(),
          action: "init",
        });
        loginErrorMsg.style.opacity = 0;
      }
      if (
        currentUser.currentProfile == "Life and Ministry Overseer" ||
        currentUser.currentProfile == "Life and Ministry Assistant"
      ) {
        console.log("You have successfully logged in.");
        document.getElementById("securityQuestions").style.display = "none";
        loginForm.username.value = "";
        loginForm.password.value = "";
        loginForm.confirmPassword.value = "";
        loginForm.confirmPassword.style.display = "none";
        currentUser.name = currentUser.username;
        hiddenElements.forEach((elem) => {
          document.getElementById(`${elem}`).style.display = "";
        });
        logged = true;
        //reportEntry = false
        navigationVue.displayDropdown = true;

        allUsers.push(currentUser);

        document.getElementById("home").style.display = "none";
        DBWorker.postMessage({
          storeName: "settings",
          action: "save",
          value: [currentUser],
        });
        DBWorker.postMessage({
          dbName: "cong-" + currentUser.username.toLowerCase(),
          action: "init",
        });
        loginErrorMsg.style.opacity = 0;
      }
    }
  } else if (
    allUsers.findIndex(
      (elem) =>
        elem.username.toLowerCase() == username.toLowerCase() &&
        elem.password == password
    ) !== -1
  ) {
    console.log("You have successfully logged in.");
    document.getElementById("securityQuestions").style.display = "none";
    loginForm.username.value = "";
    loginForm.password.value = "";
    currentUser = allUsers.filter(
      (elem) =>
        elem.username.toLowerCase() == username.toLowerCase() &&
        elem.password == password
    )[0];
    configurationVue.selectedProfile = currentUser.currentProfile;
    hiddenElements.forEach((elem) => {
      document.getElementById(`${elem}`).style.display = "";
    });
    if (currentUser.currentProfile == "Secretary") {
      //reportEntry = true
    } else if (currentUser.currentProfile == "Secretary - Assistant") {
      //reportEntry = false
    }
    logged = true;
    document.getElementById("home").style.display = "none";
    DBWorker.postMessage({
      dbName: "cong-" + currentUser.username.toLowerCase(),
      action: "init",
    });
    loginErrorMsg.style.opacity = 0;
  } else if (
    username.toLowerCase() === "ministry".toLowerCase() &&
    password === "service"
  ) {
    navigationVue.buttons = [
      {
        title: "BACK",
        function: "missingReportVue",
      },
    ];
    loginButton.innerText = "Create Account";
    document.getElementById("securityQuestions").style.display = "";
    loginErrorMsg.innerHTML = "You will need to create an account to continue:";
    loginForm.username.value = "";
    loginForm.password.value = "";
    loginForm.confirmPassword.style.display = "";
    loginForm.username.select();
    loginButton.value = "Create Account";
    currentUser.accesses = ["so"];
    currentUser.currentProfile = "Service Overseer";
    configurationVue.reportEntry = "so";
    configurationVue.selectedProfile = "Service Overseer";
    loginErrorMsg.style.opacity = 1;
  } else if (
    username.toLowerCase() === "territory".toLowerCase() &&
    password === "map"
  ) {
    navigationVue.buttons = [
      {
        title: "BACK",
        function: "missingReportVue",
      },
    ];
    loginButton.innerText = "Create Account";
    document.getElementById("securityQuestions").style.display = "";
    loginErrorMsg.innerHTML = "You will need to create an account to continue:";
    loginForm.username.value = "";
    loginForm.password.value = "";
    loginForm.confirmPassword.style.display = "";
    loginForm.username.select();
    loginButton.value = "Create Account";
    currentUser.accesses = ["ter"];
    currentUser.currentProfile = "Territory Map";
    configurationVue.reportEntry = "ter";
    configurationVue.selectedProfile = "Territory Map";
    loginErrorMsg.style.opacity = 1;
  } else if (
    username.toLowerCase() === "territory".toLowerCase() &&
    password === "servant"
  ) {
    navigationVue.buttons = [
      {
        title: "BACK",
        function: "missingReportVue",
      },
    ];
    loginButton.innerText = "Create Account";
    document.getElementById("securityQuestions").style.display = "";
    loginErrorMsg.innerHTML = "You will need to create an account to continue:";
    loginForm.username.value = "";
    loginForm.password.value = "";
    loginForm.confirmPassword.style.display = "";
    loginForm.username.select();
    loginButton.value = "Create Account";
    currentUser.accesses = ["terServant"];
    currentUser.currentProfile = "Territory Servant";
    configurationVue.reportEntry = "terServant";
    configurationVue.selectedProfile = "Territory Servant";
    loginErrorMsg.style.opacity = 1;
  } else if (
    username.toLowerCase() === "lifeAndMinistry".toLowerCase() &&
    password === "handler"
  ) {
    navigationVue.buttons = [
      {
        title: "BACK",
        function: "missingReportVue",
      },
    ];
    loginButton.innerText = "Create Account";
    document.getElementById("securityQuestions").style.display = "";
    loginErrorMsg.innerHTML = "You will need to create an account to continue:";
    loginForm.username.value = "";
    loginForm.password.value = "";
    loginForm.confirmPassword.style.display = "";
    loginForm.username.select();
    loginButton.value = "Create Account";
    currentUser.accesses = ["lmo"];
    currentUser.currentProfile = "Life and Ministry Overseer";
    configurationVue.reportEntry = "lmo";
    configurationVue.selectedProfile = "Life and Ministry Overseer";
    loginErrorMsg.style.opacity = 1;
  } else if (
    username.toLowerCase() === "lifeAndMinistry".toLowerCase() &&
    password === "assist"
  ) {
    navigationVue.buttons = [
      {
        title: "BACK",
        function: "missingReportVue",
      },
    ];
    loginButton.innerText = "Create Account";
    document.getElementById("securityQuestions").style.display = "";
    loginErrorMsg.innerHTML = "You will need to create an account to continue:";
    loginForm.username.value = "";
    loginForm.password.value = "";
    loginForm.confirmPassword.style.display = "";
    loginForm.username.select();
    loginButton.value = "Create Account";
    currentUser.accesses = ["lma"];
    currentUser.currentProfile = "Life and Ministry Assistant";
    configurationVue.reportEntry = "lma";
    configurationVue.selectedProfile = "Life and Ministry Assistant";
    loginErrorMsg.style.opacity = 1;
  } else if (
    username.toLowerCase() === "reporter".toLowerCase() &&
    password === "reportEntry"
  ) {
    navigationVue.buttons = [
      {
        title: "BACK",
        function: "missingReportVue",
      },
    ];
    loginButton.innerText = "Create Account";
    document.getElementById("securityQuestions").style.display = "";
    loginErrorMsg.innerHTML = "You will need to create an account to continue:";
    loginForm.username.value = "";
    loginForm.password.value = "";
    loginForm.confirmPassword.style.display = "";
    loginForm.username.select();
    loginButton.value = "Create Account";
    currentUser.accesses = ["sendReport"];
    currentUser.currentProfile = "Secretary - Assistant";
    configurationVue.reportEntry = "sendReport";
    configurationVue.selectedProfile = "Secretary - Assistant";
    loginErrorMsg.style.opacity = 1;
  } else if (
    username.toLowerCase() === "reporter".toLowerCase() &&
    password === "sec"
  ) {
    navigationVue.buttons = [
      {
        title: "BACK",
        function: "missingReportVue",
      },
    ];
    loginButton.innerText = "Create Account";
    document.getElementById("securityQuestions").style.display = "";
    loginErrorMsg.innerHTML = "You will need to create an account to continue:";
    loginForm.username.value = "";
    loginForm.password.value = "";
    loginForm.confirmPassword.style.display = "";
    loginForm.username.select();
    loginButton.value = "Create Account";
    currentUser.accesses = ["secretary"];
    currentUser.currentProfile = "Secretary";
    configurationVue.reportEntry = "secretary";
    configurationVue.selectedProfile = "Secretary";
    loginErrorMsg.style.opacity = 1;
  } else {
    loginForm.password.value = "";
    loginErrorMsg.style.opacity = 1;
  }
});
*/
