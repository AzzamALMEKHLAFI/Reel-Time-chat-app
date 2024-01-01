import React from "react";
import Ekleme from "./Ekleme";
import Bilesenler from "./Bilesenler";
import Bilesen from "./Bilesen";
import { useDispatch, useSelector } from "react-redux";
import { oturumGuncelle, altBilesenGuncelle } from "../mahzen/durumlarSlice";
import { useIslemler } from "../hooks/useSoket";

const Konusmalar = () => {
  const sevkEt = useDispatch();
  const { konusmayaGir, konusmadanAyrilma } = useIslemler();
  const { konusmalar } = useSelector((state) => state.konusmalar);

  const konusmaAc = (sira, isim) => {
    sevkEt(oturumGuncelle({ sira, isim, konusma: true }));
    sevkEt(altBilesenGuncelle("mk"));
  };
  const cikmaIslemi = (sira) => {
    konusmadanAyrilma(sira);
  };
  const girisIslemi = (sira) => {
    konusmayaGir(sira, false);
  };

  let id = 0;
  return (
    <>
      <Ekleme />
      <Bilesenler>
        {Array.from(konusmalar.values()).map(({ sira, isim, uye }) => {
          return (
            <Bilesen
              dahil={uye}
              key={id++}
              adi={isim}
              islem={() => (uye ? konusmaAc(sira, isim) : "")}
            >
              <button
                type="button"
                onClick={() => {
                  uye ? cikmaIslemi(sira) : girisIslemi(sira);
                }}
              >
                <i className={`simge-${uye ? `cikis` : `giris`}`}></i>
              </button>
            </Bilesen>
          );
        })}
      </Bilesenler>
    </>
  );
};

export default Konusmalar;
