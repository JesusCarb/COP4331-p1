const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

const urlBase = 'http://jesustestserver.xyz/LAMPAPI';
const extension = 'php';

let ID = 0;
let firstName = "";
let lastName = "";


registerLink.addEventListener('click', ()=> {
  wrapper.classList.add('active');
});


loginLink.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
});


btnPopup.addEventListener('click', ()=> {
  wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
  wrapper.classList.remove('active-popup');
});


function toggleContacts() {
  var contactTable = document.querySelector('.contactTable');
  var addContacts = document.querySelector('.addContacts');
  
  if (contactTable.style.display === 'none') {
    contactTable.style.display = 'block';
    addContacts.style.display = 'none';
  } else {
    contactTable.style.display = 'none';
    addContacts.style.display = 'block';
  }
}

function toggleAddContact() {
  var addContacts = document.querySelector('.addContacts');
  var contactTable = document.querySelector('.contactTable');
  
  if (addContacts.style.display === 'none') {
    addContacts.style.display = 'block';
    contactTable.style.display = 'none';
  } else {
    addContacts.style.display = 'none';
    contactTable.style.display = 'block';
  }
}

function addContact() {

  let firstname = document.getElementById("contactTextFirst").value;
  let lastname = document.getElementById("contactTextLast").value;
  let phonenumber = document.getElementById("contactTextNumber").value;
  let emailaddress = document.getElementById("contactTextEmail").value;


  let tmp = {
      FirstName: firstname,
      LastName: lastname,
      Phone: phonenumber,
      Email: emailaddress,
      ID: ID
  };

  if(firstname == "" || lastname == "" || phonenumber == "" || emailaddress == "" )
  {
    document.getElementById("addContactResult").innerHTML = "Fill All Inquiries";
    return;
  }

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + '/AddContact.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
      xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              console.log("Contact has been added");
              document.getElementById("addContactResult").innerHTML = "Contact has been added";

              // Clear input fields in form 
              document.getElementById("addMe").reset();
              // reload contacts table and switch view to show
              // loadContacts();
              
          }
      };
      xhr.send(jsonPayload);
  } catch (err) {
      console.log(err.message);
  }
}

function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));

    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ", ID=" + ID + ";expires=" + date.toGMTString();
}

function readCookie()
{
  ID = -1;
  let data = document.cookie;
  console.log(data);
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
      else if( tokens[0] == "ID" )
      {
        ID = parseInt( tokens[1].trim() );
      }
  }
  
  if( ID < 0 )
  {
    window.location.href = "index.html";
  }
  else
  {
    document.getElementById("userName").innerHTML = "Welcome " + firstName + " " + lastName + " " + ID;
  }
}

function doLogin()
{
    ID = 0;
    firstName = "";
    lastName = "";
    
    let login = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    

    let tmp = new Object();
    tmp.Login = login;
    tmp.Password = password;
    
    if (login === "" || password === "")
    {
      console.log("check");
      document.getElementById("loginResult").innerHTML = "Enter a Username and Password";
      return;
    }

    let jsonPayload = JSON.stringify( tmp );

    console.log(isJsonString(jsonPayload));

    let url = urlBase + '/Login.' + extension;
    console.log("url " + url);
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

          console.log(jsonObject);

          ID = jsonObject.ID;
          
          if( ID < 1 )
          {		
            document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
            return;
          }
      
          firstName = jsonObject.FirstName;
          lastName = jsonObject.LastName;

          saveCookie();
    
          window.location.href = "contact.html";
        }
      };
      xhr.send(jsonPayload);
    }
    catch(err)
    {
      document.getElementById("loginResult").innerHTML = err.message;
    }

    
}

function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function doSignup(){

  let firstName = document.getElementById("registerFirst").value;
  let lastName = document.getElementById("registerLast").value;

  let username = document.getElementById("registerUsername").value;
  let password = document.getElementById("registerPassword").value;

  document.getElementById("signupResult").innerHTML = "";

  let tmp = new Object();
  tmp.FirstName = firstName;
  tmp.LastName = lastName;
  tmp.Login = username;
  tmp.Password = password;

  registerBox = document.getElementById("registerBox");
  console.log(registerBox.checked);

  if(registerBox.checked == false)
  {
    document.getElementById("signupResult").innerHTML = "Please Accept Terms & Conditions";
    return;
  }

  console.log(username);

  if(username == "" || password == "" || firstName == "" || lastName == "" )
  {
    document.getElementById("signupResult").innerHTML = "Fill All Inquiries";
    return;
  }

  let jsonPayload = JSON.stringify(tmp);

  console.log(jsonPayload);

  let url = urlBase + '/Register.' + extension;
  console.log("url " + url);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
      xhr.onreadystatechange = function () {

          if (this.readyState == 4 && this.status == 200 ) {
              let jsonObject = JSON.parse(xhr.responseText);
              console.log(jsonObject);

              ID = jsonObject.id;
              if (jsonObject.error == "Username Unavailable")
              {
                document.getElementById("signupResult").innerHTML = "Username Unavailable";
                return;
              }

              document.getElementById("signupResult").innerHTML = "User added";
              firstName = jsonObject.firstName;
              lastName = jsonObject.lastName;
              saveCookie();
          }
      };

      xhr.send(jsonPayload);
  } catch (err) {
      document.getElementById("signupResult").innerHTML = err.message;
  }
}

function doLogout()
{
  console.log("LOGOUTCHECK");
  ID = 0;
  firstName = "";
  lastName = "";

	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

  window.location.href = "index.html?#";
}

function maketable()
{
  let table = document.getElementById("contactTable");
  let rowNode = document.createElement("tr");
  let textNode = document.createTextNode("")


}

function loadContacts() {

  let search = document.getElementById("search").value;

  let tmp = {
      search: search,
      ID: ID
  };

  let jsonPayload = JSON.stringify(tmp);
  console.log(jsonPayload);

  // if (search == "")
  // {
  //   return;
  // }

  let url = urlBase + '/SearchContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try 
  {
    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let jsonObject = JSON.parse(xhr.responseText);
            console.log(jsonObject);

            if (jsonObject.error == "No Records Found") {
                console.log("Quitting");
                return;
            }

          LoadTable(jsonObject);
            
        }
    };
      xhr.send(jsonPayload);
  } catch (err) {
    console.log(err.message);
  }
}

function LoadTable(obj)
{

  let vars = obj.results;
  console.log(obj.results);
  document.getElementById("tbody").innerHTML = "";
  var body = document.getElementById("tbody")
  
	for(let i = 0; i < vars.length; i++)
  {
    console.log(i.FirstName);
    let row = body.insertRow();

		let first = row.insertCell(0);
		first.innerHTML = vars[i].FirstName;

		let last = row.insertCell(1);
		last.innerHTML = vars[i].LastName;

		let email = row.insertCell(2);
		email.innerHTML = vars[i].Email;

		let phone = row.insertCell(3);
		phone.innerHTML = vars[i].Phone;

    let ID = row.insertCell(4);
    ID.innerHTML = vars[i].ID;
    ID.style.visibility = "collapse";
    console.log(ID.innerHTML);

    let del = row.insertCell(5);
    var button = document.createElement("button");


    const eButton = document.createElement('button');
    eButton.innerText = "Edit";
    const dButton = document.createElement('button');
    dButton.innerText = "Delete";

  }


}




