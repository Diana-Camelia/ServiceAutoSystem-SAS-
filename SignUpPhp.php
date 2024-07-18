<?php
    $servername = "localhost"; // Poate rămâne localhost sau poți folosi adresa IP a serverului MySQL
    $username = "root"; // Numele de utilizator implicit pentru MySQL în XAMPP este "root"
    $password = ""; // Parola implicită pentru MySQL în XAMPP este ""
    $DBname = "programareweb"; // Numele bazei de date pe care ai creat-o în phpMyAdmin
    

    /*$servername = "localhost";
    $username = "postgres";
    $passwordDB = "123456abcdef";
    $DBname = "ProgramareWeb";*/

    // Crearea conexiunii
    $conn = new mysqli($servername, $username, $passwordDB, $DBname);

    // Verificați conexiunea
    if ($conn->connect_error) {
        die("Conexiunea la baza de date a eșuat: " . $conn->connect_error);
    }

    // Preia datele trimise de la client
    $name = $_POST['name'];
    $password = $_POST['password'];
    $userType = $_POST['userType'];

    // Escapare datele pentru a preveni SQL injection
    $name = mysqli_real_escape_string($conn, $name);
    $password = mysqli_real_escape_string($conn, $password);
    $userType = mysqli_real_escape_string($conn, $userType);

    // Interogare INSERT pentru adăugarea unui nou client în tabelul Users
    //$sql = "INSERT INTO public.\"Users\" (nume, parola, tip_utilizator) VALUES ('$name', '$password', '$userType')";
    //7$sql = "INSERT INTO users (nume, parola, tip_user) VALUES ('Ana Maria', 'UrsPanda1@', 'Client')";

    $sql = "INSERT INTO users (nume, parola, tip_user) VALUES ('$name', '$password', '$userType')";

    if ($conn->query($sql) === TRUE) {
        echo "Datele clientului au fost adăugate cu succes!";
    } 
    else {
        echo "Eroare la adăugarea datelor: " . $conn->error;
    }

    // Închideți conexiunea
    $conn->close();
