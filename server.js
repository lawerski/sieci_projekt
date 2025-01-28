
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'public/uploads')); 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); 
    },
  });
  
  const upload = multer({ storage });

io.on('connection', (socket) => {
  console.log('Nowy klient połączony');

 
  socket.on('requestFile', (fileName) => {
    const filePath = path.join(__dirname, 'public', fileName);


    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Błąd podczas odczytu pliku: ${err.message}`);
        socket.emit('fileResponse', {
          success: false,
          message: 'Plik nie istnieje lub wystąpił błąd podczas jego odczytu.',
        });
      } else {
        socket.emit('fileResponse', {
          success: true,
          content: data,
        });
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Klient rozłączony');
  });
});


app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Nie przesłano pliku.' });
  }
  res.json({
    success: true,
    message: 'Plik przesłany pomyślnie!',
    fileName: req.file.originalname,
    path: `/uploads/${req.file.filename}`,
  });
});


app.get('/files', (req, res) => {
  const directoryPath = path.join(__dirname, 'public');


  const getFilesRecursively = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFilesRecursively(filePath));
      } else {
        results.push(path.relative(directoryPath, filePath)); 
      }
    });
    return results;
  };

  try {
    const files = getFilesRecursively(directoryPath);
    res.json({ success: true, files });
  } catch (err) {
    console.error('Błąd podczas pobierania listy plików:', err);
    res.status(500).json({ success: false, message: 'Błąd podczas pobierania listy plików.' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
