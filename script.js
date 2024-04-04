
var ServiceType;
var TemplateType;
var rank;
var username;
var guidelineticked;
var replacement1;
var replacement2;
var noOfRso;
var rsoReason;
var rsoTemplateToSuperior;
var rsoTemplateToCOS;
var guidelinetickedtext;
var replacement1text;
var replacement2text;
var currentDate;
var currentTime;

//Call this function to transition from Service Panel > Template Type Panel
function fadeOutService(value) {
    ServiceType = value; //Gets the parameter from the onclick event through this.value and passes it into this variable
    console.log(ServiceType)
    var typeOfService = document.getElementById("TypeOfService");
    var divs = typeOfService.getElementsByTagName("div");

    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("fade-in"); // Remove the "fade-in" class from each div
        divs[i].classList.add("fade-out");
    }

    setTimeout(function() {
        typeOfService.classList.remove("d-flex");
        typeOfService.classList.add("d-none");
    }, 500);
    setTimeout(fadeInTypeOfTemplate, 500) //Apparently keeping the parantheses () causes the function to trigger instantly, why??????
}

//Call this function to append the "fade-in" class to the Template Type Panel's elements, which starts the fading in animation
function fadeInTypeOfTemplate(){
    typeOfTemplate = document.getElementById("TypeOfTemplate")
    typeOfTemplate.classList.remove("d-none")
    typeOfTemplate.classList.add("d-flex")
    typeOfTemplate.classList.add("fade-in")
}

//Call this function to transition from Template Type Panel > their respective guides
function fadeOutTypeOfTemplate(value) {
    TemplateType = value; //Gets the parameter from the onclick event through this.value and passes it into this variable
    console.log(TemplateType)
    var typeOfTemplate = document.getElementById("TypeOfTemplate");
    var divs = typeOfTemplate.getElementsByTagName("div");

    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("fade-in"); // Remove the "fade-in" class from each div
        divs[i].classList.add("fade-out");
    }

    setTimeout(function() {
        typeOfTemplate.classList.remove("d-flex")
        typeOfTemplate.classList.add("d-none");
    }, 500);
    setTimeout(fadeInVideo, 500) //Apparently keeping the parantheses () causes the function to trigger instantly, why??????
}

//Call this function to transition from fade in the video guide
function fadeInVideo(){
    console.log(ServiceType+TemplateType)
    switch(ServiceType+TemplateType){ //Detect the combination of servicetype and templatetype, and return its corresponding video path in the <source> tag
        case "nsfmc":
            sourcevideo = document.getElementById("srcvideo")
            sourcevideo.src = "Videos\\NSF_MC_ChainOfCommand.mp4"
            break //break is needed as without a break, the next case will still be executed even if it does not match.

        case "nsfcosduty":
            fadeOutVideo(); //Skip the video and go to COS Guide
            break

    }

    videoType = document.getElementById("VideoType")
    videoType.classList.remove("d-none")
    videoType.classList.add("d-flex")
    videoType.classList.add("fade-in")
    video = document.getElementById("Video")
    video.autoplay = true
    video.load()
}

function fadeOutVideo(){
    var videoType = document.getElementById("VideoType");
    var divs = videoType.getElementsByTagName("div");

    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("fade-in"); // Remove the "fade-in" class from each div
        divs[i].classList.add("fade-out");
    }

    setTimeout(function() {
        videoType.classList.remove("d-flex")
        videoType.classList.add("d-none");
    }, 500);
    setTimeout(fadeInGenerator, 500) //Apparently keeping the parantheses () causes the function to trigger instantly, why??????
}

function fadeInGenerator(){
    switch(ServiceType+TemplateType){
        case "nsfmc":
            rsogenerator = document.getElementById("RSOTemplateGenerator")
            rsogenerator.style.display = "block"
            rsogenerator.classList.add("fade-in")
            break //break is needed as without a break, the next case will still be executed even if it does not match.

        case "nsfoff":
            offgenerator = document.getElementById("OffTemplateGenerator")
            offgenerator.style.display = "block"
            offgenerator.classList.add("fade-in")
            break

        case "nsfcosduty":
            cosdutygenerator = document.getElementById("COSTemplateGenerator")
            cosdutygenerator.style.display = "block"
            cosdutygenerator.classList.add("fade-in")
            break
    } 
}

function firstLoad(){
    typeOfTemplate = document.getElementById("TypeOfTemplate")
    typeOfTemplate.classList.remove("d-flex")
    typeOfTemplate.classList.add("d-none")
    videoType = document.getElementById("VideoType")
    videoType.classList.remove("d-flex")
    videoType.classList.add("d-none")
    rsogenerator = document.getElementById("RSOTemplateGenerator")
    rsogenerator.style.display = "none"
    offgenerator = document.getElementById("OffTemplateGenerator")
    offgenerator.style.display = "none"
    cosdutygenerator = document.getElementById("COSTemplateGenerator")
    cosdutygenerator.style.display = "none"
    retrieveFromLocal();

}

