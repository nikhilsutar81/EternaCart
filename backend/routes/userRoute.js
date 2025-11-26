import express from 'express'
import { loginUser, registerUser, adminLogin, getProfile, updateProfile } from '../controllers/userController.js'
import { uploadFile } from '../controllers/uploadController.js'
import authUser from '../middleware/auth.js'
import multer from 'multer'
import path from 'path'
import os from 'os'

const userRouter = express.Router();

// Setup multer for file uploads
const upload = multer({ dest: path.join(os.tmpdir(), 'uploads/') });

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

userRouter.post('/profile', authUser, getProfile)
userRouter.post('/profile/update', authUser, updateProfile)
userRouter.post('/upload', authUser, upload.single('file'), uploadFile)

export default userRouter;