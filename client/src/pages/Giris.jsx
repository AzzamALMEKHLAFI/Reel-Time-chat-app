import React, { useRef, useState } from "react";
import socket from "socket.io-client";
import { useDispatch } from "react-redux";
import { sayfaGuncelle, soketGuncelle } from "../mahzen/durumlarSlice";
import { useIslemler } from "../hooks/useSoket";

const Giris = () => {
  const sevkEt = useDispatch();
  const { kullaniciTeyitEt } = useIslemler();
  const isimRef = useRef();
  const [isimVar, setIsimVar] = useState(false);

  const io = socket("http://10.87.29.239:3000/giris");

  io.on("girisTamam", (cevap) => {
    if (cevap.durum && cevap.imza) {
      sevkEt(soketGuncelle());
      kullaniciTeyitEt({ kullanici: cevap.kullaniciAdi, imza: cevap.imza });
      sevkEt(sayfaGuncelle("ana"));
    } else {
      setIsimVar(true);
    }
  });

  const giris = () => {
    if (isimRef.current.value) {
      io.emit("girisYap", isimRef.current.value);
    }
  };

  return (
    <div className="giris">
      {isimVar && (
        <p>
          Seçtiğiniz isim başkası tarafından halihazırda kullanılıyor, başka
          isim deneyin
        </p>
      )}
      <input ref={isimRef} type="text" placeholder="Bir kullanıcı adı seçin" />
      <button type="button" onClick={giris}>
        Aramıza Katıl
      </button>
    </div>
  );
};

export default Giris;
