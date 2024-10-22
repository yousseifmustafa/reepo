const booksModel = require('../models/books.model');
const Book = require('../models/books.model');
const User = require('../models/user.model');


const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({ status: "Success" , data: books });
    } catch (error) {
        console.error("Error getting books:", error.message);
        res.status(500).json({  status: "Erorr" , message: "Server error" });
    }
};

const getBookById = async (req, res) => {
    try {
        const { bookId } = req.params; 
        if (!book) {
            return res.status(404).json({  status: "Erorr" , message: "Book not found" });
        }

        res.status(200).json({status: "Success" , data: book}); 
    } catch (error) { const book = await Book.findOne({ bookId });

        console.error("Error getting the book:", error.message);
        res.status(500).json({ status: "Erorr" , message: "Server error" });
    }
};



const addToPurchasedList = async (req, res) => {
    try {
        const userId = req.user.id;
        const { Book_Id } = req.body; 

        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        const bookExists = user.purchasedBooks.some(book => book._id.toString() === Book_Id.toString());
        
        if (bookExists) {
            return res.status(400).json({ status: "Error", message: "Book already in purchased list" });
        }

        const book = await booksModel.findById(Book_Id);
        if (!book) {
            return res.status(404).json({ status: "Error", message: "Book not found" });
        }

        user.purchasedBooks.push(book);
        await user.save(); 
        return res.status(200).json({
            status: "Success",
            message: "Book added to purchased list successfully",
            purchasedBooks: user.purchasedBooks
        });
    } catch (error) {
        console.error("Error adding to purchased list:", error.message);
        return res.status(500).json({ status: "Error", message: "Server error" });
    }
};


    

const getPurchasedList = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "Error" , message: "User not found" });
        }
        console.log(user.purchasedBooks)
        return res.status(200).json({ status: "Success" , data: user.purchasedBooks });
    } catch (error) {
        console.error("Error getting purchased list:", error.message);
        return res.status(500).json({ status: "Error" , message: "Server error" });
    }
};
const getSimilarBooks = async (req, res) => {
    try {
        const { category } = req.params; 
        console.log("Category:", category);

        const books = await booksModel
            .find({ genres: { $regex: category, $options: 'i' } })
            .sort({ ratingsAverage: -1 }) 
            .limit(5);

        console.log("Books found:", books.length);

        if (books.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No books found in this category."
            });
        }

        res.json({ status: "Success", data: books });
    } catch (error) {
        console.error("Error fetching books by category:", error.message);

        res.status(500).json({
            status: "Error",
            message: "An error occurred while fetching books. Please try again later."
        });
    }
  };
  const removeFromPurchasedList = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { bookId } = req.params; 
        console.log(req.params);

        
        if (!bookId) {
            return res.status(400).json({ status: "Error", message: "Book ID is required" });
        }

       
        const user = await User.findById(userId);
        const book = await Book.findById(bookId); 

       
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        if (!book) {
            return res.status(404).json({ status: "Error", message: "Book not found" });
        }

        const bookIndex = user.purchasedBooks.findIndex((purchasedBook) => purchasedBook._id.toString() ==bookId);
        if (bookIndex === -1) {
            return res.status(404).json({ status: "Error", message: "Book not found in purchased list" });
        }

        user.purchasedBooks.splice(bookIndex, 1);

        await user.save();

        return res.status(200).json({
            status: "Success",
            message: "Book removed from purchased list successfully",
            purchasedBooks: user.purchasedBooks,
        });
    } catch (error) {
        console.error("Error removing book from cart:", error.message);
        return res.status(500).json({ status: "Error", message: "Server error" });
    }
};



const getbookcat = async (req, res) => {
    try {
        const {category} = req.params; 
        console.log("Category:", category);

        const books = await booksModel.find({ genres: { $regex: category, $options: 'i' } });

        console.log("Books found:", books.length);


        res.json({ status: "Success", data: books });
    } catch (error) {
        console.error("Error fetching books by category:", error.message);


        res.status(500).json({
            status: "Error",
            message: "An error occurred while fetching books. Please try again later."
        });
    }
};


  
const clearPurchasedList = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        user.purchasedBooks = [];
        console.log("Before saving, purchasedBooks:", user.purchasedBooks);

        await user.save();

        return res.status(200).json({ 
            status: "Success", 
            message: "Purchased list cleared successfully", 
            purchasedBooks: user.purchasedBooks 
        });
    } catch (error) {
        console.error("Error clearing purchased list:", error.message);
        return res.status(500).json({ status: "Error", message: "Server error" });
    }
};





module.exports = {
    getAllBooks,
    getBookById,
    addToPurchasedList,
    getPurchasedList,
    getSimilarBooks,
    removeFromPurchasedList,
    getbookcat,
    clearPurchasedList

};
