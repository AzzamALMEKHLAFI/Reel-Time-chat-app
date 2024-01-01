const konusmaBul = require("./konusmaBul");

const kullaniciIslemleri = (socket, konusmalar, kullanicilar, kabulListesi) => {
  socket.emit("baglandi");
  socket.on("imza", (imza) => {
    if (kabulListesi.has(imza)) {
      const kullaniciAdi = kabulListesi.get(imza);

      socket.emit(
        "kullanicilar",
        Array.from(kullanicilar.entries(), ([anahtar, deger]) => {
          return [
            anahtar,
            {
              sira: anahtar,
              isim: deger.kullaniciAdi,
              sonGuncelleme: Date.now(),
              eklendiMi: false,
            },
          ];
        })
      );

      kullanicilar.set(socket.id, { kullaniciAdi, soket: socket });

      socket.emit(
        "konusmalar",
        Array.from(konusmalar.entries(), ([anahtar, deger]) => {
          return [
            anahtar,
            {
              sira: anahtar,
              isim: deger.isim,
              acilmaTarihi: Date.now(),
              sonGuncelleme: Date.now(),
              uye: false,
            },
          ];
        })
      );

      socket.broadcast.emit("kullaniciGirdi", {
        sira: socket.id,
        isim: kullaniciAdi,
        sonGuncelleme: Date.now(),
        eklendiMi: false,
      });

      ///----------------------------------------------

      socket.on("konusmaOlustur", (konusma) => {
        const sira = konusmalar.size + 1;
        const yeniKonusma = {
          sira: sira,
          isim: konusma,
          acilmaTarihi: Date.now(),
          sonGuncelleme: Date.now(),
          uyeler: new Map([[socket.id, socket]]),
        };
        socket.emit("konusmanHazir", yeniKonusma);
        socket.broadcast.emit("yeniKonusma", yeniKonusma);

        const ilgiliKonusma = konusmaBul(konusmalar, konusma);

        if (ilgiliKonusma === undefined) {
          konusmalar.set(sira, yeniKonusma);
        } else {
          ilgiliKonusma.uyeler.set(socket.id, socket);
        }
      });

      socket.on("konusmayaGir", (konusma) => {
        if (konusmalar.has(konusma)) {
          konusmalar.get(konusma).uyeler.set(socket.id, socket);
        }
      });

      socket.on("konusmadanAyril", (sira) => {
        konusmalar.get(sira).uyeler.delete(socket.id);
      });

      socket.on("mektup", (mektup) => {
        const ilgiliAlici = mektup.alici;
        const duzenliMektup = {
          gonderici: mektup.gonderici,
          muhteva: mektup.muhteva,
          tarih: mektup.tarih,
          konusma: false,
        };

        if (kullanicilar.has(ilgiliAlici)) {
          const aliciSocket = kullanicilar.get(ilgiliAlici).soket;
          if (aliciSocket) {
            console.log(mektup);
            aliciSocket.emit("mektup", duzenliMektup);
          }
        } else if (konusmalar.has(ilgiliAlici)) {
          const konusma = konusmalar.get(ilgiliAlici);

          if (konusma) {
            console.log("Alooo 2");
            Array.from(konusma.uyeler.values()).forEach((uye) => {
              duzenliMektup.konusma = ilgiliAlici;
              if (mektup.gonderici !== uye.id) {
                console.log(mektup);
                uye.emit("mektup", duzenliMektup);
              }
            });
          }
        }
      });

      // Handle disconnect
      socket.on("disconnect", () => {
        kullanicilar.delete(socket.id);
        kabulListesi.delete(imza);
        socket.broadcast.emit("kullaniciGitti", socket.id);
      });
    } else {
      socket.disconnect(true);
    }
  });
};

module.exports = kullaniciIslemleri;
