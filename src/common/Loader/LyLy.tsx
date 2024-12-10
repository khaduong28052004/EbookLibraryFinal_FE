import React, { useState, useEffect } from 'react';

interface PopupProps {
  onClose: () => void;
}

const ChristmasSalePopup: React.FC<PopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Hiện popup sau 1 giây

    return () => clearTimeout(timer); // Dọn dẹp timeout
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 47, 75, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.5s ease-in-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '20px', 
          textAlign: 'center',
          width: '400px',
          height:'500px',
          maxWidth: '90%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          animation: 'scaleIn 0.5s ease-in-out',
          backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/z6108445773611_e17e8240e8b2b7c28c644b300ff1cc9f.jpg?alt=media&)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onClick={(e) => e.stopPropagation()} // Ngăn click bên trong đóng popup
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            fontSize: '30px',
            cursor: 'pointer',
            color: '#d32f2f',
            transition: 'color 0.3s ease',
          }}
        >
          &times;
        </button>

      
      </div>
    </div>
  );
};

export default ChristmasSalePopup;