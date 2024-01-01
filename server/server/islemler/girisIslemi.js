const jws = require("jws");

const girisIslemi = (socket, kabulListesi) => {
  socket.on("girisYap", (kullaniciAdi) => {
    let cevap = { durum: false };
    if (!Array.from(kabulListesi.values()).includes(kullaniciAdi)) {
      const imza = jws.sign({
        header: { alg: "HS256" },
        payload: kullaniciAdi + Date.now(),
        secret: "filistin",
      });
      cevap = { durum: true, imza, kullaniciAdi };
      kabulListesi.set(imza, kullaniciAdi);
    }
    socket.emit("girisTamam", cevap);
  });
};

module.exports = girisIslemi;
