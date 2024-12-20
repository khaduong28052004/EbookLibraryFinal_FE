export default function ThinLove({ isFavorite,createFavorite }) {
  return (
    <svg
      onClick={() => createFavorite()}
      className={isFavorite ? "fill-red-500" : "fill-none"}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"
        stroke="black"
        strokeWidth="1"
        strokeMiterlimit="30"
        strokeLinecap="square"
      />
    </svg>
  );
}
