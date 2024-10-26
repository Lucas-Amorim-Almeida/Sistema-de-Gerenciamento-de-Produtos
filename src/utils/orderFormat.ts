const orderFormater = (orderData: {
  id: string;
  status: string;
  user_id: string;
}) => {
  const formatedOrderData = {
    id: orderData.id,
    status: orderData.status,
  };

  return formatedOrderData;
};

export default orderFormater;
