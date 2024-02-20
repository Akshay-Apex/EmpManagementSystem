//Validates form data 
function validate_form() {
  let setArray = [];
  setArray[0] = document.getElementById("name").value;
  setArray[1] = document.getElementById("dept").value;
  setArray[2] = document.getElementById("emp_num").value;
  setArray[3] = document.getElementById("address").value;
  setArray[4] = document.getElementById("salary").value;    
 
  var p;  
  for (let i = 0; i < setArray.length; i++) {    
    const reqArray = ["name_req", "dept_req", "emp_num_req", "address_req", "salary_req"];
    //Cleares the Requirement prompt data 
    for (let req_id in reqArray) {      
      p = document.getElementById(reqArray[req_id]);
      p.innerText = "";
    }

    if (setArray[i] === "") {      
      switch (i) {        
        case 0:
          let name = document.getElementById("name");
          name.focus();
          p = document.getElementById("name_req");
          p.innerText = "Enter the Name *";          
          return 0;          
        case 1:
          let dept = document.getElementById("dept");
          dept.focus();
          p = document.getElementById("dept_req");
          p.innerText = "Enter the Department *";          
          return 0;
        case 2:
          let emp_num = document.getElementById("emp_num");
          emp_num.focus();
          p = document.getElementById("emp_num_req");          
          p.innerText = "Enter the Emp Number *";                    
          return 0;
        case 3:
          let address = document.getElementById("address");
          address.focus();
          p = document.getElementById("address_req");
          p.innerText = "Enter the Address *";          
          return 0;
        case 4:
          let salary = document.getElementById("salary");
          salary.focus();
          p = document.getElementById("salary_req");
          p.innerText = "Enter the Salary *";          
          return 0;
      }
    } else if (setArray[i] == 0) {      
      let emp_num = document.getElementById("emp_num");
      emp_num.focus();
      emp_num.value = "";   

      p = document.getElementById("emp_num_req");                               
      p.innerText = 'Emp Number can\'t be "0"';                        
      return 0;
    }
  }
  return setArray;
}



//Saves the data to the session storage 
function setArray() {    
  let setArray = validate_form();  
  if (setArray === 0) {
    return;
  }

  let emp_num = document.getElementById("emp_num");
  let retrieve = document.getElementById("retrieve")
  if (emp_num.value !== retrieve.value) {
    sessionStorage.setItem(emp_num.value, JSON.stringify(setArray));
    sessionStorage.removeItem(retrieve.value);
  } else {    
    sessionStorage.setItem(emp_num.value, JSON.stringify(setArray));
  }

  if (sessionStorage.getItem("0") === "update") {    
    document.getElementById("save_display").innerText = "Updated successfully!";  
    sessionStorage.removeItem("0");
    document.getElementById("save").innerText = "Save";
  } else {    
    document.getElementById("save_display").innerText = "Saved successfully!";    
  }
  emp_num.disabled = false;
}



//Updates the already existing data 
function putArray() {
  let name = document.getElementById("name");
  let dept = document.getElementById("dept");
  let emp_num = document.getElementById("emp_num");
  let address = document.getElementById("address");
  let salary = document.getElementById("salary");
  let retrieve = document.getElementById("retrieve");
  let display = document.getElementById("save_display");
  let save_btn = document.getElementById("save");

  name.value = "";
  dept.value = "";
  emp_num.value = retrieve.value;
  emp_num.disabled = true;
  address.value = "";
  salary.value = "";
  display.innerText = ""; 
  
  sessionStorage.setItem("0", "update");
  save_btn.innerText = "Update";
  //Update process is done in setArray() function
}



//Gets the stored data 
function getArray() {  
  let retrieve = document.getElementById("retrieve").value;
  let getArray = JSON.parse(sessionStorage.getItem(retrieve));
  const formList = ["Employee Name", "Department", "Employee Number", "Address", "Salary"];
  let display = document.getElementById("display");
  display.style.color = "red";     
  display.style.textAlign = "left";
  display.style.marginLeft = "15px";
  if (getArray) {   
    display.innerText = ""; //To clear any previous data
    display.style.color = "black";   
    for (let i = 0; i < getArray.length; i++) {
      display.innerHTML += formList[i] + ": " + '<span style="color: green">' + getArray[i] + "</span> <br>";
    }
    
    display.innerHTML += '<button onclick="putArray()" id="update" class="btn btn-success">Update</button>' + 
    '<button onclick="delArray()" id="delete" class="btn btn-success">Delete</button>';
  } else {
    display.innerText = "No data found for Employee number!" 
    display.style.textAlign = "center";
    display.style.marginLeft = "0px";   
  }           
}



//Deletes the stored data 
function delArray() {
  let delArray = document.getElementById("retrieve");
  sessionStorage.removeItem(delArray.value);
  document.getElementById("display").innerText = "Successfully removed!";
}



//Deletes all the data from the session storage 
function delAllArray(btn_state = null) {  
  let display = document.getElementById("display");
  display.innerHTML = 'All the data will be deleted permanently! <br>' + 
  '<button id="yes" onclick="delAllArray(true)" class="btn btn-success">Yes</button>' + 
  '<button id="no" onclick="delAllArray(false)" class="btn btn-success">No</button>';    
  display.style.color = "red";   
  display.style.textAlign = "center";
  display.style.marginLeft = "0px";
  if (btn_state === true) {
    sessionStorage.clear();
    document.getElementById("display").innerText = "All the data have been successflly deleted!"
    display.style.color = "black";   
  } else if (btn_state === false) {
    document.getElementById("display").innerText = "Delete All cancelled!";
    display.style.color = "black";   
  }  
}



//Refresh page 
function refresh() {
  window.location.replace("index.html");
}
