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

app.use(express.json());

// GET REQUESTS
app.get("/", (req, res) => {
  fetchData();
  res.sendFile(path.join(__dirname, "/index.html"));
});


//Mock del login de la aplicacion R+
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

//Obtiene todos los valores de la cache.
app.get('/getCache',(req,res)=>{
  console.log('Retrieved value from cache !!')
  myCache.mget(myCache.keys());
  res.send( myCache.mget(myCache.keys()));
});

//Borra todos los datos de la cache.
app.delete('/deleteCache',(req,res)=>{
  //console.log('los datos de la cache han sido borrados');
  myCache.flushAll();
  res.status(200).send('Cache borrada');
})

//Almacena datos en la cache.
app.post("/postCache", (req, res) => {
let keyValue =  Math.floor(Math.random() * 1000);
let savedValue = false;
let dataFromReq = req.body;
while(!savedValue){
  if(!myCache.has(keyValue.toString())){
    myCache.set(keyValue.toString(),dataFromReq);
    savedValue = true;
  }else{
    keyValue =  Math.floor(Math.random() * 1000);
  }
}
res.status(200).send(dataFromReq);
});

// Listen port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});







