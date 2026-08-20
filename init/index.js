const mongoose = require ("mongoose")
const initDb = require("./data.js")
const Listing = require("../models/listing.js")
const Review = require("../models/listing.js")



main()
  .catch((err)=>{ 
    console.log(err)
  })
  .then((res) =>{
    console.log(res)
  })


async function main(){
await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initdata = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initDb);
    await Review.updateMany({},{$set:{author: '6a83fea2832750e985463725'}})
    console.log("data was initialised")
}
initdata();




      
