import express from 'express';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import bodyParser from 'body-parser';
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'
const path = require('path');

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));


const app = express();
app.use(bodyParser.json())
app.use("/api/users", userRoute);
app.use("/api/products",productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
})

if(process.env.NODE_ENV==='production'){
  app.use(express.static('frontend/build'));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

const port = process.env.port || 5000;
app.listen(port, () => { console.log("Server started at http://localhost:5000") });