function checkTime(){
    currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12:false});
    currentDate = new Date().toLocaleDateString();
    var currentTimeElement = document.getElementById("CurrentTime")
    console.log("The time now is " + currentTime)
    currentTimeElement.innerHTML = "I have to request RSO before 0600. The time now is " + currentTime
}
setInterval(checkTime,1000)

function OnMCFormChange(){
    rank = document.getElementById("generatorrank").value
    username = document.getElementById("floatingInputName").value
    if (document.getElementById("RSOGuidelines").checked == true){
        guidelineticked = true;
        guidelinetickedtext = "*I abide by the following guidelines:* "
    }
    else {
        guidelineticked = false;
        guidelinetickedtext = "*I do NOT abide by the following guidelines:* "
    }

    if (document.getElementById("Replacement").checked == true){
        replacement1 = true;
        replacement1text = "1. I have looked for a replacement for any duties I have today. I will not rely on my superiors/commanders to help me look for one.\n"
    }
    else {
        replacement1 = false;
        replacement1text = "1. I have *NOT* looked for a replacement for any duties I have today. I will not rely on my superiors/commanders to help me look for one.\n"
    }

    if (document.getElementById("Replacement2").checked == true){
        replacement2 = true;
        replacement2text = "2. Upon receiving MCs, I will inform my commanders and look for replacements for any clashing duties."
    }
    else {
        replacement2 = false;
        replacement2text = "2. I do *NOT* acknowledge that upon receiving MCs, I will inform my commanders and look for replacements for any clashing duties."
    }

    noOfRso = document.getElementById("floatingInputNumberOfRSO").value
    rsoReason = document.getElementById("floatingInputReason").value

    rsoTemplateToSuperior = "*RSO Template*\n" + "*Rank and Name:* " + rank + " " + username + "\n" + "*No. Of RSOs this Month:* " + noOfRso + "\n" + "*Reason:* " + rsoReason + "\n" + "\n" + guidelinetickedtext + "\n" 
    + "1. " + document.getElementById("CurrentTime").innerHTML + "\n"
    + "2. I will follow the chain of command when requesting to RSO.\n"
    + "3. I will update my respective groups on my status when permission is granted to RSO.\n"
    + "4. I will send my live location to my respective section.\n"
    + "5. I will reach the polyclinic by 0800.\n"
    + "6. I will update my status/excuses/MCs to COS by 1000, even if I am still waiting.\n" 
    + "7. I will submit the MC via ESS, and send the screenshot alongside the S1Br Template to COS.\n"
    + "8. If my MC is more than 3 days, I will send my Ops Room Reporting Template to COS.\n"
    + "9. I will rest at home.\n"
    + "10. I will keep my hardcopy MC for 6 months.\n\n"
    + "*Important:* \n"
    + replacement1text
    + replacement2text

    rsoTemplateToCOS = "Name: " + rank + " " + username + "\n"
    + "Date & Time: " + currentDate + ", " + currentTime + "\n"
    + "Purpose for Reporting Sick/MA: " + rsoReason + "\n"
    + "Status: TBC" + "\n"
    + "Ops Room Informed: TBC"

    document.getElementById("GeneratedTemplateToSuperior").value = rsoTemplateToSuperior;
    document.getElementById("GeneratedTemplateToCOS").value = rsoTemplateToCOS;

}

//When user presses the copy button, copy all text in the template box into their clipboard.
//Because the navigator.clipboard.writeText method returns a promise 
//and my code does not wait for its result.
//Use .then to wait for writeText to receive its promise first.
function copyRSOTemplateToSuperiorText(){
    navigator.clipboard.writeText(rsoTemplateToSuperior)
        .then(() => {
            alert("Template has been copied! :)")
        })
        .catch(() => {
            alert("Uh oh, something went wrong. :(")
        });
}

function copyRSOTemplateToCOSText(){
    navigator.clipboard.writeText(rsoTemplateToCOS)
        .then(() => {
            alert("Template has been copied! :)")
        })
        .catch(() => {
            alert("Uh oh, something went wrong. :(")
        });
}

function storeToLocal(){
    for (let x = 1; x < 36; x++) {
        var checkbox = document.getElementById("COScheck"+x)
        if (checkbox.checked == true){
            localStorage.setItem("COScheck"+x,checkbox.checked)
            console.log("Stored " + "COScheck" + x + "," + checkbox.checked + " into localStorage")
        }

        else if (checkbox.checked == false){
            localStorage.removeItem("COScheck"+x,checkbox.checked)
            console.log("Removed " + "COScheck"+x,true + " from localStorage")
        }
    }
}

function retrieveFromLocal(){
    for (let iInLocal = 1; iInLocal < 36; iInLocal++){
        var checked = JSON.parse(localStorage.getItem("COScheck"+iInLocal))
        document.getElementById("COScheck"+iInLocal).checked = checked;
    }
    console.log(localStorage)
}