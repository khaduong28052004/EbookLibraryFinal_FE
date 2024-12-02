import blog from '../../data/blogs.json';
import BlogCard from '../Helpers/Cards/BlogCard';
import DataIteration from '../Helpers/DataIteration';
import PageTitle from '../Helpers/PageTitle';
import Layout from '../Partials/Layout';

export default function ChinhSachNguoiBan() {
    return (
        <Layout childrenClasses="pt-0 pb-0">
            <div className="blogs-wrapper w-full-width">
                <div className="title-bar">
                    <PageTitle
                        title="Chính sách người bán"
                        breadcrumb={[
                            { name: 'home', path: '/' },
                            { name: 'banhang', path: '/chinh-sach' },
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
                                    Chính sách người bán trên TOEL
                                </h2>
                                <p className="text-[16px] text-qgray mb-5">
                                    TOEL cam kết mang lại môi trường kinh doanh trực tuyến minh
                                    bạch, an toàn và hiệu quả cho tất cả người bán sách. Dưới đây
                                    là các chính sách dành cho người bán trên TOEL mà bạn cần nắm
                                    rõ:
                                </p>

                                <h3 className="text-xl font-medium text-qblack mb-4">
                                    1. Điều kiện tham gia bán hàng
                                </h3>
                                <ul className="list-disc pl-6 space-y-4">
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Người bán cần cung cấp thông tin cá nhân hoặc doanh nghiệp
                                        đầy đủ và chính xác khi đăng ký.
                                    </li>
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Các sản phẩm đăng bán phải thuộc danh mục sách, bao gồm sách
                                        in.
                                    </li>
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Người bán phải tuân thủ các quy định về bản quyền và pháp
                                        luật hiện hành liên quan đến sách.
                                    </li>
                                </ul>

                                <h3 className="text-xl font-medium text-qblack mb-4 mt-6">
                                    2. Quy định về đăng sản phẩm
                                </h3>
                                <ul className="list-disc pl-6 space-y-4">
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Mỗi sản phẩm cần cung cấp đầy đủ thông tin như tiêu đề, tác
                                        giả, mô tả, giá bán,và hình ảnh rõ nét.
                                    </li>
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Không được phép đăng các sản phẩm vi phạm bản quyền hoặc có
                                        nội dung không phù hợp với quy định của TOEL.
                                    </li>
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Giá cả và thông tin khuyến mãi phải trung thực, không gây
                                        hiểu nhầm cho khách hàng.
                                    </li>
                                </ul>

                                <h3 className="text-xl font-medium text-qblack mb-4 mt-6">
                                    3. Chính sách giao hàng và thanh toán
                                </h3>
                                <ul className="list-disc pl-6 space-y-4">
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Người bán cần đảm bảo thời gian giao hàng theo đúng cam kết
                                        trên hệ thống.
                                    </li>
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Các hình thức thanh toán được hỗ trợ bao gồm
                                        ví điện tử, hoặc COD (thanh toán khi nhận hàng).
                                    </li>
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        TOEL sẽ xử lý các vấn đề liên quan đến hoàn tiền nếu sản
                                        phẩm không đúng mô tả hoặc không được giao đúng hạn.
                                    </li>
                                </ul>

                                <h3 className="text-xl font-medium text-qblack mb-4 mt-6">
                                    4. Chính sách xử lý vi phạm
                                </h3>
                                <ul className="list-disc pl-6 space-y-4">
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Người bán vi phạm các quy định về bản quyền, thông tin sản
                                        phẩm, hoặc giao hàng không đúng cam kết sẽ bị cảnh cáo hoặc
                                        khóa tài khoản.
                                    </li>
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Các trường hợp tái phạm có thể bị cấm vĩnh viễn trên nền
                                        tảng TOEL.
                                    </li>
                                </ul>

                                <h3 className="text-xl font-medium text-qblack mb-4 mt-6">
                                    5. Hỗ trợ người bán
                                </h3>
                                <ul className="list-disc pl-6 space-y-4">
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Người bán có thể liên hệ với bộ phận hỗ trợ qua toelebook@gmail.com
                                        hoặc hotline: 0933344455
                                    </li>
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        TOEL thường xuyên tổ chức các buổi hướng dẫn trực tuyến để
                                        giúp người bán nâng cao kỹ năng kinh doanh.
                                    </li>
                                    <li className="text-[15px] text-qgraytwo leading-7">
                                        Cung cấp công cụ báo cáo và thống kê doanh thu để người bán
                                        dễ dàng theo dõi hiệu quả kinh doanh.
                                    </li>
                                </ul>

                                <p className="text-[15px] text-qgraytwo leading-7 mt-5">
                                    Chúng tôi mong muốn tạo dựng một cộng đồng bán sách chuyên
                                    nghiệp và uy tín trên TOEL. Hãy bắt đầu hành trình kinh doanh
                                    sách của bạn ngay hôm nay!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
