/* SignUp.html: */

// NUME:
// Funcția de validare a numelui de utilizator
function validateUsernameSignUp() {
    var usernameInput = document.getElementById("name");
    var usernameValidIndicator = document.getElementById("username-valid-indicator-SignUp");
    var usernameErrorMessage = document.getElementById("username-error-message-SignUp");
    var username = usernameInput.value.trim(); // Se elimină spațiile albe de la începutul și sfârșitul numelui

    var regex = /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*$/; // Regex pentru a verifica fiecare nume introdus

    if (regex.test(username) && username.length > 1) {
        // Setează indicatorul vizual pentru validare corectă
        usernameInput.classList.remove("invalid");
        usernameInput.classList.add("valid");
        usernameErrorMessage.innerHTML = ""; // Șterge mesajul de eroare
        return true;
    } else {
        // Setează indicatorul vizual pentru validare incorectă
        usernameInput.classList.remove("valid");
        usernameInput.classList.add("invalid");
        displayErrorMessage("Numele trebuie să înceapă cu o literă mare și să conțină cel puțin două caractere!");
        return false;
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------


// PAROLĂ:
// Funcția de validare a parolei
function validatePasswordSignUp() {
    var passwordInput = document.getElementById("password");
    var passwordValidIndicator = document.getElementById("password-valid-indicator-SignUp");
    var passwordErrorMessage = document.getElementById("password-error-message-SignUp");
    var password = passwordInput.value;

    // Verificăm parola cu ajutorul expresiilor regulate
    var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (regex.test(password)) {
        // Setăm indicatorul vizual pentru validare corectă
        passwordInput.classList.remove("invalid");
        passwordInput.classList.add("valid");
        passwordErrorMessage.innerHTML = ""; // Ștergem mesajul de eroare
        return true;
    } else {
        // Setăm indicatorul vizual pentru validare incorectă
        passwordInput.classList.remove("valid");
        passwordInput.classList.add("invalid");
        displayErrorMessage("Parola trebuie să conțină cel puțin 8 caractere, o literă mare, o cifră și un caracter special (@$!%*?&)!");
        return false;
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------


// CONFIRMAREA PAROLEI:
// Funcția de validare a confirmării parolei
function validateConfirmPasswordSignUp() {
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("confirmPassword");
    var confirmPasswordErrorMessage = document.getElementById("confirm-password-error-message-SignUp");

    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === password) {
        // Setează indicatorul vizual pentru validare corectă
        confirmPasswordInput.classList.remove("invalid");
        confirmPasswordInput.classList.add("valid");
        confirmPasswordErrorMessage.innerHTML = ""; // Ștergem mesajul de eroare
        return true;
    } else {
        // Setează indicatorul vizual pentru validare incorectă
        confirmPasswordInput.classList.remove("valid");
        confirmPasswordInput.classList.add("invalid");
        displayErrorMessage("Parola și confirmarea parolei nu se potrivesc! Confirmarea parolei trebuie să fie aceeași cu parola introdusă!");
        return false;
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------


// Funcția de validare a opțiunii selectate
function validateUserTypeSignUp() {
    var userTypeInput = document.getElementById("userType");
    var userTypeValidIndicator = document.getElementById("user-type-valid-indicator-SignUp");

    if (userTypeInput.value !== "") {
        // Setează indicatorul vizual pentru validare corectă
        userTypeInput.classList.remove("invalid");
        userTypeInput.classList.add("valid");
        return userTypeValue; // Returnează valoarea selectată din meniu
    } else {
        // Setează indicatorul vizual pentru validare incorectă
        userTypeInput.classList.remove("valid");
        userTypeInput.classList.add("invalid");
        return false;
    }
}

// Funcția de validare a formularului
function validateForm() {
    var isUsernameValid = validateUsernameSignUp();
    var isPasswordValid = validatePasswordSignUp();
    var isConfirmPasswordValid = validateConfirmPasswordSignUp();
    var isUserTypeValid = validateUserTypeSignUp();

    if (isUsernameValid && isPasswordValid && isConfirmPasswordValid && isUserTypeValid) {
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;
        var userType = document.getElementById("userType").value;

        // Trimite datele către server folosind Ajax
        var xhttp = new XMLHttpRequest();
        /*xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Aici redirecționez utilizatorul către pagina de Sign In.
                window.location.href = "SignIn.html";
            }
        };*/
        window.location.href = "SignIn.html";
        xhttp.open("POST", "SignUpPhp.php", true); // modificarea căii către fișierul PHP care va procesa datele
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("name=" + name + "&password=" + password + "&userType=" + userType);

        return false; // Oprire trimitere formular
    } else {
        return false;
    }
}



//----------------------------------------------------------------------------------------------------------------------------------------------------------------


// Pentru mesajul de eroare:
// Pentru afișarea casetei de eroare
function displayErrorMessage(message) {
    var errorMessageContainer = document.getElementById("error-message-container");
    var errorMessage = document.getElementById("error-message");

    errorMessage.innerHTML = message;
    errorMessageContainer.classList.add("show-error"); // Adăugarea clasei pentru afișarea casetei de eroare
}

// Pentru ascunderea casetei de eroare
function hideErrorMessage() {
    var errorMessageContainer = document.getElementById("error-message-container");
    errorMessageContainer.classList.remove("show-error"); // Eliminarea clasei pentru ascunderea casetei de eroare
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------


// Obține elementele de input
var usernameInput = document.getElementById("name");
var passwordInput = document.getElementById("password");
var confirmPasswordInput = document.getElementById("confirmPassword");
var userTypeInput = document.getElementById("userType");

// Adaugă ascultători pentru evenimentele de introducere a datelor

//----------------------------------------------------------------------------------------


usernameInput.addEventListener("input", function() {
    // Verifică numele introdus
    var isUsernameValid = validateUsernameSignUp();

    // Dacă numele este valid, ascunde mesajul de eroare
    if (isUsernameValid) {
        hideErrorMessage();
    }
});

// Adaugă un ascultător pentru evenimentul de părăsire a casetei de introducere a numelui
usernameInput.addEventListener("blur", function() {
    // Verifică din nou numele introdus înainte de a părăsi caseta de introducere a numelui
    validateUsernameSignUp();
});

//----------------------------------------------------------------------------------------


passwordInput.addEventListener("input", function() {
    // Verifică parola introdusă
    var isPasswordValid = validatePasswordSignUp();

    // Dacă parola este validă, ascunde mesajul de eroare
    if (isPasswordValid) {
        hideErrorMessage();
    }
});

passwordInput.addEventListener("blur", function(){
    // Verifică parola introdusă înainte de a părăsi caseta de introducere a parolei
    validatePasswordSignUp();
});

//----------------------------------------------------------------------------------------


confirmPasswordInput.addEventListener("input", function() {
    var isConfirmPasswordValid = validateConfirmPasswordSignUp();

    if (isConfirmPasswordValid) {
        hideErrorMessage();
    }
})

confirmPasswordInput.addEventListener("blur", function() {
    validateConfirmPasswordSignUp();
});

//----------------------------------------------------------------------------------------


userTypeInput.addEventListener("change", function() {
    validateUserTypeSignUp();
});
