<?php
$conn = mysqli_connect('sophia.cs.hku.hk', 'wkchu', 'rikid77', 'wkchu') or die('Error! ' . mysqli_connect_error($conn));

if (isset($_POST['username']) and isset($_POST['pwd'])) {
    $username = $_POST['username'];
    $pwd = $_POST['pwd'];
    $query = 'SELECT * FROM Login WHERE userId = "' . $username . '"';
    $result = mysqli_query($conn, $query) or die("Query Error!" . mysqli_error($conn));

    if (mysqli_num_rows($result) == 0) {
        $query = "INSERT INTO Login VALUES ('$username','$pwd')";
        mysqli_query($conn, $query) or die("Fail to Register" . mysqli_error($conn));
        echo "Success";

    } else {
        echo "Fail";
    }
} else if (isset($_GET['username'])) {

    $username = $_GET['username'];
    $query = 'SELECT * FROM Login WHERE userId = "' . $username . '"';

    $result = mysqli_query($conn, $query) or die("Query Error!" . mysqli_error($conn));

    if (mysqli_num_rows($result) == 0) {
        mysqli_query($conn, $query) or die("Registered" . mysqli_error($conn));
        echo "Valid";
    } else {
        echo "Invalid";
    }

}

mysqli_free_result($result);
mysqli_close($conn);
