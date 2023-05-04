const button = document.getElementById("getLinkBTN")
const inputField = document.getElementById("inputField")
const goToSandbox = document.getElementById("goToSandbox")

button.addEventListener("click", ()=> {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        inputField.value = tabs[0].url;
        inputField.style.boxShadow = "0 0 5px red"
        if(isValidGithubRepoUrl(inputField.value)){
            goToSandbox.removeAttribute("disabled")
            goToSandbox.style.boxShadow = "0 0 5px #4CAF50"
            goToSandbox.style.color = "black"
            goToSandbox.style.transition = "1.6s"
            inputField.style.boxShadow = "0 0 5px #4CAF50"
            goToSandbox.addEventListener("click", ()=> {
                //for new tab instead of current
                // chrome.tabs.update({url: `${inputField.value}`});
                const updatedURL = `https://githubbox.com${inputField.value.substring(18)}`
                chrome.tabs.update({url: updatedURL});
            });
        }
    })
    
})


function isValidGithubRepoUrl(url) {
    const githubRepoUrlRegex = /^https?:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+(\/)?$/;
    return githubRepoUrlRegex.test(url);
}

