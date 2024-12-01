
// import React, { useState, memo } from "react";
// import { toast } from "react-toastify";
// import { FaFacebook, FaTwitter, FaLink } from "react-icons/fa";
// import Compair from "../icons/Compair";


// const ShareModal = memo(function ShareModal({ datas = { id: "" } }) {
//     const [isOpen, setIsOpen] = useState(false);

//     const productUrl = `${window.location.origin}/productdetail?idProduct=${datas.id}`;

//     const handleCopyLink = () => {
//         navigator.clipboard.writeText(productUrl)
//             .then(() => toast.success("Liên kết đã được sao chép!"))
//             .catch(() => toast.error("Không thể sao chép liên kết."));
//     };

//     const handleShare = (platform) => {
//         switch (platform) {
//             case "facebook":
//                 window.open(`https://www.facebook.com/sharer/sharer.php?u=${productUrl}`, "_blank");
//                 break;
//             case "twitter":
//                 window.open(`https://twitter.com/intent/tweet?url=${productUrl}&text=${encodeURIComponent(`Check out this product: ${datas.name}`)}`, "_blank");
//                 break;
//             default:
//                 handleCopyLink();
//         }
//     };


//     return (
//         <>
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-10 h-10 flex justify-center items-center bg-primarygray rounded"
//             >
//                 {/* <span>📤</span> Thay thế bằng một icon chia sẻ */}
//                 <Compair />

//             </button>

//             {isOpen && (
//                 <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg relative">
//                         <button
//                             onClick={() => setIsOpen(false)}
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//                         >
//                             ✖
//                         </button>
//                         <h3 className="text-lg font-bold mb-4">Chia sẻ sản phẩm này</h3>
//                         <div className="flex justify-around">
//                             <button
//                                 onClick={() => handleShare("facebook")}
//                                 className="flex items-center space-x-2 p-2 bg-blue-600 text-white rounded-lg"
//                             >
//                                 <FaFacebook />
//                                 <span>Facebook</span>
//                             </button>
//                             <button
//                                 onClick={() => handleShare("twitter")}
//                                 className="flex items-center space-x-2 p-2 bg-sky-400 text-white rounded-lg"
//                             >
//                                 <FaTwitter />
//                                 <span>Twitter</span>
//                             </button>
//                             <button
//                                 onClick={handleCopyLink}
//                                 className="flex items-center space-x-2 p-2 bg-gray-600 text-white rounded-lg"
//                             >
//                                 <FaLink />
//                                 <span>Sao chép liên kết</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// })

// export default ShareModal;
