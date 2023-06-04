const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');



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






