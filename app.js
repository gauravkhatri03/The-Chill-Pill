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
//function receiving message
messaging.onMessage(function(payload) {
  messageReceived = payload["data"]["message"];
  console.log(lol);
});

var patientForm = document.querySelector(".patient-form");
const sendNotification = async message => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "key=AAAATlh_q_s:APA91bFXP4MGfeaFvrZkRpmpqoKJZEcKGSsH-qZlqR7cmkU4-xCtfbJrtByxBrr5MBrNHB7I6cPOH-f7MrjIX0f7iGd_GPvplY6QzidCxnnXU5lGUitZna1-i0IhlSUiJIcvLpio2Aih"
      }
    };
    // var data = {
    //   to:
    //     "/topics/919667099953",
    //   data: {
    //     title: "Lauda Lassan",
    //     message: message
    //   }
    // };
    var data = {
      to: "/topics/919667099953",
      data: {
        title: "Take a chill pill",
        message: message
      }
    };
    let res = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      data,
      options
    );
    alert("Patient has been notified");
    // window.setTimeout(() => {
    //   location.reload();
    // }, 3000);
  } catch (err) {
    console.log(err);
  }
};
if (patientForm) {
  patientForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = document.getElementById("textareaTest").value;
    console.log("message======= " + message);
    sendNotification(message);
  });
}

//=======================================cloud messaging logic ends=============================================

//======================================= realtime database starts =============================================
// var database = firebase.database();

// function updatePatientData(patientID, weight, bloodPressure){
//     database.ref.child('Patient').child("+919354522796").child("Personal Info").set({
//         Weight : 70,
//         BloodPressure : "85 bpm"
//     });
// }

// function createDoctorPrescription(patientID, appointmentData, medicines){
//     database.ref.child('Patient').child(patientID).child("Appointments").push({
//         Date : appointmentData.date,
//         Remarks: appointmentData.remarks
//     });
// }

// function createReport(patientID, reportName, ReportLink){
//     database.ref.child('Patient').child(patientID).child("Reports").push({
//         reportName : ReportLink
//     });
// }
