import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Context = createContext();

export function ContextProvider(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLsLoading] = useState(false);
  const [fetchCustomersLoading, setfetchCustomersLoading] = useState(false);
  const [deleteCustomersLoading, setdeleteCustomersLoading] = useState(false);
  const [fetchAllTechniciansLoading, setfetchAllTechniciansLsLoading] =
    useState(false);
  const [
    fetchAvailableTechniciansLoading,
    setfetchAvailableTechniciansLsLoading,
  ] = useState(false);
  const [updateTechnicianLoading, setupdateTechnicianLsLoading] =
    useState(false);
  const [deletTechnicianLoading, setdeletTechnicianLsLoading] = useState(false);
  const [updateCustomerLoading, setupdateCustomerLoading] = useState(false);
  // const [isLoading, setIsLsLoading] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [order, setOrder] = useState({});
  const [oneCustomer, setoneCustomer] = useState({});
  const [oneTech, setoneTech] = useState({});

  const [technicians, setTechnicians] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [availableTechnicians, setAvailableTechnicians] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("AdminToken")
  );

  const [language, setlanguage] = useState(localStorage.getItem("locale"));
  const [localeHeader, setlocaleHeader] = useState({
    locale: `${localStorage.getItem("locale")}` || "ar",
  });

  let adminheaders = { Authorization: `${localStorage.getItem("AdminToken")}` };

  function saveAdminToken() {
    setAdminToken(localStorage.getItem("AdminToken"));
  }

  //   login
  async function handleLogingIn(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/admin/login-admin.php`,
        values,
        { headers: { ...localeHeader } }
      );
      console.log(response);
      setIsLsLoading(false);
      localStorage.setItem("AdminToken", response.data.accessToken);
      if (response.status === 200) {
        toast.success(`${response.data.message}`, {
          position: "top-center",
        });
        navigate("/dashboard");
      } else {
        toast.error(`${response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      if (error.response.status !== 200) {
        // console.log(error);
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsLsLoading(false);
      }
    }
  }

  // fetch All Customers
  async function fetchAllCustomers() {
    try {
      setfetchCustomersLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/customer/fetch-customers.php`,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setCustomers(response.data.data);
      setfetchCustomersLoading(false);
    } catch (error) {
      setfetchCustomersLoading(false);
    }
  }

  // update  Customer
  async function updateCustomer(id, verified, active) {
    try {
      setupdateCustomerLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/auth/customer/update-customer.php`,
        { id, verified, active },
        { headers: { ...localeHeader, ...adminheaders } }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to update Customer");
      }

      setupdateCustomerLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("Customer Not Found");
      } else {
        toast.error("Server Error");
      }

      setupdateCustomerLoading(false);
    }
  }

  // delete Customer
  async function deleteCustomer(id) {
    try {
      setdeleteCustomersLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/auth/customer/delete-customer.php`,
        {
          headers: { ...localeHeader, ...adminheaders },
          data: { id },
        }
      );
      setdeleteCustomersLoading(false);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else if (response.status === 404) {
        toast.error("Customer Not Found");
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setdeleteCustomersLoading(false);
        toast.error("Customer Not Found");
      } else {
        toast.error("Server Error");
        setdeleteCustomersLoading(false);
      }
    }
  }

  // fetch All technicians
  async function fetchAllTechnicians() {
    try {
      setfetchAllTechniciansLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/tech/fetch-techs.php`,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setTechnicians(response.data.data);

      setfetchAllTechniciansLsLoading(false);
    } catch (error) {
      setfetchAllTechniciansLsLoading(false);
    }
  }
  // fetch Available technicians
  async function fetchAvailableTechnicians() {
    try {
      setfetchAvailableTechniciansLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/tech/fetch-available-techs.php`,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setAvailableTechnicians(response.data.data);

      setfetchAvailableTechniciansLsLoading(false);
    } catch (error) {
      setfetchAvailableTechniciansLsLoading(false);
    }
  }

  // add  new technician
  async function addNewTechnician(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/auth/tech/add-tech.php`,
        values,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/technicians");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // Edit Technician
  async function editTechData(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/tech/edit-tech.php`,
        values,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate(`/technicians/${values?.techId}`);

        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
      console.log(error);
    }
  }

  // changeTechPassword
  async function changeTechPassword(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/tech/change-tech-password.php`,
        values,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate(`/technicians/${values?.techId}`);

        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
      console.log(error);
    }
  }

  // update  technician
  async function updateTechnician(id, status) {
    try {
      setupdateTechnicianLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/auth/tech/update-tech.php`,
        { id, active: status },
        { headers: { ...localeHeader, ...adminheaders } }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setupdateTechnicianLsLoading(false);
      }
      setupdateTechnicianLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setupdateTechnicianLsLoading(false);
    }
  }

  // delete technician
  async function deletTechnician(id) {
    try {
      setdeletTechnicianLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/auth/tech/delete-tech.php`,
        {
          headers: { ...localeHeader, ...adminheaders },
          data: { id },
        }
      );
      setdeletTechnicianLsLoading(false);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else if (response.status === 404) {
        toast.error("Technician Not Found");
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setdeletTechnicianLsLoading(false);
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
        setdeletTechnicianLsLoading(false);
      }
    }
  }

  // coupons

  // fetch All coupons
  async function fetchAllCoupons() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/coupons/fetch-coupons.php`,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setAllCoupons(response.data.data);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // create coupons
  async function createCoupons(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/coupons/create-coupon.php`,
        values,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setIsLsLoading(false);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        setIsLsLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLsLoading(false);
      toast.error(error.response.data.message);
    }
  }

  // orders

  // Get orders
  async function fetchOrders() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/fetch-orders.php`,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setIsLsLoading(false);
      setOrders(response.data.data);
    } catch (error) {
      setIsLsLoading(false);
    }
  }
  // Get orders
  async function fetchOneOrder(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/orders/fetch-order.php`,
        { orderId: id },
        { headers: { ...localeHeader, ...adminheaders } }
      );

      setIsLsLoading(false);
      setOrder(response.data);
      setoneCustomer(response.data.customer);
      setoneTech(response.data.tech);
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // Home Data

  async function fetHomeData() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/admin/fetch_all_time_data.php`,
        { headers: { ...adminheaders } }
      );
      if (response.status === 200) {
        setIsLsLoading(false);
        setHomeData(response.data);
      } else {
        setIsLsLoading(false);
      }
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // Send New Notification
  async function sendNewNotification(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/notifications/send-notification.php`,
        values,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setIsLsLoading(false);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        setIsLsLoading(false);
        toast.error("Error sending notification");
      }
    } catch (error) {
      setIsLsLoading(false);
      toast.error(error.response.data.message);
    }
  }

  // change order status by admin
  async function changeOrderStatusByAdmin(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/orders/cancel-order.php`,
        {
          orderId: id,
        },
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setIsLsLoading(false);
      if (response.status === 200) {
        toast.success(response.data?.message);
      } else {
        setIsLsLoading(false);
        toast.error("Error sending notification");
      }
    } catch (error) {
      setIsLsLoading(false);
      toast.error(error.response.data?.message);
    }
  }

  // accept order
  async function acceptOrder(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/orders/admin-update-order.php`,
        values,
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setIsLsLoading(false);
      if (response.status === 200) {
        toast.success(response.data?.message);
        navigate(`/orders/${values.orderId}`);
        fetchOrders();
      } else {
        setIsLsLoading(false);
        toast.error("Failed to accept");
      }
    } catch (error) {
      setIsLsLoading(false);
      toast.error(error.response.data?.message);
    }
  }

  // reject Order

  async function rejectOrder(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/orders/admin-update-order.php`,
        {
          status: "2",
          orderId: id,
          // estimatedArrivalTime: estimatedArrivalTime,
        },
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setIsLsLoading(false);
      if (response.status === 200) {
        toast.success(response.data?.message);
        navigate(`/orders/${id}`);
        fetchOrders();
      } else {
        setIsLsLoading(false);
        toast.error("Failed to Reject");
      }
    } catch (error) {
      setIsLsLoading(false);
      toast.error(error.response.data?.message);
    }
  }

  // assignTechByAdmin

  async function assignTechByAdmin(id, tech) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/orders/assign-tech-order.php`,
        { orderId: id, techId: tech },
        { headers: { ...localeHeader, ...adminheaders } }
      );
      setIsLsLoading(false);
      console.log(response, "assign tech response");
      if (response.status === 200) {
        toast.success(response.data?.message);
        fetchOrders();
      } else {
        setIsLsLoading(false);
        toast.error("Failed to Assign Technician");
      }
    } catch (error) {
      setIsLsLoading(false);
      toast.error("Error");
      console.error(error);
    }
  }
  const handleChangeDir = () => {
    if (language && language === "ar") {
      document.dir = "rtl";
    } else if (language && language === "en") {
      document.dir = "ltr";
    } else {
      document.dir = "ltr";
    }
  };

  const refreshData = () => {
    fetchAllCustomers();
    fetchAllTechnicians();
    fetchAvailableTechnicians();
    fetchAllCoupons();
    fetchOrders();
    handleChangeDir();
    fetHomeData();

    // Add other data fetching functions as needed
  };

  useEffect(() => {
    fetchAllCustomers();
    fetchAllTechnicians();
    fetchAvailableTechnicians();
    fetchAllCoupons();
    saveAdminToken();
    fetchOrders();
    handleChangeDir();
    fetHomeData();
    setlocaleHeader({ locale: "ar" });
  }, []);

  return (
    <Context.Provider
      value={{
        handleLogingIn,
        fetchAllCustomers,
        updateCustomer,
        deleteCustomer,
        fetchAllTechnicians,
        fetchAvailableTechnicians,
        fetchOrders,
        fetchOneOrder,
        addNewTechnician,
        editTechData,
        changeTechPassword,
        deletTechnician,
        updateTechnician,
        fetchAllCoupons,
        createCoupons,
        refreshData,
        handleChangeDir,
        fetHomeData,
        sendNewNotification,
        changeOrderStatusByAdmin,
        acceptOrder,
        rejectOrder,
        assignTechByAdmin,
        isLoading,
        fetchCustomersLoading,
        deleteCustomersLoading,
        fetchAllTechniciansLoading,
        fetchAvailableTechniciansLoading,
        updateCustomerLoading,
        updateTechnicianLoading,
        deletTechnicianLoading,
        customers,
        technicians,
        availableTechnicians,
        allCoupons,
        adminToken,
        orders,
        order,
        oneCustomer,
        oneTech,
        language,
        homeData,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
