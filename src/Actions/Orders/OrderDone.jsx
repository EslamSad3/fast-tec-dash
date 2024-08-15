import { useContext, useState, useEffect } from "react";
import { Context } from "../../context";
import { useParams } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OrderDone() {
  const { techDone, isLoading, fetchOneOrder, refreshData } =
    useContext(Context);
  const { id } = useParams();
  const [openOrderDone, setOpenOrderDone] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const handleOpenOrderDone = () => {
    setOpenOrderDone(true);
  };

  const handleCloseOrderDone = () => {
    setOpenOrderDone(false);
    formik.resetForm();
  };

  const handleDeleteItem = (index) => {
    const newItems = invoiceItems.filter((_, i) => i !== index);
    setInvoiceItems(newItems);
  };

  async function fetchOrder() {
    await fetchOneOrder(id);
    refreshData();
  }

  async function handleTechDone(values) {
    await techDone(values);
    console.log(values, "values");
    setOpenOrderDone(false);
    fetchOrder();
  }

  // Calculate total cost whenever invoiceItems changes
  useEffect(() => {
    const sum = invoiceItems.reduce(
      (acc, item) => acc + parseFloat(item.cost),
      0
    );
    setTotalCost(sum);
  }, [invoiceItems]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: id,
      invoiceItems: [],
      totalCost: 0,
      status: "5",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      cost: Yup.number()
        .required("Cost is required")
        .positive("Cost must be positive"),
    }),
    onSubmit: (values) => {
      const newInvoiceItems = [...invoiceItems, values];
      setInvoiceItems(newInvoiceItems);
      setTotalCost(
        newInvoiceItems.reduce((acc, item) => acc + parseFloat(item.cost), 0)
      );
      formik.setFieldValue("invoiceItems", newInvoiceItems);
      formik.setFieldValue(
        "totalCost",
        newInvoiceItems.reduce((acc, item) => acc + parseFloat(item.cost), 0)
      );
      formik.resetForm();
    },
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Button variant="contained" onClick={handleOpenOrderDone}>
        Technician Finished
      </Button>

      <Dialog open={openOrderDone} onClose={handleCloseOrderDone}>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="dense"
              label="Cost"
              type="text"
              fullWidth
              id="cost"
              name="cost"
              value={formik.values.cost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cost && Boolean(formik.errors.cost)}
              helperText={formik.touched.cost && formik.errors.cost}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Add Item
            </Button>
          </form>

          <List sx={{ marginTop: 2 }}>
            {invoiceItems.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`Cost: ${item.cost}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total Cost: ${totalCost.toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              marginTop: 2,
              marginBottom: 2,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseOrderDone}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleTechDone(formik.values);
              }}
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "#fafafa" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
