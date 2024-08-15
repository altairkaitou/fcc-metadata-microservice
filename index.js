var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
const path = require('path');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({dest: 'upload/'});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const {originalname, size} = req.file;
  const fileExtension = path.extname(originalname).toLowerCase();
  let mimetype = req.file.mimetype;

  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
