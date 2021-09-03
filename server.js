import express from 'express'; 
import mongoose from 'mongoose'; 
import dotenv from 'dotenv'; 
import pdf from 'html-pdf'; 

dotenv.config(); 

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((con) => console.log('Connected to Database !')).catch(error => console.log(error))
const app = express(); 
app.use(express.json()); //body parser 


// pdf.create('<h1>something from pdf say hello</h1>').toFile('result.pdf',(err,res)=> { 
//   console.log(err,res.filename); 
// })



const PORT = process.env.PORT || 5000; 

app.listen(PORT , () => { 
  console.log(`Server is running on port ${PORT}`)
})

//eslint setup 