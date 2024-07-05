import { ProductService } from "/src/app/service/ProductService";
import styledd from "./deliver-detail.module.css";
import Navbar1 from "../admin-navbar/page";
import { ScrollPanel } from "primereact/scrollpanel";

const OrderTable = () => {
  const productsWithOrders = ProductService.getProductsWithOrdersData();

  return (
    <div>
      <Navbar1 />
      <ScrollPanel style={{ width: "100%", height: "505px" }}>
        <h3>
          <center>Delivery Detail</center>
        </h3>
        <div className={styledd.container}>
          <table className={styledd.tableView}>
            <thead>
              <tr className={styledd.tr}>
                <th className={styledd.th}>Order ID</th>
                <th className={styledd.th}>Product Code</th>
                <th className={styledd.th}>Product Name</th>
                <th className={styledd.th}>Date</th>
                <th className={styledd.th}>Amount</th>
                <th className={styledd.th}>Quantity</th>
                <th className={styledd.th}>Customer</th>
                <th className={styledd.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {productsWithOrders.map((product) =>
                product.orders.map((order) => (
                  <tr className={styledd.tr} key={order.id}>
                    <td className={styledd.td}>{order.id}</td>
                    <td className={styledd.td}>{order.productCode}</td>
                    <td className={styledd.td}>{order.productName}</td>
                    <td className={styledd.td}>{order.date}</td>
                    <td className={styledd.td}>{order.amount}</td>
                    <td className={styledd.td}>{order.quantity}</td>
                    <td className={styledd.td}>{order.customer}</td>
                    <td className={styledd.td}>{order.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </ScrollPanel>
    </div>
  );
};

export default OrderTable;
