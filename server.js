const express = require('express');
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

// Set up multer with the custom storage
const upload = multer({ storage: storage });

const app = express();

app.post('/api/upload', upload.single('avatar'), (req, res, next) => {
    try {
        
        console.log(req.file);
        res.send('uploaded successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error uploading file');
    }
});

app.listen(8080, () => {
    console.log('Server is started');
});
