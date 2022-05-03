<?php

$conn = mysqli_connect('sophia.cs.hku.hk', 'wkchu', 'rikid77', 'wkchu') or die('Error! ' . mysqli_connect_error($conn));
session_start();

if (isset($_POST['username'])) {
    if (isset($_SESSION['userId'])) {
        echo "Invalid login, Please log out your current account first";
    }

    $username = $_POST['username'];
    $pwd = $_POST['pwd'];
    $query = 'SELECT * FROM Login WHERE userId = "' . $username . '"';
    $result = mysqli_query($conn, $query) or die("Query Error!" . mysqli_error($conn));

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        if ($row['pw'] == $pwd) {
            $_SESSION['userId'] = $username;
            session_write_close();
            echo "Success";
        } else {
            echo 'Invalid login, please login again';
        }

    } else if (mysqli_num_rows($result) == 0) {
        echo 'User is not registered';
    } else {
        echo 'More than one users are registered';
    }
} else if (isset($_GET['action']) && $_GET['action'] == 'logout') {
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }
    session_unset();
    session_destroy();

    print "Done";
} else {
    if (isset($_SESSION['userId'])) {
        echo "isAuthenticated";
    }
}

mysqli_free_result($result);
mysqli_close($conn);
