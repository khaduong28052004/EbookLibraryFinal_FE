import blog from '../../data/blogs.json';
import BlogCard from '../Helpers/Cards/BlogCard';
import DataIteration from '../Helpers/DataIteration';
import PageTitle from '../Helpers/PageTitle';
import Layout from '../Partials/Layout';

export default function HuongDanBanHang() {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="blogs-wrapper w-full-width">
        <div className="title-bar">
          <PageTitle
            title="Hướng dẫn bán hàng "
            breadcrumb={[
              { name: 'home', path: '/' },
              { name: 'banhang', path: '/ban-hang' },
            ]}
          />
        </div>
      </div>

      <div className="w-full py-[60px]">
  <div className="container-x mx-auto">
    <div className="w-full">
      <div className="grid md:grid-cols-1 grid-cols-1 lg:gap-[30px] gap-5">
        <div className="w-full" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-qblack mb-5">
            Bán sách online bắt đầu từ đâu?
          </h2>
          <p className="text-[16px] text-qgray mb-5">
            Bạn đang nghĩ đến việc kinh doanh sách online hoặc muốn thúc đẩy doanh số bán sách của mình? TOEL là nền tảng lý tưởng để bạn bắt đầu, với hàng triệu độc giả đang chờ đón những cuốn sách hấp dẫn.
          </p>

          <h3 className="text-xl font-medium text-qblack mb-4">
            Làm thế nào để bắt đầu bán sách online trên TOEL?
          </h3>
          <ol className="list-decimal pl-6 space-y-4">
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 1:</strong> <a href="/become-saller" className="text-blue-500 underline">Đăng ký tài khoản bán hàng</a> trên TOEL bằng thông tin cá nhân hoặc doanh nghiệp của bạn.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 2:</strong> Tạo gian hàng sách của bạn, bao gồm tên cửa hàng, mô tả, và ảnh bìa thu hút độc giả.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 3:</strong> Đăng tải danh sách sách của bạn, với đầy đủ thông tin như tựa sách, tác giả, mô tả, thể loại, giá bán, và số lượng còn lại.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 4:</strong> Quảng bá sách của bạn qua các kênh truyền thông xã hội hoặc chương trình khuyến mãi trên TOEL để thu hút độc giả.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 5:</strong> Theo dõi đơn hàng, giao hàng đúng hẹn và phản hồi đánh giá của khách hàng để nâng cao uy tín.
            </li>
          </ol>

          <h3 className="text-xl font-medium text-qblack mb-4 mt-6">
            Tại sao chọn TOEL để bán sách online?
          </h3>
          <ul className="list-disc pl-6 space-y-4">
            <li className="text-[15px] text-qgraytwo leading-7">
              Tiếp cận hàng triệu độc giả tiềm năng, yêu thích sách trên khắp cả nước.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              Công cụ quản lý gian hàng dễ sử dụng, giúp bạn đăng tải và quản lý sách hiệu quả.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              Hỗ trợ các chương trình khuyến mãi và quảng cáo để tăng doanh số bán hàng.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              Chính sách giao hàng và thanh toán linh hoạt, tạo sự thuận tiện tối đa cho cả người bán và người mua.
            </li>
          </ul>

          <p className="text-[15px] text-qgraytwo leading-7 mt-5">
            Hãy bắt đầu hành trình kinh doanh sách của bạn ngay hôm nay trên TOEL. Nếu bạn cần thêm thông tin, đừng ngần ngại liên hệ với chúng tôi qua <a href="mailto:support@toel.com" className="text-blue-500 underline">email hỗ trợ</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

    </Layout>
  );
}
