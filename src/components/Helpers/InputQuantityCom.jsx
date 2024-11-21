import { useEffect, useState } from "react";

export default function InputQuantityCom({ quantityCart, handleQuantity, idFavorite, idCart, handleQuantityCart }) {
  const [quantity, setQuantity] = useState(quantityCart);
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  useEffect(() => {
    handleQuantity(idFavorite, quantity);
    if (idCart > 0) {
      handleQuantityCart(quantity, idCart)
    }
  }, [quantity])
  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={decrement}
          type="button"
          className="text-base text-qgray"
        >
          -
        </button>
        <span className="text-qblack">{quantity}</span>
        <button
          onClick={increment}
          type="button"
          className="text-base text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
