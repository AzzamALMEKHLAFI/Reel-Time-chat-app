const { Server } = require("socket.io");
const girisIslemi = require("./islemler/girisIslemi");
const kullaniciIslemleri = require("./islemler/kullaniciIslemleri");

const io = new Server(null, {
  cors: {
    origin: [
      "http://10.87.25.127:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://localhost",
    ],
    method: ["GET","POST"],
  },
});

const girisKanali = io.of("/giris");
const mektupKanali = io.of("/mektup");

const konusmalar = new Map();
const kullanicilar = new Map();
const kabulListesi = new Map();

girisKanali.on("connection", (socket) => {
  girisIslemi(socket, kabulListesi);
});

mektupKanali.on("connection", (socket) => {
  kullaniciIslemleri(socket, konusmalar, kullanicilar, kabulListesi);
});

io.listen(3000);
