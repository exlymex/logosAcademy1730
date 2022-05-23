const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../modules/User')
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router()

// /api /auth /register
router.post(
    '/register',
    [
        check('email', 'Некоректний email').isEmail(),
        check('password', 'Мінімальна довжина - 6 символів')
            .isLength({ min: 6 }),
        check('username', 'Мінімальна довжина - 2 букви')
            .isLength({ min: 2 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоретні данні при реєстрації'
                })
            }

            const { email, password, username } = req.body

            const candidate = await User.findOne({ email })
            const checkUsername = await User.findOne({username: username.toLowerCase()})

            if(checkUsername){
                return res.status(400).json({ message : 'Цей нік вже зайнятий'})
            }
            if (candidate) {
                return res.status(400).json({ message: 'Такий користувач вже є' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email:email.toLowerCase(),
                password: hashedPassword,
                username: username.toLowerCase() })

            await user.save()
            res.status(201).json({ message: 'Користувач створений' })
        } catch (e) {
            res.status(500).json({ message: 'Mistake is here' })
        }
    })
// /api/auth/login
router.post('/login',
    [
        check('email','Введіть коректний email').normalizeEmail().isEmail(),
        check('password', 'Введіть пароль').exists()
    ],      
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоретні данні при вході в систему'
                })
            }
            const {email,password} = req.body

            const user = await User.findOne({email:email.toLowerCase()})


            if(!user){
                return res.status(400).json({message : 'Користувача не найдено'})   
            }
        
            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch) {
                return res.status(400).json({message: 'Невірний пароль,попробуйте знову'})
            }

            const token = jwt.sign(
                {userId : user.id },
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({
                message: true ,
                username: user.username,
                email: user.email,
                token,
                userID : user.id})

        } catch (e) {
            res.status(500).json({ message: 'Mistake is here' })
        }
    })
router.post('/check',
    authMiddleware, (req, res) => {
        res.status(204).send()
    })

module.exports = router