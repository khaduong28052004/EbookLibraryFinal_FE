import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Table from './components/Table_ChietKhau';

const DiscountRatedmin = () => {
    return (
        <>
            <Breadcrumb pageName="Quản lý chiết khấu" status='Quản Trị' />
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <Table />
            </div>
        </>
    )
}
export default DiscountRatedmin;