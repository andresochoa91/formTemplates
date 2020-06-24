//Index of new files
let filesCount = 1;

//Today's date for calendar
let today = new Date().toISOString().split('T')[0];
let calendar = document.querySelector("#calendar");
calendar.setAttribute('min', today);
calendar.setAttribute('value', today);

//To create people options
(function () {
  const select = document.querySelector("#people");
  let options = "";
  let option;
  for (let i = 1; i <= 20; i++) {
    if (i === 1) {
      option = `<option value="${i}">${i} person</option>`;
    } else {
      option = `<option value="${i}">${i} people</option>`;
    }
    options += option;
  }
  select.innerHTML = options;
})();


//To create schedule options
createScheduleOptions('10:00 AM', '12:00 AM');
function createScheduleOptions(openTime, closeTime) {
  const numberOfTimeSlots = getNumberOfTimeSlots(openTime, closeTime);
  const openTimeArray = openTime.split(':');
  let hour = parseInt(openTimeArray[0]);
  let ampm = openTime.includes("AM") ? "AM" : "PM";
  let times = "";
  let hours = document.querySelector("#hours");
  let half = openTimeArray[1].includes('30') ? "30": "00";
  for (let i = 0; i <= numberOfTimeSlots; i++) {
    if (hour === 12 && ampm === "AM" && half === "00") {
      ampm = "PM"
    } else if (hour === 13) {
      hour = 1;
    } else if (hour === 12 && ampm === "PM" && half === "00") {
      ampm = "AM";
    }
    const option = `<option value="${hour}:${half}${ampm}">${hour}:${half} ${ampm}</option>`;
    times += option;
    hour = half === "00" ? hour : hour + 1;
    half = half === "00" ? "30" : "00";
  }  
  hours.innerHTML = times;
}

// times will look like 10:30 AM 10:00 PM 10.5 to 22
function getNumberOfTimeSlots(openTime, closeTime) {
  const openTimeNumeric = convertTimeStringToNumber(openTime);
  const closeTimeNumeric = convertTimeStringToNumber(closeTime);
  const reservationSlots = (closeTimeNumeric - openTimeNumeric) * 2;
  return reservationSlots;
}

function convertTimeStringToNumber(time) {
  const isTimeAM = time.includes('AM');
  const isTimeTwelve = time.includes('12');
  const timeSplit = time.split(':');
  let timeNumeric;
  if (timeSplit[1].includes('30')) {
    timeNumeric = parseInt(timeSplit[0]) + 0.5;
    if (shouldAdd12Hours(isTimeAM, isTimeTwelve)) {
      timeNumeric += 12;
    }
  } else {
     timeNumeric = parseInt(timeSplit[0]);
     if (shouldAdd12Hours(isTimeAM, isTimeTwelve)) {
      timeNumeric += 12;
     }
  }
  return timeNumeric;
}

function shouldAdd12Hours(isTimeAM, isTimeTwelve) {
  if (isTimeAM) {
    if (isTimeTwelve) {
      return true;
    }
  } else { // PM
    if (!isTimeTwelve) {
      return true;
    }
  }
  return false;
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

// To handle file uploading
function fileInputActive (event) { 
  let fileInput = document.querySelector(`#file-input${event.id.slice(4)}`);
  let fakeFileInput = document.querySelector(`#fake-file-input${event.id.slice(4)}`);
  fileInput.click();

  fileInput.addEventListener("change", () => {
    if (fileInput.value) {
      fakeFileInput.value = fileInput.value.match( /[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
      event.querySelector(".remove-file").removeAttribute("hidden");
      if (document.querySelector("#files-to-upload").children.length >= 5) {
        document.querySelector("#add-more").setAttribute("style", "display: none !important");
      } else {
        document.querySelector("#add-more").setAttribute("style", "display: block !important");
      }
    }
  });
};

// To create a new file node 
document.querySelector("#add-more").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#add-more").setAttribute("style", "display: block !important");
  if (document.querySelector("#files-to-upload").children.length <= 4) {
    filesCount++;
    const newFile = document.createElement("div");
    newFile.id = `file${filesCount}`;
    newFile.innerHTML = `
      <div id="main-file-input${filesCount}" class="input-group mb-2 mr-sm-2">
        <div onclick="fileInputActive(this.parentElement.parentElement)" id="browse${filesCount}" class="input-group-prepend hf">
          <div class="input-group-text">Extra file</div>
        </div>
        <input id="file-input${filesCount}" type="file" hidden>
        <input onclick="fileInputActive(this.parentElement.parentElement)" id="fake-file-input${filesCount}" class="rounded-right form-control hf" placeholder="Click here" onkeydown="return false;" required >
        <button onclick="removeFile(this)" type="button" class="close remove-file" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;
    document.querySelector("#files-to-upload").appendChild(newFile);
    document.querySelector(`#fake-file-input${filesCount}`).click();
    if (document.querySelector("#files-to-upload").children.length >= 5) {
      document.querySelector("#add-more").setAttribute("style", "display: none !important");
    }
  } 
})

// To remove file nodes
function removeFile (event) { 
  document.querySelector("#add-more").setAttribute("style", "display: block !important");  
  let fileID = event.parentElement.parentElement.id;
  if (fileID === "file1") {
    document.querySelector("#add-more").setAttribute("style", "display: none !important");
    event.setAttribute("hidden", "hidden");
    event.parentElement.children[2].value = "";
  } else {
    document.querySelector("#files-to-upload").removeChild(event.parentElement.parentElement);
  }
  if (document.querySelector("#files-to-upload").children.length >= 5) {
    document.querySelector("#add-more").setAttribute("style", "display: none !important");
  }
};

