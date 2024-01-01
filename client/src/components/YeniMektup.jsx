import { useRef } from "react";

const YeniMektup = ({ gonder }) => {
  const mektupRef = useRef();
  return (
    <div className="yeni-mektup">
      <textarea
        ref={mektupRef}
        type="text"
        placeholder="Yaz faydalı bir şeyler..."
        rows="1"
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            // Prevent the default behavior (e.g., newline in textarea)
            event.preventDefault();

            // Call the gonder function with the current textarea value
            gonder(mektupRef.current.value);

            // Clear the textarea
            mektupRef.current.value = "";
          }
        }}
      ></textarea>
      <button
        type="button"
        onClick={() => {
          gonder(mektupRef.current.value);
          mektupRef.current.value = "";
        }}
      >
        <i className="simge-ekle"></i>
      </button>
    </div>
  );
};

export default YeniMektup;
