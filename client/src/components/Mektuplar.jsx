import React, { useLayoutEffect, useRef } from "react";
import YeniMektup from "./YeniMektup";
import Mektup from "./Mektup";
import { useIslemler } from "../hooks/useSoket";
import { useSelector } from "react-redux";
// import moment from "moment/moment";

const Mektuplar = () => {
  const { mektupGonder, hijriTarih } = useIslemler();
  const { kullanicilar, mektuplar } = useSelector((state) => state.konusmalar);
  const { kullanici, oturum } = useSelector((state) => state.durumlar);
  const divRef = useRef(null);

  useLayoutEffect(() => {
    const div = divRef.current;
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [mektuplar]);

  const gonder = (mektup) => {
    if (mektup) {
      if (oturum.sira != null) {
        mektupGonder({
          alici: oturum.sira,
          gonderici: kullanici.sira,
          muhteva: mektup,
          tarih: Date.now(),
        });
      }
    }
  };

  const ilgiliMektuplar =
    oturum.sira == null
      ? []
      : mektuplar.has(oturum.sira)
      ? mektuplar.get(oturum.sira)
      : [];

  let id = 0;
  return (
    <>
      <div className="konusma-bas">{oturum.isim}</div>
      <div className="mektuplar" ref={divRef}>
        {ilgiliMektuplar.map((mektup) => {
          const kendi = mektup.gonderici == kullanici.sira;
          return (
            <Mektup
              key={id++}
              gonderici={
                !kendi ? kullanicilar.get(mektup.gonderici).isim : "Sen"
              }
              muhteva={mektup.muhteva}
              tarih={hijriTarih(mektup.tarih)}
              kendi={kendi}
            />
          );
        })}
      </div>
      <YeniMektup gonder={gonder} />
    </>
  );
};

export default Mektuplar;
