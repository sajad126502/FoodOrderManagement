const Category = require('../models/Category');

exports.create = async (req, res) => {
    const { category } = req.body;

    try {

        let newCategory = new Category();
        const isCategory = await Category.findOne({category: category});
        if(isCategory){
            return res.status(400).json({
                errorMessage:`${category} category already exists`
            })
        }
        newCategory.category = category;

        newCategory = await newCategory.save();

        res.status(200).json({
            category: newCategory,
            successMessage: `${newCategory.category} is created!`
        })
    } catch (err) {
        console.log('category create error: ', err);
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }

}

exports.read = async (req, res) => {

    try {
        let categories = await Category.find();
       
        res.status(200).json({categories});
        
    } catch (err) {
        console.log('category create error: ', err);
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }

}