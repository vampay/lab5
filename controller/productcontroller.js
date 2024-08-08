const express = require("express");
const Product = require("../models/product");

// Get all products
exports.getProduct = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        // Send the products as JSON with a 200 status
        res.status(200).json(products);
    } catch (error) {
        // Send error message with a 500 status
        res.status(500).json({ message: error.message });
    }
};

// Get a product by ID
exports.getProductID = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new product
exports.postProduct = async (req, res) => {
    try {
        const { product_name, product_type, price, unit } = req.body;
        const product = new Product({ product_name, product_type, price, unit });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        
        const update = req.body;
        Object.assign(product, update);
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
