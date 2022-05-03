<?php
session_start();

$conn = mysqli_connect('sophia.cs.hku.hk', 'wkchu', 'rikid77', 'wkchu') or die('Error! ' . mysqli_connect_error($conn));

if (isset($_SESSION['userId']) and isset($_POST['musicId']) and isset($_POST['quantity'])) {
    //Insert / Update cart when add to cart is pressed
    $musicId = $_POST['musicId'];
    $userId = $_SESSION['userId'];
    $quantity = $_POST['quantity'];

    $query = "SELECT * FROM Cart WHERE `userId` ='$userId'AND `musicId`='$musicId'";
    $result = mysqli_query($conn, $query) or die("Query Error!" . mysqli_error($conn));
    if (mysqli_num_rows($result) == 0) {
        $query = "INSERT INTO `Cart`( `musicId`, `userId`, `quantity`) VALUES ('$musicId','$userId' ,'$quantity' )";
        mysqli_query($conn, $query) or die("Fail to add to cart" . mysqli_error($conn));
        echo "SUCCESS Added";
    } else {
        $query = "UPDATE `Cart` SET quantity=quantity+$quantity WHERE  `userId` ='$userId'AND `musicId`='$musicId'";
        mysqli_query($conn, $query) or die("Fail to update the cart" . mysqli_error($conn));
        echo "SUCCESS Updated";

    }
} else if (isset($_SESSION['userId']) and isset($_GET['filter'])) {
    // Return data of a user's cart in JSON
    $userId = $_SESSION['userId'];
    $query = "SELECT Music.musicId, musicName,Music.price,Cart.quantity FROM Cart JOIN Music ON Cart.musicId=Music.musicId WHERE `userId` ='$userId'";
    $result = mysqli_query($conn, $query) or die("Query Error!" . mysqli_error($conn));
    $data = array();
    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    echo json_encode($data);

} else if (isset($_SESSION['userId']) and isset($_POST['musicId']) and ($_POST['method']) == 'DELETE') {
    $musicId = $_POST['musicId'];
    $userId = $_SESSION['userId'];

    $query = "DELETE FROM Cart WHERE musicId = '$musicId' AND userId ='$userId'";

    $result = mysqli_query($conn, $query) or die("Fail to delete" . mysqli_error($conn));

} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Get total quantity in the cart
    $userId = $_SESSION['userId'];

    $query = "SELECT SUM(`quantity`) AS total FROM `Cart` WHERE userId = '$userId' GROUP BY '$userId'";

    $result = mysqli_query($conn, $query) or die("Cannot get total!" . mysqli_error($conn));

    if (mysqli_num_rows($result) == 0) {
        print 0;
    } else {
        $row = mysqli_fetch_array($result);
        print $row['total'];
    }

} else if (isset($_SESSION['userId']) and ($_POST['method']) == 'DELETE' and ($_POST['filter']) == 'all') {
    $userId = $_SESSION['userId'];

    $query = "DELETE FROM Cart WHERE userId ='$userId'";

    $result = mysqli_query($conn, $query) or die("Fail to delete" . mysqli_error($conn));

}

mysqli_free_result($result);
mysqli_close($conn);
