function getMusicByCat(cat) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let displayArea = document.getElementById("displayArea");

      displayArea.innerHTML = xmlhttp.responseText;
    }
  };
  xmlhttp.open("GET", "query.php?filter=" + cat, true);
  xmlhttp.send();

  if (cat != "all") {
    document.getElementById("displayAreaTitle").innerHTML = "All " + cat;
    document.getElementById("currentLinkBar").innerHTML =
      "<a id='currentLink' href='main.html'>Home</a> >> <a href='#'>" + cat + "</a>";
  }
}

function storeTargetId(elem) {
  sessionStorage.musicId = elem.parentNode.id;
}

async function getMusicDetails(musicId) {
  try {
    let response = await fetch("query.php?musicId=" + musicId);

    if (response.status == 200) {
      let musicDetails = await response.json();
      // Render the page
      document.getElementById("musicImg").src = "Materials/img_" + musicDetails.musicId + ".jpg";
      var audio = document.getElementById("musicAudio");
      function onCanPlay(e) {
        this.play();
      }

      audio.addEventListener("canplaythrough", onCanPlay);

      document.getElementById("musicSource").src = "Materials/m" + musicDetails.musicId + ".mp3";
      audio.load(); //call this to just preload the audio without playing

      document.getElementById("currentLink").innerHTML = musicDetails.musicName;
      document.getElementById("musicName").innerHTML = musicDetails.musicName;
      document.getElementById("musicComposer").innerHTML = "Composer : " + musicDetails.composer;
      document.getElementById("musicPublished").innerHTML = "Published : " + musicDetails.published;
      document.getElementById("musicCategory").innerHTML = "Category : " + musicDetails.category;
      document.getElementById("musicDescription").innerHTML = "Description : " + musicDetails.description;
      document.getElementById("musicPrice").innerHTML = "Price : " + musicDetails.price;
    }
  } catch (error) {
    console.log("error");
  }
}

async function checkIsAuthenticated() {
  try {
    let response = await fetch("verifyLogin.php");

    if (response.status == 200) {
      let data = await response.text();

      return data == "isAuthenticated" ? true : false;
    }
  } catch (error) {
    console.log("error");
  }
}

async function signUp(username, pwd) {
  if (username.validity.valueMissing) {
    alert("Please do not leave the fields empty!!");
    username.focus();
    return false;
  }
  if (pwd.validity.valueMissing) {
    alert("Please do not leave the fields empty!!");
    pwd.focus();
    return false;
  }

  try {
    let init = {
      method: "POST",
      body: "username=" + username.value + "&pwd=" + pwd.value,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    let response = await fetch("create.php", init);
    console.log("test");
    if (response.status == 200) {
      let data = await response.text();
      return data == "Success" ? true : false;
    }
  } catch (error) {
    console.log("error");
  }
}

// Async functions related to cart.php
async function addToCartDB(musicId, quantity) {
  try {
    let init = {
      method: "POST",
      body: "musicId=" + musicId + "&quantity=" + quantity,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    let response = await fetch("cart.php", init);
    console.log("test");
    if (response.status == 200) {
      let data = await response.text();
      return data == "Success" ? true : false;
    }
  } catch (error) {
    console.log("error");
  }
}
