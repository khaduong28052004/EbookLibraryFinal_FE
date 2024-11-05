import React, { useState, useEffect } from "react";
import OrderDetail from '../../../Order/index.jsx';

const userId = 5;

const orderSample = [{
  id: 1,
  date: 'Fub 05,2021',
  status: 'Complated',
  amount: '$757',
},
{
  id: 2,
  date: 'Fub 05,2021',
  status: 'Complated',
  amount: '$757',
},
{
  id: 3,
  date: 'Fub 05,2021',
  status: 'Complated',
  amount: '$757',
},
{
  id: 4,
  date: 'Fub 05,2021',
  status: 'Complated',
  amount: '$757',
},
]

export default function OrderTab() {
  const [orderDetailId, setOrderDetailId] = useState(undefined);
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  const clearOrderDetailId = () => setOrderDetailId(undefined);

  const fetchOrders = async () => {
    // Bla bla bla fetch order, put user id to api
    try {
      setLoading(true);
      const dataTest = await fetch('https://jsonplaceholder.typicode.com/posts');
      setOrders(orderSample);
      console.log(dataTest);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  // if (loading) return <div>LOADING ...</div>

  // if (!loading && !orders) return <div>Cannot find</div>

  if (orderDetailId) return <OrderDetail orderId={orderDetailId} clearOrderDetailId={clearOrderDetailId}></OrderDetail>

  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                Shop
              </td>
              <td className="py-4 whitespace-nowrap text-center">Ngày mua</td>
              <td className="py-4 whitespace-nowrap text-center">Trạng thái</td>
              <td className="py-4 whitespace-nowrap text-center">Tổng tiền</td>
              <td className="py-4 whitespace-nowrap  text-center"></td>
            </tr>
            {/* table heading end */}
            {
              orderSample.map((order) =>
                <tr className="bg-white border-b hover:bg-gray-50" key={order.id}>
                  <td className="text-center py-4">
                    <span className="text-lg text-qgray font-medium">#354</span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qgray  whitespace-nowrap">
                      {order.date}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-sm rounded text-green-700  p-2 ">
                      {order.status}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qblack whitespace-nowrap px-2 ">
                      {order.amount}
                    </span>
                  </td>
                  <td className="text-center py-4">
                    <button
                      type="button"
                      className="w-[200px] h-[46px] rounded text-[#2c8ec3] border border-cyan-600 transition-all duration-500 ease-in-out hover:text-[#36799d] hover:border-cyan-900 "
                      onClick={() => setOrderDetailId(order.id)}
                    >
                      Chi tiết đơn hàng
                    </button>
                  </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
