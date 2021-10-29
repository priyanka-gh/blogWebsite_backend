const express = require('express');
const router = express.Router();

const {createNewBlog, getBlogById, getUserById, getBlog, getAllBlogsByUser, deleteBlog, updateBlog, getAllBlogs, likePost, deleteBlogbyAdmin, photo} = require('../controllers/Blog');
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/User");

router.param('blogID',getBlogById);
router.param('userID',getUserById);

router.post('/blogs/create/:userID',isSignedIn, isAuthenticated, createNewBlog)
router.get('/blogs/:blogID',getBlog)
router.get('/blogs/all/:userID', getAllBlogsByUser)
router.delete('/blogs/remove/:userID/:blogID',isSignedIn, isAuthenticated, deleteBlog)
router.put('/blogs/update/:userID/:blogID',isSignedIn, isAuthenticated,  updateBlog)
router.get('/blogs', getAllBlogs)
// router.put('/blogs/likePost/:blogID', likePost)

router.get("/product/photo/:blogID",photo);

//adminRoutes
router.delete('/blogs/removeByAdmin/:userID/:blogID',isSignedIn, isAuthenticated, isAdmin, deleteBlog)


module.exports=router