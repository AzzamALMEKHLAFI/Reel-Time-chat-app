const Bilesen = ({ children, dahil, adi, islem }) => {
  return (
    <div className={`bilesen${dahil ? ` dahil` : ``}`}>
      <button type="button" onClick={islem}>
        {adi}
      </button>
      {children}
    </div>
  );
};

export default Bilesen;
