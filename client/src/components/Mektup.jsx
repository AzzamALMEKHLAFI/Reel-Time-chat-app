const Mektup = ({ gonderici, muhteva, tarih, kendi }) => {
  return (
    <div className={`mektup${kendi ? ` kendi` : ``}`}>
      <p>
        <b>{gonderici}:</b> {muhteva}
      </p>
    </div>
  );
};

export default Mektup;
