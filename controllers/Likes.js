const Like = require('../models/Likes')


exports.getLikeById = (req, res, next, id) => {
    Like.findById(id)
    .exec((err, like) => {
        if(err || !like){
            return res.status(400).json({
                error : "No Like found in DB"
            })
        }
        req.like = like;
        next();
    })
}

exports.saveLike = (req, res) => {
    const userid = req.profile._id
    const blogid = req.blog._id
    
    const like = new Like()
    like.user = userid
    like.blog = blogid

    Like.find({user : userid, blog : blogid})
    .exec((err, likedBlog) => {
        if(likedBlog.length>0){
            return res.status(400).json({
                error: "Can't like"
            });
        }
        else{
            like.save((err, like ) => {
            if(err ){
                return res.status(400).json({
                    error: "Can't like"
                });
            }
                return res.json(like)
            })}
    })
}

exports.deleteLike = (req, res) => {
    let like = req.like ;
    like.remove((err, deletedLike) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the blog"
            });
        }
        res.json({
            message: "Deletion was a success",
        });
    })
}

exports.totalLikes = (req, res) => {
    blogid = req.blog._id
    Like.find({blog : blogid})
    .populate('user','_id name')
    .populate('blog','_id title')
    .exec((err, likes) => {
        if(err || !likes){
            return res.json({
                success : false,
                error : err
            })
        }
        return res.json(likes.length)

    })
}

exports.getLikes = (req, res) => {

    const userid = req.profile._id
    const blogid = req.blog._id

    Like.find({user : userid, blog : blogid})
    .exec((err,blogs) => {
        if(err || !blogs){
            return res.json({
                success : false,
                error : err
            })
        }
        return res.json(blogs)
    })
}