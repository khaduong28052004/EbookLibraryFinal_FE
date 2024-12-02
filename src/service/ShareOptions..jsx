export default function ShareOptions() {
    const currentUrl = encodeURIComponent(window.location.href);
  
    const handleShare = () => {
      if (navigator.share) {
        navigator.share({
          title: 'Tiêu đề nội dung',
          text: 'Mô tả ngắn',
          url: window.location.href,
        })
          .then(() => console.log('Chia sẻ thành công!'))
          .catch((error) => console.error('Lỗi chia sẻ:', error));
      } else {
        alert('Trình duyệt không hỗ trợ Web Share API.');
      }
    };
  
    const handleCopy = () => {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Đã sao chép liên kết!'))
        .catch((error) => console.error('Lỗi khi sao chép:', error));
    };
  
    return (
      <div className="flex flex-col gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleShare}
        >
          Chia sẻ
        </button>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Chia sẻ Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Chia sẻ Twitter
        </a>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleCopy}
        >
          Sao chép liên kết
        </button>
      </div>
    );
  }
  