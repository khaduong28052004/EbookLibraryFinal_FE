import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import Thumbnail from "./Thumbnail";

export default function TrackingOrder() {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="tracking-page-wrapper w-full">
        <div className="page-title mb-[40px]">
          <PageTitle
            title="Chính sách đổi trả"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "Track Order", path: "/tracking-order" },
            ]}
          />
        </div>
        <div className="w-full py-[60px]">
  <div className="container-x mx-auto">
    <div className="w-full">
      <div className="grid md:grid-cols-1 grid-cols-1 lg:gap-[30px] gap-5">
        <div className="w-full" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-qblack mb-5">
            Chính sách đổi trả tại TOEL
          </h2>
          <p className="text-[16px] text-qgray mb-5">
            TOEL cam kết mang đến cho bạn trải nghiệm mua sắm tốt nhất. Dưới đây là các điều kiện và chính sách đổi trả sản phẩm:
          </p>
          
          <h3 className="text-xl font-medium text-qblack mb-4">1. Điều kiện áp dụng đổi trả</h3>
          <ul className="list-disc pl-6 space-y-4">
            <li className="text-[15px] text-qgraytwo leading-7">
              Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng và có đầy đủ hóa đơn mua hàng.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              Thời gian yêu cầu đổi trả không quá 7 ngày kể từ ngày nhận hàng đối với sản phẩm không lỗi và 14 ngày đối với sản phẩm bị lỗi do nhà sản xuất.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              Sản phẩm phải được đóng gói nguyên vẹn như khi nhận hàng, không bị rách hoặc mất mác các bộ phận đi kèm.
            </li>
          </ul>

          <h3 className="text-xl font-medium text-qblack mb-4 mt-6">2. Quy trình đổi trả</h3>
          <ol className="list-decimal pl-6 space-y-4">
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 1:</strong> Liên hệ với chúng tôi qua toelebook@gmail.com hoặc số điện thoại hỗ trợ để yêu cầu đổi trả sản phẩm.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 2:</strong> Cung cấp thông tin về đơn hàng và sản phẩm cần đổi trả cho bộ phận hỗ trợ khách hàng.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 3:</strong> Sau khi xác nhận, bạn sẽ nhận được hướng dẫn gửi trả sản phẩm và chúng tôi sẽ tiến hành hoàn tiền hoặc gửi sản phẩm thay thế.
            </li>
          </ol>

          <h3 className="text-xl font-medium text-qblack mb-4 mt-6">3. Chính sách hoàn tiền</h3>
          <ul className="list-disc pl-6 space-y-4">
            <li className="text-[15px] text-qgraytwo leading-7">
              TOEL sẽ hoàn tiền cho bạn theo phương thức thanh toán ban đầu trong vòng 7 ngày làm việc sau khi nhận sản phẩm trả lại.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              Nếu bạn thanh toán qua thẻ ngân hàng, việc hoàn tiền sẽ được thực hiện thông qua chuyển khoản ngân hàng.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              Hoàn tiền có thể mất thêm thời gian tùy thuộc vào ngân hàng và phương thức thanh toán.
            </li>
          </ul>

          <h3 className="text-xl font-medium text-qblack mb-4 mt-6">4. Sản phẩm không đủ điều kiện đổi trả</h3>
          <ul className="list-disc pl-6 space-y-4">
            <li className="text-[15px] text-qgraytwo leading-7">
              Sản phẩm đã qua sử dụng hoặc có dấu hiệu bị sửa chữa, thay đổi.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              Các sản phẩm không còn nguyên vẹn bao gồm bao bì, nhãn mác, hoặc phụ kiện đi kèm.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              Sản phẩm được mua giảm giá hoặc có các chương trình khuyến mãi đặc biệt (trừ khi có chính sách khác).
            </li>
          </ul>

          <p className="text-[15px] text-qgraytwo leading-7 mt-5">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình đổi trả. Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi qua các kênh hỗ trợ khách hàng.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </Layout>
  );
}
