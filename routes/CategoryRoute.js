const CatRoute = require('express').Router()
const Category = require('../models/CategoryModel')
const asyncHandler = require('express-async-handler')
const verify = require('../middleware/verify')
const authAdmin = require('../middleware/authAdmin')


CatRoute.get('/api/categories', asyncHandler(async(req, res) => {

    const categories = await Category.find()

    res.json(categories)


}))



CatRoute.post('/api/create_category', verify, authAdmin, asyncHandler(async(req, res) => {

    const {name} = req.body

    if(!name) {
        res.json({msg: "name cannot be empty when creating category"})
    }

    const categ = await Category.findOne({name})

    if(categ) return res.json({msg: "the category you tried to create already exists. Please create a new one"})


     await Category.create({name})

res.json({msg: "category created successfully"})



}))

CatRoute.delete('/api/delete_category/:id', verify, authAdmin, asyncHandler(async(req, res) => {

await Category.findByIdAndDelete(req.params.id)
res.json({msg: "category has been deleted"})

}))

CatRoute.put('/api/update_category/:id', verify, authAdmin, asyncHandler(async(req, res) => {

    const {name} = req.body


    await Category.findOneAndUpdate({_id: req.params.id}, {name})


    res.json({msg: "category has been updated"})
    
    }))
    


module.exports = CatRoute

