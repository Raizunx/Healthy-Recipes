document
  .getElementById("userInfoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    //read user input
    let firstName = document.getElementsByName("firstName")[0].value;
    let lastName = document.getElementsByName("lastName")[0].value;
    let mobile = document.getElementsByName("mobile")[0].value;
    let birthday = document.getElementsByName("birthday")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let message = document.getElementsByName("message")[0].value;

    const languageSeected = document.querySelector("#language");
    const language = [].filter
      .call(languageSeected.options, (option) => option.selected)
      .map((option) => option.text);

    const countryCodeSeected = document.querySelector("#countryCode");
    const countryCode = [].filter
      .call(countryCodeSeected.options, (option) => option.selected)
      .map((option) => option.text);

    let gender = "";
    if (document.getElementById("male").checked) {
      gender = "male";
    } else if (document.getElementById("female").checked) {
      gender = "female";
    }

    let msgType = "";
    if (document.getElementById("problem").checked) {
      msgType = "problem";
    } else if (document.getElementById("suggest").checked) {
      msgType = "suggest";
    } else if (document.getElementById("other").checked) {
      msgType = "other";
    }

    var msgID = Date.now() + mobile;

    //sending AJAX request
    fetch("/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msgID: msgID,
        firstName: firstName,
        lastName: lastName,
        countryCode: countryCode,
        mobile: mobile,
        gender: gender,
        birthday: birthday,
        email: email,
        language: language,
        msgType: msgType,
        message: message,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          if (msgType.match("other")) {
            msgType = "message";
          }
          alert(
            "Thanks " +
              firstName +
              ". Your " +
              msgType +
              " has been received. We will contact you soon, inshallah"
          );
          document.getElementsByName("firstName")[0].value = "";
          document.getElementsByName("lastName")[0].value = "";
          document.getElementsByName("mobile")[0].value = "";
          document.getElementsByName("birthday")[0].value = "";
          document.getElementsByName("email")[0].value = "";
          document.getElementsByName("message")[0].value = "";

          var genderSelcted = document.getElementsByName("gender");
          for (var i = 0; i < genderSelcted.length; i++)
            genderSelcted[i].checked = false;

          var msgTypeSelcted = document.getElementsByName("msgType");
          for (var i = 0; i < msgTypeSelcted.length; i++)
            msgTypeSelcted[i].checked = false;
        } else {
          alert(
            "sorry " +
              firstName +
              ". Your " +
              msgType +
              " has not been received."
          );
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        alert("An error occurred!");
      });
  });
