import xml2js from 'xml2js';

const apiUrl = "http://localhost:3000/mock/login";
//const output = document.getElementById("output");

function fetchData(){
  fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((data) => {
    //console.log(data);
    transformXml(data);
    //output.textContent = JSON.stringify(data, null, 2);
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
}


function transformXml(xmlText){
  const options = {
    tagNameProcessors:[xml2js.processors.stripPrefix],
    explicitArray: false
  }
    xml2js.parseString(xmlText,options,(err,result)=>{
        if(err){
            console.error(err);
            return;
        }
        console.log(result.Envelope.Body.AreUserAndPasswordCorrectResponse.AreUserAndPasswordCorrectResult.SessionGuid);
    })

}

export {fetchData};

  
