// contact form validation

function validateInputLength(input, minlength) {
  if (input.length >= minlength) {
    return true;
  } else {
    return false;
  }
}


const inputs = document.querySelectorAll(".text-input")

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    const value = event.target.value;
    const withoutSpace = value.replace(/ /g,"")
    const minlength = event.target.dataset.minlength;
    const test = +minlength - withoutSpace.length
    const validate = validateInputLength(withoutSpace, +minlength);
    const error = input.parentElement.querySelector(".error-message");

    if(!validate) {
      input.parentElement.classList.add("error");
      error.innerHTML = `${event.target.id} must contain ${test} more characters!`;
    } else {
      error.innerHTML = "";
      input.parentElement.classList.remove("error");
      input.parentElement.classList.add("success");
    }
  
  })
})



// validate e-mail

function validateEmail(email) {
  const Regex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
  if(Regex.test(email) && email.length > 3){
    return true;
  } else {
    return false;
  }
  
}



const emailInput = document.querySelector("#email")

  if(emailInput) {
    emailInput.addEventListener("change", (event) => {
      const error = emailInput.parentElement.querySelector(".error-message");
      const value = event.target.value;
      
      if(value === "") {
        emailInput.parentElement.classList.add("error");
        error.innerHTML = "This field is mandatory";
      } else {
        const validate = validateEmail(value);
    
        if(!validate) {
          emailInput.parentElement.classList.add("error");
          error.innerHTML = `* example@email.com`;
        } else {
          error.innerHTML = "";
          emailInput.parentElement.classList.remove("error");
          emailInput.parentElement.classList.add("success");
        }
      }
    })
  }
  

// Success and error messages for the CONTACT FORM BUTTON

const contactFormButton = document.querySelector("#contactFormButton");

  if(contactFormButton) {
    contactFormButton.addEventListener("click", () => {

      const inputFields = document.querySelectorAll(".validate-input");
      let valid = true;

      inputFields.forEach(input => {
        if(input.parentElement.classList.contains("error") || !input.value) {
          valid = false;
        }
      })
      const success = contactFormButton.parentElement.querySelector(".status");

      success.classList.remove("success-message", "error-message");

      if(valid) {
        success.classList.add("success-message");
        success.innerHTML = `Wohoo! Message has been sent. Now take a sip of coffee, and you will hear from me!`
      } else {
        success.classList.add("error-message");
        success.innerHTML = `Some of the input fields are not valid.`
      }
      
    })
  }