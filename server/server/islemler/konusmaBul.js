module.exports = (map, arananDeger) => {
  for (const [anahtar, deger] of map.entries()) {
    if (deger.isim === arananDeger) {
      return anahtar;
    }
  }

  return undefined;
};
