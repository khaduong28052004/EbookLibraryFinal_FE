import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const ImageWithLoader = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  return (

    <>
      {!loaded && (
        <div className="flex items-center justify-center mt-12">
          <ClipLoader size={50} color={"#3498db"} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "" : "hidden"}`}
        onLoad={() => setLoaded(true)} // Cập nhật trạng thái khi ảnh tải xong
        onError={() => console.error("Failed to load image:", src)} // Log lỗi nếu có
      />
    </>

  );
};

export default ImageWithLoader;