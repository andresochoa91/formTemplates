//Index of new files
let filesCount = 1;

//Today's date for calendar
let today = new Date().toISOString().split('T')[0];
let calendar = document.querySelector("#calendar");
calendar.setAttribute('min', today);
calendar.setAttribute('value', today);

//To create people options
(function () {
  for (let i = 1; i <= 20; i++) {
    let option = document.createElement("option");
    if (i === 1) {
      option.textContent = `${i} person`;
    } else {
      option.textContent = `${i} people`;
    }
    document.querySelector("#people").appendChild(option);
  }
})();

//To create schedule options
(function () {
  let hour = 10;
  let ampm = "AM";
  let half = "00"
  
  for (let i = 0; i < 29; i++) {
    if (hour === 12 && ampm === "AM") {
      ampm = "PM"
    } else if (hour === 13) {
      hour = 1;
    } else if (i === 28) {
      ampm = "AM";
    }
    let option = document.createElement("option");
    option.textContent = `${hour}:${half} ${ampm}`;
    document.querySelector("#hours").appendChild(option);
    hour = i % 2 !== 0 ? hour + 1 : hour;
    half = half === "00" ? "30" : "00";
  }  
})();
             
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

