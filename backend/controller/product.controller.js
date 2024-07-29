import asynHandler from "../middleware/asynchandler.middleware.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";

//desc: get all products
//route:/api/v1/products
//access public
const getProducts = asynHandler(async(req, res)=>{
    let products =await Product.find({});
    res.send(products);
});


//desc: get product by id
//route:/api/v1/products/:id
//access public
const getProductById = asynHandler(async(req, res)=>{
    let id= req.params.id;
    let product = await Product.findById(id);
    if(!product){
        throw new apiError(404, "Product Not Found");
    }
    res.send(product);
});

//desc: add products
//route:/api/v1/products (post api)
//access private
const addProduct = asynHandler(async(req, res)=>{
    let product = await Product.create({...req.body, user: req.user._id})
    res.send({message: "Product created successfully", product})
});

//desc: update products
//route:/api/v1/products/update/:id (put api)
//access private
const updateProduct = asynHandler(async(req, res)=>{
    let id = req.params.id;
    let product = await Product.findById(id);
    if(product){
        product.name = req.body.name ||    product.name;
        product.image = req.body.image ||  product.image;
        product.description = req.body.description || product.description;
        product.brand = req.body.brand || product.brand;
        product.category = req.body.category || product.category;
        product.price = req.body.price || product.price;
        product.countInStock = req.body.countInStock || product.countInStock;
        let updateProduct = await  product.save();
        res.send({Message:"Product Updated Successfully", product: updateProduct});
    }else{
        throw new ApiError(404, "User not found")
    }
});

//desc: delete products
//route:/api/v1/products/delete/:id (delete api)
//access private
const deleteProduct = asynHandler(async(req, res)=>{
    let id = req.params.id;
    let product = await Product.findById(id);
    if(!product){
        throw new apiError(404, "Product is not found")
    }
    await Product.findByIdAndDelete(id);
    res.send("Product removed");
});


//desc: addReview for products
//route:/api/v1/products/addreview/:id (delete api)
//access private
const addUserReview = asynHandler(async(req, res)=>{
    let id = req.params.id;
    let{rating, comment}  = req.body;
    let product  = await Product.findById(id);
    if(!product){
        throw new apiError(404, "Product Not found");
    };
    
// Check if the user has already reviewed the product
    const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
        throw new apiError(400, "User has already reviewed this product");
    }


    product.reviews.push({
        name:req.user.name,
        user:req.user._id,
        rating,
        comment,
    });
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.send({message: "Review added to product"})
})











const toTenProduct = asynHandler(async(req, res)=>{
    let topProducts = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.send(topProducts);
})



export {getProducts, getProductById, addProduct, deleteProduct, updateProduct, addUserReview, toTenProduct};
