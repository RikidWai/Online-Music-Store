<?php
session_start();

$conn = mysqli_connect('sophia.cs.hku.hk', 'wkchu', 'rikid77', 'wkchu') or die('Error! ' . mysqli_connect_error($conn));

if (isset($_GET['filter']) or isset($_GET['keywords'])) {

    // Search by keywords
    if (isset($_GET['keywords'])) {
        $keywords = explode(" ", $_GET['keywords']);
        foreach ($keywords as $s) {
            $cleaned = mysqli_real_escape_string($conn, $s);
            $musicNameKeyword .= "`musicName` LIKE '%" . $cleaned . "%' OR ";
            $composerKeyword .= "`composer` LIKE '%" . $cleaned . "%' OR ";
        }
        $musicNameKeyword = substr($musicNameKeyword, 0, -4);
        $composerKeyword = substr($composerKeyword, 0, -4);
        $query = "SELECT * FROM `Music` WHERE " . $musicNameKeyword . " OR " . $composerKeyword;
    } else if ($_GET['filter'] == "all") { // Search by category
        $query = 'SELECT * FROM Music';
    } else {
        $query = "SELECT * FROM Music WHERE category='" . $_GET['filter'] . "'";
    }

    $result = mysqli_query($conn, $query) or die("Query Error!" . mysqli_error($conn));
    while ($row = mysqli_fetch_array($result)) {
        print "<div class='card' id='" . $row['musicId'] . "'>";
        print "<a href='details.html' onclick='storeTargetId(this)'><h2>" . $row['musicName'] . "</h2></a>";
        print "<img src='Materials/img_" . $row['musicId'] . ".jpg'>";
        if ($row['newArrival'] == 'Yes') {
            print "<h3>NEW ARRIVAL</h3>";
        }
        print "<p>Composer: " . $row['composer'] . "</p>";
        print "<p>Price: " . $row['price'] . "</p>";
        print "</div>";

    }
} else if (isset($_GET['musicId'])) {
    $query = "SELECT * FROM Music WHERE musicId='" . $_GET['musicId'] . "'";
    $result = mysqli_query($conn, $query) or die("Query Error!" . mysqli_error($conn));
    $row = mysqli_fetch_array($result);
    print json_encode($row);
}

mysqli_free_result($result);
mysqli_close($conn);
