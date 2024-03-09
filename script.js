console.clear();
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.forms["myForm"]["name"].value;
  let address = document.forms["myForm"]["address"].value;
  let email = document.forms["myForm"]["email"].value;
  let telephone = document.forms["myForm"]["telephone"].value;
  let consent = document.forms["myForm"]["consent"].checked;

  const userData = {
    name: name,
    address: address,
    email: email,
    telephone: telephone,
    consent: consent,
  };
  console.log(userData);

  const jsonData = JSON.stringify(userData);

  if (
    name === "" ||
    address === "" ||
    telephone === "" ||
    email === "" ||
    !consent
  ) {
    alert("Please fill in all fields and consent to continue.");
    return false;
  }

  async function postData() {
    let myPromise = new Promise(async function (resolve) {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonData,
          }
        );

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        resolve(JSON.stringify(jsonResponse, null, 2));
      } catch (error) {
        resolve("An error occurred. Please try again.");
      }
    });

    document.getElementById("response").innerText = await myPromise;
  }

  postData();
  // {
  //   document.getElementById("response").innerHTML =
  //     "Form Succesfully submitted";
  // }
});
