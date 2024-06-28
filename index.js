import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import {fetchData} from './services/services.js';
import NodeCache from "node-cache";




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
const myCache = new NodeCache();

// app use
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/xml2js"))
);

app.use("/services", express.static(path.join(__dirname, "/services")));
app.use("/utils", express.static(path.join(__dirname, "/utils")));

// GET REQUESTS
app.get("/", (req, res) => {
  fetchData();
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get('/mock/login', function (req, res) {
  const options = {
      root: path.join(__dirname,"mock")
  };

  const fileName = 'login.xml';
  res.sendFile(fileName, options, function (err) {
      if (err) {
          console.error('Error sending file:', err);
      } else {
          console.log('Sent:', fileName);
      }
  });
});

app.get('/demo',(req,res)=>{
  // If cache has key, retrieve value
     // from cache itself
     if(myCache.has('uniqueKey')){
      console.log('Retrieved value from cache !!')
      
      // Serve response from cache using
      // myCache.get(key)
      res.send("Result: " + myCache.get('uniqueKey'))
 }else{

      // Perform operation, since cache 
      // doesn't have key
      let result =  'Esto es una prueba de la BBDD';
      
      // Set value for same key, in order to 
      // serve future requests efficiently
      myCache.set('uniqueKey', result)
      
      console.log('Value not present in cache,'
            + ' performing computation')
      res.send("Result: " + result)
 }
})

//DEMO REQUESTS

function demo(){
  let temp = 0;
     for(let i=0; i<100000; i++)
          temp = (Math.random()*5342)%i;
     return 123;
}


// POST REQUESTS
app.post("/", (req, res) => {
  

});

// Listen port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




