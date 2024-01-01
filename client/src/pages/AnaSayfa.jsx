import React from "react";
import Mektuplasma from "./Mektuplasma";
import Giris from "./Giris";
import useSoket from "../hooks/useSoket";
import { useSelector } from "react-redux";

const AnaSyafa = () => {
  const { sayfa } = useSelector((state) => state.durumlar);
  useSoket();

  return (
    <>
      {sayfa === "giris" && <Giris />}
      {sayfa === "ana" && <Mektuplasma />}
    </>
  );
};

export default AnaSyafa;
