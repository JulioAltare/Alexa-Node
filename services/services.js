const apiUrl = "https://pokeapi.co/api/v2/version/blue/";
const output = document.getElementById("output");

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    output.textContent = JSON.stringify(data, null, 2);
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
