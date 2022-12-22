import throttle from 'lodash.throttle';

const inputEmail = document.querySelector("[name='email']");
const textareaMessage = document.querySelector("[name='message']");
const form = document.querySelector(".feedback-form");

const formData = {
    email: "",
    message: "", 
};

const updateLocalStorage = (event) => { 
    let currentValue = ""; 

    try {
        currentValue = event.currentTarget.value;
    }
    catch (error){
        return;
    };

    if (currentValue === ""){
        return;
    };

    if (event.target.nodeName === "INPUT"){       
        formData.email = currentValue; 
        formData.message = textareaMessage.value;        
    } else if (event.target.nodeName === "TEXTAREA") {     
        formData.message = currentValue;
        formData.email = inputEmail.value;;  
    };      
    
    //console.log(formData); 
    localStorage.setItem("feedback-form-state",JSON.stringify(formData));    
};

inputEmail.addEventListener("input",throttle(updateLocalStorage,500));
textareaMessage.addEventListener("input",throttle(updateLocalStorage,500));

const clear = (event) => {  
    event.preventDefault();

    console.log(formData);  
    inputEmail.value = "";  
    textareaMessage.value = "";
    formData.email = "";
    formData.message = "";      
    localStorage.setItem("feedback-form-state",JSON.stringify(formData));
}; 

form.addEventListener("submit",clear);

const ready = () =>{
    try{
        const savedSettings = localStorage.getItem("feedback-form-state");   
        const parsedSettings = JSON.parse(savedSettings);
        //console.log(parsedSettings); 

        if (parsedSettings.email !== ""){
            inputEmail.value = parsedSettings.email;
            formData.email = parsedSettings.email;  
        };
        if (parsedSettings.message !== ""){
            textareaMessage.value = parsedSettings.message;
            formData.message = parsedSettings.message;
        };               
    }
    catch (error){
        return;
    }; 
}; 

document.addEventListener("DOMContentLoaded", ready);

