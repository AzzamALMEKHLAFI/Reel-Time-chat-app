import { useRef } from "react";
import { useIslemler } from "../hooks/useSoket";

const Ekleme = () => {
  const { konusmayaGir } = useIslemler();
  const inpRef = useRef();
  const eklemeIslemi = (isim) => {
    konusmayaGir(isim);
  };
  return (
    <div className="ekleme">
      <input
        ref={inpRef}
        type="text"
        placeholder="Kurmak istediğiniz konuşmanın ismini giriniz"
      />
      <button
        type="button"
        onClick={() => {
          eklemeIslemi(inpRef.current.value);
          inpRef.current.value = "";
        }}
      >
        <i className="simge-ekle"></i>
      </button>
    </div>
  );
};

export default Ekleme;
