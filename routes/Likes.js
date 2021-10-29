const express=require("express")
const router=express.Router()

const {getUserById, getBlogById} = require('../controllers/Blog')
const {getLikeById, saveLike, totalLikes, deleteLike, getLikes} =require('../controllers/Likes')
const{isSignedIn, isAuthenticated}=require("../controllers/User")

router.param('blogID',getBlogById);
router.param('userID',getUserById);
router.param('likeID',getLikeById);

router.post('/:userID/:blogID',isSignedIn, isAuthenticated, saveLike)
router.get('/likes/:blogID', totalLikes)
router.get('/like/:userID/:blogID', getLikes)
router.delete('/likes/delete/:likeID', deleteLike)


module.exports=router; 
