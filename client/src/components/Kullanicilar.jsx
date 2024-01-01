import Bilesen from "./Bilesen";
import Bilesenler from "./Bilesenler";
import { oturumGuncelle, altBilesenGuncelle } from "../mahzen/durumlarSlice";
import { useDispatch, useSelector } from "react-redux";

const Kullanicilar = () => {
  const sevkEt = useDispatch();
  const { kullanicilar } = useSelector((state) => state.konusmalar);

  const konusmayaGir = (sira, isim) => {
    sevkEt(oturumGuncelle({ sira, isim, konusma: false }));
    sevkEt(altBilesenGuncelle("mk"));
  };

  let id = 0;
  return (
    <Bilesenler>
      {Array.from(kullanicilar.values()).length > 0 &&
        Array.from(kullanicilar.values()).map(({ sira, isim, eklendiMi }) => {
          return (
            <Bilesen
              key={id++}
              adi={isim}
              dahil={eklendiMi}
              islem={() => konusmayaGir(sira, isim)}
            ></Bilesen>
          );
        })}
    </Bilesenler>
  );
};

export default Kullanicilar;
