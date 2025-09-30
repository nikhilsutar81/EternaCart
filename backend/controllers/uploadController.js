import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

const uploadFile = async (req, res) => {
    try {
        if (!req.file) return res.json({ success: false, message: 'No file uploaded' });
    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'eternacart' });
    // remove temp file
    try { fs.unlinkSync(req.file.path) } catch(e){}
    res.json({ success: true, url: result.secure_url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { uploadFile };
