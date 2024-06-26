
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
var existingExercises;
var exerciseNumber;

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

function fadeOutNSFRSOVideo(){
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
    setTimeout(fadeInNSFRSOGenerator, 500) //Apparently keeping the parantheses () causes the function to trigger instantly, why??????
}

function fadeInNSFRSOGenerator(){
    rsogenerator = document.getElementById("RSOTemplateGenerator")
    rsogenerator.style.display = "block"
    rsogenerator.classList.add("fade-in")
}

function firstLoad(){
    typeOfTemplate = document.getElementById("TypeOfTemplate")
    typeOfTemplate.classList.remove("d-flex")
    typeOfTemplate.classList.add("d-none")
}

function cosLoad(){
    retrieveFromLocal();
}

function nsfRSOLoad(){
    setInterval(checkTime,1000)
    setInterval(setCurrentTimeInnerHTML,1000)
    videoType = document.getElementById("VideoType")
    videoType.classList.remove("d-flex")
    videoType.classList.add("d-none")
    rsogenerator = document.getElementById("RSOTemplateGenerator")
    rsogenerator.style.display = "none"

    sourcevideo = document.getElementById("srcvideo")
    sourcevideo.src = "Videos\\NSF_MC_ChainOfCommand.mp4"

    videoType = document.getElementById("VideoType")
    videoType.classList.remove("d-none")
    videoType.classList.add("d-flex")
    videoType.classList.add("fade-in")
    video = document.getElementById("Video")
    video.autoplay = true
    video.load()
}

function checkTime(){
    currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12:false});
    currentDate = new Date().toLocaleDateString();
    console.log("The time now is " + currentTime)
}

function setCurrentTimeInnerHTML(){
    var currentTimeElement = document.getElementById("CurrentTime")
    currentTimeElement.innerHTML = "I have to request RSO before 0600. The time now is " + currentTime
}

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

    rsoTemplateToSuperior = "*RSO Template*\n" + "*Rank and Name:* " + rank + " " + username + "\n" + "*No. Of RSOs this Month:* " + noOfRso + " (Including today)" + "\n" + "*Reason:* " + rsoReason + "\n" + "\n" + guidelinetickedtext + "\n" 
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
    for (let x = 1; x < 37; x++) {
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
    for (let iInLocal = 1; iInLocal < 37; iInLocal++){
        var checked = JSON.parse(localStorage.getItem("COScheck"+iInLocal))
        document.getElementById("COScheck"+iInLocal).checked = checked;
    }
    console.log(localStorage)
}

function clearCOSCheckmarks() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    localStorage.clear()
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

function addExercise() {
    const container = document.getElementById('srtFieldContainer');

    // Count existing exercises to determine the next number
    existingExercises = container.querySelectorAll('.form-floating').length;
    exerciseNumber = existingExercises + 1;

    // Create new exercise field
    const newExerciseField = document.createElement('div');
    newExerciseField.classList.add('row');
    newExerciseField.innerHTML = `
        <div class="col">
            <div class="form-floating mb-3 col">
                <input type="text" class="form-control" id="floatingInputSRTEx${exerciseNumber}">
                <label for="floatingInputSRTEx${exerciseNumber}">Exercise ${exerciseNumber}</label>
            </div>
        </div>
    `;

    // Append the new exercise field to the container
    container.appendChild(newExerciseField);
}

function OnSRTFormChange(){
    var SRTDate = document.getElementById('floatingInputSRTDate').value
    var SRTTimeFrom = document.getElementById('floatingInputSRTTimeFrom').value
    var SRTTimeTo = document.getElementById('floatingInputSRTTimeTo').value
    existingExercises = document.getElementById('srtFieldContainer').querySelectorAll('.form-floating').length;
    const SRTExercises = []

    for (let iSRT = 1; iSRT <= existingExercises; iSRT++){
        var Exercise = document.getElementById('floatingInputSRTEx'+iSRT)
        SRTExercises.push(iSRT + ". " + Exercise.value)
    }
    console.log(SRTExercises)

    const srtPersonnelTextArea = document.getElementById('floatingInputSRTPax');
    const srtPersonnelTextAreaNames = srtPersonnelTextArea.value.trim()
    // Split the text content into an array of names using newline \n as the separator
    const namesArray = srtPersonnelTextAreaNames.split('\n');
    console.log(namesArray)

    var generatedSRTTemplate = 
    "Greetings Sirs and all,"
    + "\n\n"
    + "NSDC WKSP PLT will be doing *SRT on "
    + SRTDate + " in NSDC from " 
    + SRTTimeFrom + "hrs to "
    + SRTTimeTo + "hrs.*"
    + "\n\n"
    + "Individual RAC will be conducted based on SRT guidelines. Safety Brief and Water Parade will be conducted prior to the activities and to inform participants to keep a close watch for one another while maintaining safe distancing."
    + "\n\n"
    + "Type of Training/Exercises:"
    + "\n"
    + SRTExercises.join('\n')
    + "\n\n"
    + "Personnel Involved:"
    + "\n"
    + namesArray.join('\n')
    + "\n\n"
    + "For your approval sirs."

    document.getElementById('GeneratedSRTTemplate').value = generatedSRTTemplate


}

function copySRTTemplate(){
    navigator.clipboard.writeText(document.getElementById('GeneratedSRTTemplate').value)
        .then(() => {
            alert("Template has been copied! :)")
        })
        .catch(() => {
            alert("Uh oh, something went wrong. :(")
        });
}