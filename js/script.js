let emd = 'Please enter valid ';

function hasClass(el, className)
{
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className)
{
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className)
{
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className))
    {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

function ValidateName(name){
    var regex = /^[a-zA-Z ]{2,30}$/;
    let isValid = regex.test(name)
    if(!isValid){
        emd += 'Name '
        addClass(document.getElementById('input-name'),'invalidInput');
        return false;
    }
    removeClass(document.getElementById('input-name'),'invalidInput');
    return true;
}

function ValidateEmail(email){
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid = regex.test(email)
    if(!isValid){
        emd += 'Email ID '
        addClass(document.getElementById('input-email'),'invalidInput');
        return false;
    }
    removeClass(document.getElementById('input-email'),'invalidInput');
    return isValid;
}

function ValidateWebsite(website){
    var expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g; 
    var regex = new RegExp(expression);
    let isValid = regex.test(website)
    if(!isValid){
        emd += 'Website Link '
        addClass(document.getElementById('input-website'),'invalidInput');
        return false;
    }
    removeClass(document.getElementById('input-website'),'invalidInput');
    return isValid;
}



function ValidateForm(student){
    var isNameValid = ValidateName(student.name);
    var isEmailValid = ValidateEmail(student.email);
    var isWebsiteValid = true;

    if(student.website != ''){
        isWebsiteValid = ValidateWebsite(student.website)
    }
    let errorMessage = document.getElementById('error-mssg');
    if(isNameValid && isEmailValid && isWebsiteValid){
        errorMessage.innerText = '';
        errorMessage.style.display = 'none';
        emd = ''
        return true;
    }
    errorMessage.innerText = emd;
    errorMessage.style.display = 'block';
    return false;
}

function EnrollStudent(student){

    let newStudentEntry = document.createElement('li');

    let evenOrOdd = 'odd';
    let enrolledStudents = document.querySelectorAll("#stdList")[0].children;
    if((enrolledStudents.length + 1) % 2 === 0){
        evenOrOdd = 'even'
    }

    newStudentEntry.innerHTML = `<div class="tableEntery row ${evenOrOdd} fade-in">
                                    <div class="studentDetails item col-xs-8" style="padding-top:1em">
                                        <span  id="studentName" >${student.name}</span>
                                        <span  id="gender">${student.gender}</span>
                                        <span  id="emailId">${student.email}</span>
                                        <span id="website"><a href="${student.website}" target="_blank">${student.website}</a></span>
                                        <span  id="skills">${student.skills}</span>
                                    </div>

                                    <div class="studentImage item col-xs-4">   
                                        <img src="${student.image}" onerror="this.onerror=null;this.src='./images/defaultImage.jpg';" alt="Student Image">
                                    </div>
                                </div>`
    document.getElementById('stdList').appendChild(newStudentEntry);
    document.getElementById('noStundentsEnrolled').style.display = 'none';
    document.getElementById('studentsTable-wrapper').style.visibility = 'visible';
}

function onFormSubmit(e){
    e.preventDefault();
    let studentObj = new Object;
    studentObj.name = document.getElementById('input-name').value;
    studentObj.email = document.getElementById('input-email').value;
    studentObj.website = document.getElementById('input-website').value;
    studentObj.image = document.getElementById('input-image').value;

    if(studentObj.image === ''){
        studentObj.image = './images/defaultImage.jpg';
    }

    studentObj.gender = document.getElementsByName('gender');
    studentObj.skills = document.getElementsByName('skills');

    let result = '';
    for(let i = 0; i < studentObj.gender.length; i++){
        if(studentObj.gender[i].checked){
            result = studentObj.gender[i].value;
        }
    }
    studentObj.gender = result;

    result = '';
    for(let i = 0; i < studentObj.skills.length; i++){
        if(studentObj.skills[i].checked){
            result += studentObj.skills[i].value +' ';
        }
    }
    studentObj.skills = result;
    emd = 'Please enter valid ';
    if(ValidateForm(studentObj)){
        EnrollStudent(studentObj);
        document.getElementById('enrolForm').reset();
    }
    

    
}

const enrollForm = document.querySelector("#enrolForm");
enrollForm.addEventListener('submit',onFormSubmit);
