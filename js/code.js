const urlBase = 'http://www.4331-spring23-group11.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doRegister()
{
  let fName = document.getElementById("registerFirstName").value;
  let lName = document.getElementById("registerLastName").value;
  let username = document.getElementById("registerUsername").value;
  let password = document.getElementById("registerPassword").value;

  document.getElementById("registerResult").innerHTML = "";

  let tmp = {
    fName:registerFirstName,
    lName:registerLastName,
    username:registerUsername,
    password:registerPassword
  };

  let jsonPayload = JSON.stringify( tmp );

  let url = urlBase + '/Register.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
          xhr.onreadystatechange = function();
          {
                  if (this.readyState == 4 && this.status == 200)
                  {
                          let jsonObject = JSON.parse( xhr.responseText );
                          userId = jsonObject.id;
                          document.getElementById("registerResult").innerHTML = "User has been added";
                  }
          };
          xhr.send(jsonPayload);
  }
  catch(err)
  {
          document.getElementById("registerResult").innerHTML = err.message;
  }

}

function doLogin()
{
        userId = 0;
        firstName = "";
        lastName = "";

        let login = document.getElementById("loginName").value;
        let password = document.getElementById("loginPassword").value;
//      var hash = md5( password );

        document.getElementById("loginResult").innerHTML = "";

        let tmp = {login:login,password:password};
//      var tmp = {login:login,password:hash};
        let jsonPayload = JSON.stringify( tmp );

        let url = urlBase + '/Login.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try
        {
          xhr.onreadystatechange = function()
          {
            if (this.readyState == 4 && this.status == 200)
            {
              let jsonObject = JSON.parse( xhr.responseText );
              userId = jsonObject.id;

              if( userId < 1 )
              {
                document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                return;
              }

              firstName = jsonObject.firstName;
              lastName = jsonObject.lastName;

              saveCookie();

              window.location.href = "ContactsPage.html";
            }
          };
          xhr.send(jsonPayload);
        }
        catch(err)
        {
          document.getElementById("loginResult").innerHTML = err.message;
        }

}

function saveCookie()
{
        let minutes = 20;
        let date = new Date();
        date.setTime(date.getTime()+(minutes*60*1000));
        document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
        userId = -1;
        let data = document.cookie;
        let splits = data.split(",");
        for(var i = 0; i < splits.length; i++)
        {
                let thisOne = splits[i].trim();
                let tokens = thisOne.split("=");
                if( tokens[0] == "firstName" )
                {
                        firstName = tokens[1];
                }
                else if( tokens[0] == "lastName" )
                {
                        lastName = tokens[1];
                }
                else if( tokens[0] == "userId" )
                {
                        userId = parseInt( tokens[1].trim() );
                }
        }

        if( userId < 0 )
        {
                window.location.href = "LoginPage.html";
        }
        else
        {
                document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
        }
}

function doLogout()
{
        userId = 0;
        firstName = "";
        lastName = "";
        document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "LoginPage.html";
}

//fix this
function addContact()
{
  let contFirstName = document.getElementById("contactFirstName").value;
  let contLastName = document.getElementById("contactLastName").value;
  let contEmail = document.getElementById("contactEmail").value;
  let contPhoneNumber = document.getElementById("contactPhoneNumber").value;
  let contAddress = document.getElementById("contactAddress").value;
  let contCity = document.getElementById("contactCity").value;
  let contState = document.getElementById("contactState").value;

  let tmp = {
    userId: userId,
    firstName: contFirstname,
    lastName: contLastname,
    phoneNumber: contPhoneNumber,
    email: contEmail,
    address: contAddress,
    city: contCity,
    state: contState
  };

  let jsonPayload = JSON.stringify( tmp );
  let url = urlBase + '/AddContact.' + extension;
  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        let jsonObject = JSON.parse( xhr.responseText );
        userId = jsonObject.id;
        document.getElementById("contactAddResult").innerHTML = "Contact has been added";
        //======================================
      }
    };
    xhr.send(jsonPayload);
  }

  catch(err)
  {
    // This is the only bit left ===========
    document.getElementById("contactAddResult").innerHTML = err.message;
    //======================================
  }
}

function searchContact()
{
  let srch = document.getElementById("searchText").value;
  document.getElementById("contactSearchResult").innerHTML = "";

  let contactList = "";

  let tmp = {search:srch,userId:userId};
  let jsonPayload = JSON.stringify( tmp );

  let url = urlBase + '/SearchContacts.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
        let jsonObject = JSON.parse( xhr.responseText );

        for( let i=0; i<jsonObject.results.length; i++ )
        {
          contactList += jsonObject.results[i];
          if( i < jsonObject.results.length - 1 )
          {
            contactList += "<br />\r\n";
          }
        }

        document.getElementsByTagName("p")[0].innerHTML = contactList;
      }
    };
    xhr.send(jsonPayload);
  }

  catch(err)
  {
    document.getElementById("contactSearchResult").innerHTML = err.message;
  }

}