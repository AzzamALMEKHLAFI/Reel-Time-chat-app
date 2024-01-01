import React, { useState, useEffect } from "react";
import Konusmalar from "../components/Konusmalar";
import Kullanicilar from "../components/Kullanicilar";
import Mektuplar from "../components/Mektuplar";
import Bas from "../components/Bas";
import { useSelector } from "react-redux";

const Mektuplasma = () => {
  const { altBilesen } = useSelector((state) => state.durumlar);

  return (
    <>
      <Bas />
      {altBilesen === "kn" && <Konusmalar />}
      {altBilesen === "kl" && <Kullanicilar />}
      {altBilesen === "mk" && <Mektuplar />}
    </>
  );
};

export default Mektuplasma;
