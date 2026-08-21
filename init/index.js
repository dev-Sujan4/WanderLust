// const mongoose = require ("mongoose")
// const initDb = require("./data.js")
// const Listing = require("../models/listing.js")
// const Review = require("../models/listing.js")



// main()
//   .catch((err)=>{ 
//     console.log(err)
//   })
//   .then((res) =>{
//     console.log(res)
//   })


// async function main(){
// await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
// }

// const initdata = async () => {
//     await Listing.deleteMany({});
//     await Listing.insertMany(initDb);
//     await Review.updateMany({},{$set:{author: '6a83fea2832750e985463725'}})
//     console.log("data was initialised")
// }
// initdata();

const mongoose = require('mongoose');

// 1. IMPORT YOUR MODEL 
// Adjust the path './models/listing.js' if your model is located somewhere else!
const Listing = require('../models/listing.js'); 

// 2. CONNECT TO YOUR DATABASE
// Assuming your local database is named "wanderlust". Change this URL if using MongoDB Atlas.
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('❌ Connection error:', err));

// 3. THE UPDATE LOGIC
const updateCategories = async () => {
  const categoryUpdates = {
    'Alpine Paradise: Secluded Luxury Cabin in the Clouds': ["Mountains", "Trending"],
    'Tropical Oasis: Serene Bamboo Villa with Private Infinity Pool': ["Pools", "Trending"],
    'Sky-High Elegance: Panoramic Penthouse in the Heart of Manhattan': ["Iconic city"],
    'Aegean Dream: Iconic White-Washed Cave House with Sunset Views': ["Iconic city", "Trending"],
    'Zen Retreat: Historic and Tranquil Machiya Townhouse': ["Iconic city", "Rooms"],
    'Sunset Beachfront Bungalow Retreat': ["Trending", "Rooms"],
    'La Dolce Vita: Spectacular Cliffside Villa on the Amalfi Coast': ["Iconic city", "Trending"],
    'Oceanfront Haven: Modern Beach House with Breathtaking Mountain Views': ["Mountains"],
    'Fairy Tale Escape: Historic 18th-Century Chateau in the Countryside': ["Castles"],
    'Jungle Canopy: Eco-Friendly Luxury Treehouse in the Rainforest': ["Camping", "Trending"],
    'Desert Mirage: Ultra-Chic High-Rise Apartment with Marina Views': ["Iconic city"],
    'Highland Majesty: Exclusive Stay in an Authentic Scottish Castle': ["Castles", "Mountains"],
    'Turquoise Dreams: Overwater Bungalow with Glass-Bottom Floors': ["Trending"],
    'Arctic Glow: Thermal Glass Igloo Under the Northern Lights': ["Arctic", "Camping"],
    'Bohemian Rhapsody: Vibrant Riad in the Heart of the Medina': ["Iconic city", "Pools"],
    'Vineyard Estate: Tuscan Villa with Rolling Hill Views': ["Farm"],
    'Urban Oasis: Sleek Modern Loft in Downtown Tokyo': ["Iconic city", "Rooms"],
    'Coastal Chic: Bright and Airy Seaside Cottage': ["Rooms"],
    'Majestic Peaks: Ski-In/Ski-Out Lodge with Private Sauna': ["Mountains"],
    'Royal Heritage: Lavish Palace Suite with Courtyard Gardens': ["Castles", "Iconic city"],
    'Outback Sanctuary: Luxury Eco-Tent in the Red Desert': ["Camping"],
    'Andean Echoes: Rustic Adobe Dome in the Sacred Valley': ["Mountains", "Trending"],
    'Caribbean Breeze: Oceanfront Villa with Private Yacht Dock': ["Pools"]
  };

  try {
    console.log("Starting database update...");
    
    // Loop through the object and update each listing by its exact title
    for (const [title, categories] of Object.entries(categoryUpdates)) {
      const result = await Listing.updateOne(
        { title: title }, 
        { $set: { category: categories } }
      );
      
      if (result.modifiedCount > 0) {
         console.log(`✏️ Updated: "${title}"`);
      } else {
         console.log(`⚠️ Skipped (Not found or already updated): "${title}"`);
      }
    }
    
    console.log("🎉 All categories successfully updated!");
    
  } catch (error) {
    console.error("❌ Error updating categories:", error);
  } finally {
    // 4. CLOSE THE CONNECTION
    // This ensures your terminal doesn't hang after the script finishes
    mongoose.connection.close();
  }
};

// Execute the function
updateCategories();


      
