// Logic for form validation and submit
let PHONEREGEX = /[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/;
let EMAILREGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/
let ZIPREGEX = /[0-9][0-9][0-9][0-9][0-9]/;
let NAMEREGEX = /\w+ \w+/;
const STATES =  [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  var form = null;
  var successMsg = null;

  //set up event listeners
function initValidation(formId, successId){
    form = document.getElementById(formId);
    successMsg = document.getElementById(successId);

    let inputs = document.querySelectorAll("li.section-display > input")
    for (input of inputs){
        input.addEventListener("change", inputChanged);
        // input.classList.add("was-validated")
    }
    let radios = document.getElementsByName("findPage")
    for (radio of radios){
        radio.addEventListener("click", inputChanged)
        }

    form.addEventListener("submit", submitForm);
    //Test code, comment out:
    console.log(inputs);
    console.log("initValidation end")
}

function inputChanged(ev){
    let el=ev.currentTarget;
    // add was-validated only fires if text field changed
    el.classList.add("was-validated");
    validateForm();
}

function submitForm(ev){
    let form=ev.currentTarget;
    console.log("Submit clicked");
    ev.preventDefault();
    ev.stopPropagation();
    // Check that all elements are valid, regardless of whether they were 'changed'
    let inputs = document.querySelectorAll("li.section-display > input");
    console.log(inputs)
    for (input of inputs){
        // console.log(input)
        if (input.classList.contains("was-validated")){
            console.log(input+"WAS VALIDATED")
        }
        else{
            console.log("WAS NOT VALIDATED")
            input.classList.add("was-validated");
        }

    }
    radios = document.getElementById("other")
    radios.classList.add("was-validated")
    validateForm();
    

    if (!form.checkValidity()){
        console.log("Form is invalid, not submitted!")
            //TODO - if form is invalid, set 'was-validated' class on all inputs to show errors
    }
    else{
        console.log("Form valid: Submitted!!")
        /*TODO - hide form and show success Message*/
        formSection = document.getElementById("myForm")
        formSection.classList.add("hideItem")
        successMsg.classList.remove("hideItem")
        // form.setCustomValidity("");
    }
}

function validateForm(){
    // Called when submit button is pressed, checks that entire form is ok
    // Also called for each inputChanged event:
    checkRequired("firstName", "First Name is Required");
    checkRequired("lastName", "Last Name is Required");
    checkRequired("address", "Address is Required");
    checkRequired("city", "City is Required");
    if(checkRequired("state", "State is Required")){
        checkState("state", "State must be capitalized two letter format: XX")
    }
    if(checkRequired("zip", "Zip is Required")){
        checkRegex("zip", "ZIP code format must be #####", ZIPREGEX)
    }
    if(checkRequired("email", "Email is Required")){
        checkRegex("email", "Email must be formatted name@somewhere.com", EMAILREGEX)

    }
    if(checkRequired("phone", "Phone is Required")){
        checkRegex("phone", "Phone must be formatted XXX-XXX-XXXX", PHONEREGEX)
    }
    checkRequired("other", "Must select one")
}

function checkRequired(id, message){
    let el=document.getElementById(id);
    var valid=false;
    let type=el.type;
    switch(type){
        case 'text':
            var valid=false;

            if(el.value){
                el.valid=true;
                el.setCustomValidity('');
                valid=true;
            }
            else{
                el.valid=false;
                el.setCustomValidity(message);
            }
        setElementValidity(id,valid,message);
        break;
        case 'radio':
            let radios = document.getElementsByName("findPage");
            // let valid = false;
            el=document.getElementById("other")

            for (radio of radios){
                if (radio.checked){
                    valid=true;
                    // el.valid=true;
                    // el.setCustomValidity('');
                }
                else{
                    // el.valid=false;
                    // el.setCustomValidity(message);
                }
            }
                        id = "other"; //place where error message is for all radio buttons
            if(valid==false){
                el.setCustomValidity(message);
                el.valid=false;
                setElementValidity(id,valid,message);
            }
            else{
                el.setCustomValidity('');
                el.valid=true;
                setElementValidity(id,valid,message);
            }


    }
    // console.log(id+" is "+el.value+" which is: "+el.valid)
    // setElementValidity(id,valid,message);
    return valid;
}
function checkRegex(id, message, regex){
    let el=document.getElementById(id);
        if(regex.test(el.value)){
            el.valid=true;
            el.setCustomValidity('');
        }
        else{
            el.valid=false;
            el.setCustomValidity(message);
        }

    console.log(id+" is "+el.value+" which is: "+el.valid)
    setElementValidity(id,el.valid,message);
    return el.valid;
}
function checkState(id, message){
    let el=document.getElementById(id);
    if (STATES.includes(el.value)){
        el.valid=true;
        el.setCustomValidity('');
    }
    else{
        el.valid=false;
        el.setCustomValidity(message);
    }
    setElementValidity(id,el.valid,message);
}

function setElementValidity(id, valid, message){
    let el = document.getElementById(id);
    if (valid){
        //element has a value, set it's
        el.setCustomValidity('');
        // el.classList.add('was-validated');
    }
    else{
        el.setCustomValidity(message);
        let errorDiv = document.querySelector(`#${el.id} ~ div`);
        errorDiv.innerHTML = (message)
    }
}
console.log("End of validation.js")