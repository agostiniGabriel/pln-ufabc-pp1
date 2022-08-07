const gitBTN = document.getElementById("gitRedirect");
const gitURL = "https://github.com/agostiniGabriel/pln-ufabc-pp1";

gitBTN.addEventListener('click', (event)=>{
    window.open(gitURL, '_blank').focus();
});