import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../Actions/orderActions";
import Loader from "../layout/loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import { useAlert } from "react-alert";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  console.log(user && user.name);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.5 },
    { field: "status", headerName: "status", minWidth: 150, flex: 0.2 ,
    cellClassName: (params)=>{
        return params.getValue(params.id,"status")==="delevered"
        ? "greenColor" :
        "redColor"
    }
    },

    {
      field: "ItemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.25,
    },

    {
      field: "amount",
      headerName: "Amount (₹)",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable:false,
      renderCell: (params)=>{
          return(
          <Link to={`/order/${params.getValue(params.id,"id")}`}>
              <LaunchIcon />
          </Link>
          )
      }
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        ItemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [alert, dispatch, error]);

  return (
    <Fragment>
      <MetaData title={` ${user && user.name} Orders | DelKart`} />
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={8}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">
            {" "}
            {user && user.name}'s Orders
          </Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
