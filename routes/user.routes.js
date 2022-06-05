const { Router } = require('express')
const User = require('../modules/User')
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./uploads/')

    },
    filename:function (req,file,cb){
        const parts = file.mimetype.split('/')
        const ext = `.` + parts[parts.length - 1]
        cb(null,req.user.userId + ext)
    }
})
const fileFilter = (req,file,cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }


}
const upload = multer({
    storage:storage,
    limits:{
    fileSize : 1024 * 1024 * 5},
    fileFilter:fileFilter
})

router.get('/users', authMiddleware,async (req, res) => {
    try {
        const users = await User.find({},{username:1,email:1,userImage:1})
        res.status(201).json({users})
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})
router.get('/details', authMiddleware,async (req, res) => {
    try {
        const {userId} = req.query
        const user = await User.findById(userId,{ username:0,email:0,password:0})

        user.userImage = `http://localhost:5000/uploads/${user.userImage}`
        if(user){
            return res.status(201).json({user})
        }
        res.status(404).send('Not found')
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})
router.post('/details/post',authMiddleware,async (req,res) => {
    try{
        if(!req.body.detail){
            return res.status(400).json( {
                message:'Bad details'
            })
        }
        await User.findOneAndUpdate({_id:req.user.userId},{...req.body.detail})
        res.status(201).json({
            message:'Change is completed'
        })
    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})
router.get('/follow/get',authMiddleware,async (req,res) => {
    try{

        const user = await User.findById({_id:req.user.userId},{following:1})
        res.status(201).json([...user.following])

    }
        // ,{userImage:req.file.path} ,upload.single('userImage')
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})
router.post('/follow',authMiddleware,async (req,res) => {
    try{
        const {id} = req.body
        if(!id || id === req.user.userId) {
            return res.status(400).json({
                message: 'Помилка'
            })
        }
        const user = await User.findById(req.user.userId)
        if(!user.following.includes(id)){
            user.following = [...user.following,id]
            await user.save()
            return res.status(201).json([...user.following,id])
        }
        return res.status(400).json({
            message: 'Помилка'
        })
        // const user = await User.findOneAndUpdate({_id:req.user.userId},{$push:{following : id }})

    }
        // ,{userImage:req.file.path} ,upload.single('userImage')
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})
router.post('/unfollow',authMiddleware,async (req,res) => {
    try{
        const {id} = req.body
        if(!id || id === req.user.userId) {
            return res.status(400).json({
                message: 'Помилка'
            })
        }
        const user = await User.findById(req.user.userId)
        if(user.following.includes(id)){
            user.following = user.following.splice(id,1)
            await user.save()
            return res.status(201).json([...user.following,id])
        }
        return res.status(400).json({
            message: 'Помилка'
        })

    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})

router.post('/image/post',[authMiddleware,upload.single('file')],async (req,res) => {
    try{
        const user = await User.findById(req.user.userId)
        user.userImage = req.file.filename
        await user.save()
        const obj = {
            avatar:`http://localhost:5000/uploads/${user.userImage}`
        }
        return res.status(201).json(obj)
    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})


module.exports = router