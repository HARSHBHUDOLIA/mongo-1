const express = require("express")
const app = express()
const path = require("path")

const methodOverride = require('method-override');

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
const port = 3000

const mongoose = require("mongoose")

const Product = require("./models/product")
main().catch((err) => console.log(err))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
async function main() {
   try {
      await mongoose.connect("mongodb://localhost:27017/farmStand")
      console.log("Mongo working")
   } catch (error) {
      console.log("Mongo  not working")
   }
}
app.get("/products/new",(req,res)=>{
 
  res.render("products/new");
})

app.post("/products",async(req,res)=>{
  const newProduct= new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`)
})
app.get("/products", async (req, res) => {
  const {category}=req.query;
  if(category){
    const pro = await Product.find({category})
    res.render("products/index", { pro,category })
  }else{
    const pro = await Product.find({})
    res.render("products/index", { pro,category:'ALL' })
  }
   

   
})

app.get("/products/:id", async (req, res) => {
   const { id } = req.params
   const product = await Product.findById(id)
   res.render("products/show", { product })
})

app.get("/products/:id/edit",async (req,res)=>{
  const { id } = req.params
  const product = await Product.findById(id)
  res.render("products/edit", { product });
})

app.put("/products/:id",async(req,res)=>{
  const { id } = req.params;
  const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true})
  res.redirect(`/products/${product._id}`)
})
app.delete("/products/:id",async(req,res)=>{
  const { id } = req.params;
  await Product.findByIdAndDelete(id)
  res.redirect(`/products`)
})
app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
