const express = require('express');
const router = express.Router();
const app = express(); 

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.urlencoded({extended: true}));


var Book = require('../models/book');

//--------------------- Home page route.

router.get('/', function (req, res) {
  res.render('home');
});

///////////////////////////

// ----------------------Add Book route--------------------

router.route('/add-book')
.get(function(req,res){

    res.render('addBook')

})
.post(function(req,res){

  const book = new Book({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    description: req.body.desc,
    published_year: req.body.puby,
    publisher: req.body.pub,
    language: req.body.lang,
    genre: req.body.genre,
    price: req.body.price,
    
  });
  book.save(function(req,resp,err){
    if (!err){
        
        res.redirect("view-book/"+resp._id);
    }
    else{
      console.log(err);
      
    }

  });


});

///////////////////////////////

// -----------------VIEW BOOK & ID ROUTE-------------------------------------

router.get("/view-book/:id",function(req,res){
  
  const bookId = req.params.id;
  Book.findOne({_id: bookId}, function(err, book){
    res.render('viewBook', {
      isbn: book.isbn,
      title:book.title,
      author: book.author,
      desc: book.description,
      puby: book.published_year,
      publ: book.publisher,
      lang: book.language,
      genre: book.genre,
      price: book.price,
      id : book._id
    });
  });

});

///////////////////////////////////////////////////

// -----------------------EDIT BOOK & ID ROUTE

router.route("/edit-book/:id")
.get(function(req,res){

  const bookId = req.params.id;  
  Book.findOne({_id: bookId}, function(err, book){

    
      res.render("editBook",{
        
        book:book
        
      })

  });

})
.post(function(req,res){

   
  const upd = {
    
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    description: req.body.desc,
    published_year: req.body.puby,
    publisher: req.body.pub,
    language: req.body.lang,
    genre: req.body.genre,
    price: req.body.price,
    updated_date: Date.now()
    
    
  };
  Book.findByIdAndUpdate(req.params.id,upd,function(err,data){
    if(err){
      console.log(err);
      
    }
    else{
      
      res.redirect("/view-book/"+req.params.id);
      
    }
  });
});

//////////////////////////////////////////

//  ---------------------UPDATE BOOK & ID ROUTE
router.route("update-book/:id")



///////////////////////////////////////////////////

//  -----------------------DELETE & ID ROUTE

router.get("/delete-book/:id",function(req,res){
  const bookId = req.params.id;
  Book.findByIdAndRemove(bookId,function(err){
    if(!err){
            res.redirect("/book-list");
      
    }
  });

});


//////////////////////////////////////////////////

// ---------------BOOK LIST ROUTE-----///////////

router.get("/book-list",function(req,res){
  
  Book.find({}, function(err, books){
    res.render("bookList", {
            books: books
      });
  })
});


////////////////////////////////////////




// ----------------------------------------EXPORTS------------------------------------


module.exports = router;
