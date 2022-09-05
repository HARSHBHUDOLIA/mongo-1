const mongoose = require("mongoose")

const Product = require("./models/product")
main().catch((err) => console.log(err))

async function main() {
   try {
      await mongoose.connect("mongodb://localhost:27017/farmStand")
      console.log("Mongo working")
   } catch (error) {
      console.log("Mongo  not working")
   }
}

// const p = new Product({
//    name: "Ruby Grapefruits",
//    price: 34,
//    category: "fruits",
// })

// p.save()
//    .then((data) => console.log(data))
//    .catch((e) => console.log(e))

const seedProducts = [
   {
      name: "Grape",
      price: 3,
      category: "fruits",
   },
   {
      name: "Guava",
      price: 3,
      category: "fruits",
   },
   {
      name: "milk",
      price: 32,
      category: "dairy",
   },
   {
      name: "Tomato",
      price: 2,
      category: "vegetables",
   },
   {
      name: "Bananna",
      price: 30,
      category: "fruits",
   },
]

Product.insertMany(seedProducts)
   .then((res) => console.log(res))
   .catch((res) => console.log(res))
