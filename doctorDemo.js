var firebaseConfig = {
  apiKey: "AIzaSyAm9BtTy7W89QE6AZ5i_2knlKFu3jDzARQ",
  authDomain: "cbshack-3c5ee.firebaseapp.com",
  databaseURL: "https://cbshack-3c5ee.firebaseio.com",
  projectId: "cbshack-3c5ee",
  storageBucket: "cbshack-3c5ee.appspot.com",
  messagingSenderId: "336492211195",
  appId: "1:336492211195:web:beb89ee21669bed57f395e",
  measurementId: "G-HGQYQRZGHW"
};
firebase.initializeApp(firebaseConfig);

//=======================================cloud messaging logic starts=============================================
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BPvF2GIda8pGJZqKYqug9QsH8Q0vFvfV9qc_EfAmrN4YbhKOqpalrviLIV6lRe4t30w4htkE0dMiqu-HNJHvufw"
);
messaging
  .requestPermission()
  .then(function() {
    console.log("Have permission");
    return messaging.getToken();
  })
  .then(function(token) {
    console.log(token);
  })
  .catch(function(err) {
    console.log(err);
  });

var messageReceived = null;
var personalInfo = null;
var appointmentsInfo = null;
var medicinesInfo = null;
var reportsInfo = null;
messaging.onMessage(function(payload) {
  messageReceived = payload["data"]["message"];
  alert(messageReceived);
  var patientData = databaseRef.once("value", gotData, errData);
  function gotData(data) {
    var requiredInfo = { ...data.val() };
    personalInfo = requiredInfo[messageReceived]["Personal_Info"];
    appointmentsInfo = requiredInfo[messageReceived]["Appointments"];
    medicinesInfo = requiredInfo[messageReceived]["Medicines"];
    reportsInfo = requiredInfo[messageReceived]["Reports"];
    // console.log(personalInfo);
  }
  function errData(err) {
    console.log(err);
  }
});
//=======================================cloud messaging logic ends=============================================

//======================================= realtime database starts =============================================
var databaseRef = firebase
  .database()
  .ref()
  .child("Patient"); //storing the reference to the firebase realtime database

function updateDoctorData(patientID, date, remarks, medicines) {
  var appointmentData = {
    Date: date,
    Remarks: remarks
  };
  var medicineData = {};
  for (const key of Object.keys(medicines)) {
    medicineData[key] = medicines[key];
  }
  console.log("Medicines ========= ");
  console.log(medicineData);
  var x = patientID;
  var id1 = "Appointments";
  var id2 = "Medicines";
  firebase
    .database()
    .ref("Patient/" + x + "/" + id1)
    .set(appointmentData);
  firebase
    .database()
    .ref("Patient/" + x + "/" + id2)
    .set(medicineData);
}

var doctorForm = document.querySelector(".doctor-form"); //selecting the div with className = .nurse-form
if (doctorForm) {
  nurseForm.addEventListener("submit", e => {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const remarks = document.getElementById("remarks").value;
    const medicines = document.getElementById("medicines").value;
    updateDoctorData(messageReceived, date, remarks, medicines);
  });
}
var pastHistory = document.getElementById("pastHistory");
if(pastHistory){
    pastHistory.addEventListener("click", function(personalInfo, appointmentsInfo, medicinesInfo, reportsInfo){
        
    });
}
// var patientData = databaseRef.on('value', gotData, errData);
// function gotData(data){
//     // console.log(data.val());
//     var xinfo = {...data.val()};
//     console.log(xinfo);
//     var abcd = xinfo["+919354522796"];
//     // console.log(PersonalInfo);
//     var PersonalInfo = abcd["Personal Info"];
//     // var data =

// }
// function errData(err){
//     console.log(err);
// }

// var patientData = databaseRef.once('value', gotData, errData);
// function gotData(data){
//     // console.log(data.val());
//     var requiredInfo = {...data.val()};
//     // console.log(xinfo);
//     var personalInfo = requiredInfo[messageReceived]["Personal_Info"];
//     console.log(personalInfo);
// }
// function errData(err){
//     console.log(err);
// }
