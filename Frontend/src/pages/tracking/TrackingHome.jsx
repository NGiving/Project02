import { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import SearchAppBar from "./SearchAppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const TrackingHome = () => {
  const [readyOrders, setReadyOrders] = useState([]);
  const [transitOrders, setTransitOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async (status, setState) => {
      try {
        const response = await fetch(
          `http://localhost:3000/tracking/orders/${status}`
        );
        if (response.ok) {
          const res = await response.json();
          setState(res.data);
        } else {
          console.error(response.statusText);
        }
      } catch (error) {
        console.error(`Error fetching ${status} orders:`, error);
      }
    };
    fetchOrders("ready", setReadyOrders);
    fetchOrders("transit", setTransitOrders);
    fetchOrders("delivered", setDeliveredOrders);
    fetchOrders("cancelled", setCancelledOrders);
  }, []);

  const handleCancelUpdate = (orderId) => {
    setReadyOrders((prev) => prev.filter((order) => order._id !== orderId));
    setTransitOrders((prev) => prev.filter((order) => order._id !== orderId));
  };

  return (
    <>
      <SearchAppBar />
      <Container>
        <Box sx={{ "&>*": { mb: 6, mt: 6 } }}>
          <OrderTable
            status="ready"
            orders={readyOrders}
            onCancel={handleCancelUpdate}
          />

          <OrderTable
            status="transit"
            orders={transitOrders}
            onCancel={handleCancelUpdate}
          />

          <OrderTable
            status="delivered"
            orders={deliveredOrders}
            onCancel={handleCancelUpdate}
          />

          <OrderTable
            status="cancelled"
            orders={cancelledOrders}
            onCancel={handleCancelUpdate}
          />
        </Box>
      </Container>
    </>
  );
};

export default TrackingHome;
