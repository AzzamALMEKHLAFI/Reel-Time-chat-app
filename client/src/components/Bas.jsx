import { useDispatch, useSelector } from "react-redux";
import { altBilesenGuncelle } from "../mahzen/durumlarSlice";

const Bas = () => {
  const sevkEt = useDispatch();
  const { altBilesen } = useSelector((state) => state.durumlar);
  return (
    <div className="bas">
      <button
        type="button"
        className={`sol${altBilesen == "kn" ? " aktif" : ""}`}
        onClick={() => sevkEt(altBilesenGuncelle("kn"))}
      >
        <i className="simge-konusmalar"></i> Konuşmalar
      </button>
      <button
        type="button"
        className={`sag${altBilesen == "kl" ? " aktif" : ""}`}
        onClick={() => sevkEt(altBilesenGuncelle("kl"))}
      >
        <i className="simge-kullanicilar"></i> Hâzırûn
      </button>
    </div>
  );
};

export default Bas;
