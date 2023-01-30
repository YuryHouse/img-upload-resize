import express from "express";
import path from "path";

const router = express.Router();
const upload = require('./uploadMiddleware');
const Resize = require('./Resize');

router.get('/', async function (req: any, res: { render: (arg0: string) => any; }) {
    await res.render('index');
});

router.post('/post', upload.single('image'), async function (req: any, res: any) {
    const imagePath = path.join(__dirname, 'public/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    const staticPath = 'http://localhost:8000/static/images/';
    const imgHostPath = staticPath + filename
    return res.status(200).json({ name: filename, path: imgHostPath });
});

module.exports = router;