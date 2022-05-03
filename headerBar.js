document.write(`\
  <header id='topnav'>\
    <span id="searchContainer">\
      <input type="search" id="searchbar" placeholder="Keyword(s)" name="search" />\
      <button id="search" onclick="getMusicBySearch()">\
        Search <span>&#x1F50D;</span> \
      </button>\ 
    </span>\
  <div class="dropdown">\
    <button class="dropbtn" onclick="myFunction()">Category &#9660; \
    </button>\
    <div class="dropdown-content">\
      <a href="#" onclick="getMusicByCat('Classical')">Classical</a>\
      <a href="#" onclick="getMusicByCat('Baroque')">Baroque</a>\
      <a href="#" onclick="getMusicByCat('Romantic')">Romantic</a>\
      <a href="#" onclick="getMusicByCat('Late 19th')">Late 19th</a>\
    </div>\
  </div> \
    <button id="mainButn" onclick="location.href='main.html'">\
      Main\
    </button>\
    <button id="loginButn" onclick="location.href='login.html'">\
      Sign In\
    </button>\
    <button id="logoutButn" >\
      Sign Out\
    </button>\
    <button id="regButn" onclick="location.href='createAcct.html'">\
      Register\
    </button>\
    <span id="cartContainer">\
      <button id="cartButn" onclick="location.href='cart.html'">My Cart</button>\
      <sup id="totalQuantity"></sup>\
    </span>\
  </header>`);

function getMusicBySearch() {
  // check the last part after / of the pathname
  if (window.location.pathname.split("/").pop() == "main.html") {
    let keywords = document.getElementById("searchbar");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        let displayArea = document.getElementById("displayArea");
        let displayAreaTitle = document.getElementById("displayAreaTitle");

        displayArea.innerHTML = xmlhttp.responseText;
        displayAreaTitle.innerHTML = "Searching Results";
        if (document.getElementById("currentLink").nextSibling != null) {
          document.getElementById("currentLink").nextSibling.remove();
          document.getElementById("currentLink").nextSibling.remove();
        }
      }
    };
    xmlhttp.open("GET", "query.php?keywords=" + keywords.value, true);
    xmlhttp.send();
  } else {
    let container = document.getElementsByClassName("topnavMargin")[0];
    container.innerHTML =
      "<div id='currentLinkBar' style='padding:0.5rem'><a href='main.html' id='currentLink'>Home</a> >> Searching Results</div>";
    container.innerHTML += "<h1 style='padding-left:0.5rem'>Searching Results</h1>";
    let displaySearching = document.createElement("div");
    displaySearching.id = "displaySearching";
    getSearchingResults().then((data) => {
      displaySearching.innerHTML = data;
      container.append(displaySearching);
    });
  }

  document.getElementById("searchbar").value = "";
}

async function getSearchingResults() {
  try {
    let keywords = document.getElementById("searchbar");
    let response = await fetch("query.php?keywords=" + keywords.value);

    if (response.status == 200) {
      let data = await response.text();
      return data;
    }
  } catch (error) {
    console.log("error");
  }
}

if (document.getElementsByTagName("body")[0].className != "formPage") {
  document.getElementById("mainButn").style.display = "none";
}

async function loginOrOut() {
  let loginButn = document.getElementById("loginButn");
  let logoutButn = document.getElementById("logoutButn");
  let regButn = document.getElementById("regButn");
  let isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    loginButn.style.display = loginButn.style.display === "none" ? "" : "none";
    regButn.style.display = "none";
    logoutButn.addEventListener("click", async () => {
      let body = document.getElementsByTagName("BODY")[0];
      body.innerHTML = "<h2 style='text-align:center'>Logging Out</h2>";
      sessionStorage.clear();
      try {
        let response = await fetch("verifyLogin.php?action=logout");

        if (response.status == 200) {
          let data = await response.text();
          console.log(data);
          setTimeout(() => {
            if (data == "Done") {
              location.href = "main.html";
            }
          }, 3000);
        }
      } catch (error) {
        console.log("error");
      }
    });
  } else {
    logoutButn.style.display = logoutButn.style.display === "none" ? "" : "none";
  }
}

loginOrOut();

// Initialize quantity in cart
total = document.getElementById("totalQuantity");
if (sessionStorage.totalQuantity == null) {
  checkIsAuthenticated().then((isAuthenticated) => {
    if (isAuthenticated) {
      getTotal().then((totalQuantity) => {
        console.log("get total" + totalQuantity);
        total.innerText = totalQuantity;
        sessionStorage.totalQuantity = totalQuantity;
      });
    } else {
      sessionStorage.totalQuantity = 0;
      total.innerText = sessionStorage.totalQuantity;
    }
  });
} else {
  checkIsAuthenticated().then((isAuthenticated) => {
    if (isAuthenticated) {
      getTotal().then((totalQuantity) => {
        console.log("get total" + totalQuantity);
        total.innerText = totalQuantity;
        sessionStorage.totalQuantity = totalQuantity;
      });
    } else {
      total.innerText = sessionStorage.totalQuantity;
    }
  });
}

var addTotalQuantity = (quan) => {
  sessionStorage.totalQuantity = +sessionStorage.totalQuantity + +quan;
  total.innerText = sessionStorage.totalQuantity;
};

async function getTotal() {
  try {
    let response = await fetch("cart.php");

    if (response.status == 200) {
      let data = await response.text();
      return data;
    }
  } catch (error) {
    console.log("error");
  }
}
