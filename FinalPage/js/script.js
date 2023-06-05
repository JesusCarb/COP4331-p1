const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

const urlBase = '/LAMPAPI';
const extension = 'php';

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

  if (!validAddContact(firstname, lastname, phonenumber, emailaddress)) {
      console.log("INVALID FIRST NAME, LAST NAME, PHONE, OR EMAIL SUBMITTED");
      return;
  }
  let tmp = {
      firstName: firstname,
      lastName: lastname,
      phoneNumber: phonenumber,
      emailAddress: emailaddress,
      userId: userId
  };


  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + '/AddContacts.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
      xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              console.log("Contact has been added");
              // Clear input fields in form 
              document.getElementById("addMe").reset();
              // reload contacts table and switch view to show
              loadContacts();
              showTable();
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
    window.location.href = "index.html";
  }
  else
  {
    document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
  }
}

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginUsername").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password ); 
	
	// document.getElementById("loginLaunch").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );

	console.log(jsonPayload);

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
	
				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

  
}

function doRegister()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("registerUsername").value;
	let password = document.getElementById("registerPassword").value;
  let email = document.getElementById("registerEmail").value;
//	var hash = md5( password ); 
	
	// document.getElementById("loginLaunch").innerHTML = "";

	let tmp = {login:login,email:email,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );

	console.log(jsonPayload);

	let url = urlBase + '/Register.' + extension;

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
					document.getElementById("registerResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("registerResult").innerHTML = err.message;
	}

  
}





