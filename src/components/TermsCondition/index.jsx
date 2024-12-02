import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function TermsCondition() {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="terms-condition-page w-full bg-white pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "Terms and condition", path: "/terms-conditions" },
            ]}
            title="Điều khoản sử dụng"
          />
        </div>
        <div className="w-full">
        <div className="container-x mx-auto">
  <div className="content-item w-full mb-10">
    <h2 className="text-[18px] font-medium text-qblack mb-5">
      ĐIỀU KHOẢN SỬ DỤNG
    </h2>
    <h3 className="text-[16px] font-medium text-qblack mb-5">
      1. Quyền được phép sử dụng
    </h3>
    <p className="text-[15px] text-qgraytwo leading-7">
      Quyền được phép sử dụng Trang TOEL và Dịch Vụ có hiệu lực cho đến khi bị chấm dứt. Quyền được phép sử dụng sẽ bị chấm dứt theo Điều Khoản Dịch Vụ này hoặc trong trường hợp Người Sử Dụng vi phạm bất cứ điều khoản nào được quy định tại Điều Khoản Dịch Vụ này. Trong trường hợp đó, TOEL có thể chấm dứt quyền sử dụng của Người Sử Dụng bằng cách thông báo hoặc không cần thông báo trước cho Người Sử Dụng.
    </p>

    <h3 className="text-[16px] font-medium text-qblack mb-5">
      2. Người Sử Dụng không được phép
    </h3>
    <ul className="list-disc ml-5">
      <li className="text-[15px] text-qgraytwo leading-7">
        Tải lên, đăng, truyền tải hoặc công khai bất cứ Nội Dung nào trái pháp luật, có hại, đe dọa, lạm dụng, quấy rối, gây hoang mang, xuyên tạc, phỉ báng, xúc phạm, khiêu dâm, bôi nhọ, xâm phạm quyền riêng tư của người khác, hoặc nội dung phân biệt chủng tộc, dân tộc hoặc không đúng đắn;
      </li>
      <li className="text-[15px] text-qgraytwo leading-7">
        Vi phạm pháp luật, quyền lợi của bên thứ ba hoặc Chính Sách Cấm/Hạn Chế Sản Phẩm của TOEL;
      </li>
      <li className="text-[15px] text-qgraytwo leading-7">
        Đăng tải, truyền tin, hoặc hiển thị bất kỳ Nội Dung nào có sự xuất hiện của người chưa thành niên hoặc sử dụng Dịch Vụ gây tổn hại cho người chưa thành niên dưới bất kỳ hình thức nào;
      </li>
      <li className="text-[15px] text-qgraytwo leading-7">
        Sử dụng Dịch Vụ hoặc đăng tải Nội Dung để mạo danh bất kỳ cá nhân hoặc tổ chức nào, hoặc xuyên tạc thông tin của cá nhân hoặc tổ chức;
      </li>
      <li className="text-[15px] text-qgraytwo leading-7">
        Giả mạo các tiêu đề hoặc che giấu nguồn gốc của bất kỳ Nội Dung nào được truyền tải thông qua Dịch Vụ;
      </li>
      {/* Thêm các mục còn lại ở đây */}
    </ul>

    <h3 className="text-[16px] font-medium text-qblack mb-5">
      3. Trách nhiệm đối với Nội Dung
    </h3>
    <p className="text-[15px] text-qgraytwo leading-7">
      Người Sử Dụng hiểu rằng mọi Nội Dung, dù được đăng công khai hay truyền tải riêng tư, hoàn toàn thuộc trách nhiệm của người tạo ra Nội Dung đó. Điều này có nghĩa là bạn, không phải TOEL, sẽ chịu trách nhiệm đối với những Nội Dung bạn tải lên, đăng, gửi email, hoặc công khai trên Trang TOEL. TOEL không chịu trách nhiệm đối với những nội dung này, bao gồm các lỗi hoặc thiếu sót, hoặc tổn thất, thiệt hại phát sinh từ việc sử dụng Nội Dung.
    </p>

    <h3 className="text-[16px] font-medium text-qblack mb-5">
      4. Quyền của TOEL đối với Nội Dung
    </h3>
    <p className="text-[15px] text-qgraytwo leading-7">
      TOEL có quyền sàng lọc, từ chối, xóa, dừng, tạm ngừng hoặc gỡ bỏ bất kỳ Nội Dung nào vi phạm Điều Khoản Dịch Vụ hoặc các yêu cầu pháp lý. TOEL có thể gỡ bỏ các nội dung vi phạm bản quyền, quyền sở hữu trí tuệ hoặc khi nhận được khiếu nại hợp pháp.
    </p>

    <h3 className="text-[16px] font-medium text-qblack mb-5">
      5. Tiết lộ thông tin
    </h3>
    <p className="text-[15px] text-qgraytwo leading-7">
      Người Sử Dụng đồng ý rằng TOEL có thể truy cập và tiết lộ thông tin tài khoản, Nội Dung và các thông tin khác của Người Sử Dụng khi có yêu cầu của pháp luật hoặc cơ quan nhà nước có thẩm quyền, hoặc khi cần thiết để bảo vệ quyền lợi của TOEL và Người Sử Dụng.
    </p>
  </div>
</div>

        </div>
      </div>
    </Layout>
  );
}
