import React from "react";

const OrderDetails = ({ searchParams }) => {
  const { id } = searchParams;
  return <div>{id}</div>;
};

export default OrderDetails;
