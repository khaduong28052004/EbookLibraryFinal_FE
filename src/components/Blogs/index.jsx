import blog from "../../data/blogs.json";
import BlogCard from "../Helpers/Cards/BlogCard";
import DataIteration from "../Helpers/DataIteration";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function Blogs() {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="blogs-wrapper w-full-width">
        <div className="title-bar">
          <PageTitle
            title="Hướng dẫn mua hàng "
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "blogs", path: "/blogs" },
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
            Làm thế nào để mua hàng trên TOEL?
          </h2>
          <p className="text-[16px] text-qgray mb-5">
            Với các thao tác sau, bạn đã có thể đặt mua sản phẩm trên TOEL:
          </p>
          <ol className="list-decimal pl-6 space-y-4">
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 1:</strong> Đăng nhập tài khoản mua hàng 
              {/* <a href="#" className="text-blue-500 underline">tại đây</a> */}
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 2:</strong> Tìm sản phẩm bằng thanh công cụ tìm kiếm hoặc bằng giọng nói.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 3:</strong> Lựa chọn đầy đủ thuộc tính sản phẩm (số lượng) sau đó nhấn vào nút "Mua ngay".
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 4:</strong> Chọn hình thức vận chuyển và phương thức thanh toán.
            </li>
            <li className="text-[15px] text-qgraytwo leading-7">
              <strong>Bước 5:</strong> Nhấn vào nút "Đặt mua" hoặc "Thanh toán" để hoàn tất.
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</div>

    </Layout>
  );
}
