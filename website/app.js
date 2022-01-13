/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "8f080650ee0acad011f33a6e59ea2c86";
let d = new Date();
let newDate = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();

//add click Event listener to generate button
document.getElementById("generate").addEventListener("click", generateData);

//Async function run when submit the button generate
async function generateData() {
  const zip = document.getElementById("zip").value;
  const feel = document.getElementById("feelings").value;
  //Check the wrong or missing input
  if (zip.length != 5 || feel === "") {
    alert("Wrong zip code Or missing data");
    return;
  }
  const urlRequest = `${baseURL}${zip},us&units=metric&appid=${apiKey}`;
  const res = await fetch(urlRequest);
  //Check the wrong zip code
  if (res.status != 200) {
    alert("The zip code is not correct");
    return;
  }
  const data = await res.json();
  const temp = data.main.temp;
  const myData = { temp: temp, feeling: feel, date: newDate };
  //post data to server code into callback function
  postData("/postData", myData);
  await updateUI();
}

//Post request to post data to server side
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Async function to get data form server side and then update UI
const updateUI = async () => {
  const req = await fetch("/getData");
  try {
    const data = await req.json();
    document.getElementById("date").textContent = `The Date Is: ${data.date}`;
    document.getElementById("content").textContent = `Your Feeling Is: ${data.feeling} :)`;
    document.getElementById("temp").textContent = `The Tempreture Is: ${data.temp}`;
  } catch (error) {
    console.log("error", error);
  }
};
