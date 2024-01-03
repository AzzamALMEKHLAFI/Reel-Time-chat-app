import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
// import "moment-hijri";
import {
  konusmaEkle,
  konusmayaGirme,
  konusmadanAyril,
  konusmalarAta,
  kullaniciEkle,
  kullanicilarAta,
  mektupEkle,
  mektupOlustur,
  kullaniciSilAsync,
} from "../mahzen/konusmalarSlice";
import {
  kullaniciGuncelle,
  oturumGuncelleAsync,
  altBilesenGuncelleAsync,
} from "../mahzen/durumlarSlice";

const useSoket = () => {
  const { soket, kullanici, oturum } = useSelector((state) => state.durumlar);
  const sevkEt = useDispatch();

  useEffect(() => {
    const handleKullaniciGitti = async (kullaniciSira) => {
      if (oturum.sira === kullaniciSira) {
        await sevkEt(altBilesenGuncelleAsync("kl"));
        await sevkEt(
          oturumGuncelleAsync({ sira: "", isim: "", konusma: false })
        );
        await sevkEt(kullaniciSilAsync(kullaniciSira));
      } else {
        await sevkEt(kullaniciSilAsync(kullaniciSira));
      }
    };

    if (soket) {
      soket.on("baglandi", () => {
        soket.emit("imza", kullanici.sira);
        sevkEt(kullaniciGuncelle({ sira: soket.id }));
      });

      soket.on("konusmalar", (konusmaListesi) => {
        sevkEt(konusmalarAta(new Map(konusmaListesi)));
      });

      soket.on("kullanicilar", (kullanicilarListesi) => {
        sevkEt(kullanicilarAta(new Map(kullanicilarListesi)));
      });

      soket.on("yeniKonusma", (konusma) => {
        delete konusma.uyeler;
        sevkEt(konusmaEkle({ ...konusma, uye: false }));
      });

      soket.on("konusmanHazir", (konusma) => {
        delete konusma.uyeler;
        sevkEt(konusmaEkle({ ...konusma, uye: true }));
      });

      soket.on("konusmaBitti", (konusma) => {});

      soket.on("kullaniciGirdi", (kullanici) => {
        sevkEt(kullaniciEkle(kullanici));
      });

      soket.on("mektup", ({ gonderici, muhteva, tarih, konusma }) => {
        console.log("Soketten");
        sevkEt(mektupEkle({ gonderici, muhteva, tarih, konusma }));
      });

      soket.on("kullaniciGitti", handleKullaniciGitti);

      return () => {
        soket.off("baglandi");
        soket.off("konusmalar");
        soket.off("kullanicilar");
        soket.off("yeniKonusma");
        soket.off("konusmanHazir");
        soket.off("konusmaBitti");
        soket.off("kullaniciGirdi");
        soket.off("mektup");
        soket.off("kullaniciGitti", handleKullaniciGitti);
      };
    }
  }, [soket, oturum]);
};

const useIslemler = () => {
  const { soket } = useSelector((state) => state.durumlar);
  const sevkEt = useDispatch();

  const konusmayaGir = (konusma, yeni = true) => {
    if (yeni) {
      soket.emit("konusmaOlustur", konusma);
    } else {
      soket.emit("konusmayaGir", konusma);
      sevkEt(konusmayaGirme(konusma));
    }
  };

  const konusmadanAyrilma = (sira) => {
    soket.emit("konusmadanAyril", sira);
    sevkEt(konusmadanAyril(sira));
  };

  const mektupGonder = (mektup) => {
    console.log("Olustrudan");
    sevkEt(mektupOlustur(mektup));
    soket.emit("mektup", mektup);
  };

  const kullaniciTeyitEt = ({ kullanici, imza }) => {
    sevkEt(kullaniciGuncelle({ sira: imza, kullanici }));
  };

  const hijriTarih = (milliSaniye) => {
    return moment(milliSaniye).format("HH:mm");
  };

  return {
    mektupGonder,
    konusmayaGir,
    konusmadanAyrilma,
    kullaniciTeyitEt,
    hijriTarih,
  };
};

export { useIslemler };

export default useSoket;
