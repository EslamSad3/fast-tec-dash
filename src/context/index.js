import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Context = createContext();

export function ContextProvider(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [availableTechnicians, setAvailableTechnicians] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);

  let adminheaders = { Authorization: `${localStorage.getItem("AdminToken")}` };

  //   login
  async function handleLogingIn(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/admin/login-admin.php`,
        values
      );
      setIsLsLoading(false);
      localStorage.setItem("AdminToken", response.data.accessToken);
      console.log(response);
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
      setIsLsLoading(false);
      console.log(error);
    }
  }

  // fetch All Customers
  async function fetchAllCustomers() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/customer/fetch-customers.php`,
        { headers: adminheaders }
      );

      console.log(customers, "All Customers");
      setCustomers(response.data.data);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
      console.log(error, "All Customers");
    }
  }
  // fetch All technicians
  async function fetchAllTechnicians() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/tech/fetch-techs.php`,
        { headers: adminheaders }
      );
      console.log(technicians, "All technicians");
      setTechnicians(response.data.data);

      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
      console.log(error, "All technicians");
    }
  }
  // fetch Available technicians
  async function fetchAvailableTechnicians() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/tech/fetch-available-techs.php`,
        { headers: { Authorization: `${localStorage.getItem("AdminToken")}` } }
      );
      console.log(availableTechnicians, "Available technicians");
      setAvailableTechnicians(response.data.data);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
      console.log(error, "Available technicians");
    }
  }

  // add  new technician
  async function addNewTechnician(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/tech/add-tech.php`,
        { headers: { Authorization: `${localStorage.getItem("AdminToken")}` } },
        values
      );
      console.log(response);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
      console.log(error);
    }
  }

  // coupons

  // fetch All coupons
  async function fetchAllCoupons() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/coupons/fetch-coupons.php`,
        { headers: adminheaders }
      );
      console.log(allCoupons, "All coupons");
      setAllCoupons(response.data.data);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
      console.log(error, "All coupons");
    }
  }

  // create coupons
  async function createCoupons(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/coupons/create-coupon.php`,
        { headers: { Authorization: `${localStorage.getItem("AdminToken")}` } },
        values
      );
      console.log(response);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllCustomers();
    fetchAllTechnicians();
    fetchAvailableTechnicians();
    fetchAllCoupons();
  }, []);

  return (
    <Context.Provider
      value={{
        handleLogingIn,
        fetchAllCustomers,
        fetchAllTechnicians,
        fetchAvailableTechnicians,
        addNewTechnician,
        fetchAllCoupons,
        createCoupons,
        isLoading,
        customers,
        technicians,
        availableTechnicians,
        allCoupons,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
