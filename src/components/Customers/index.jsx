import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import Header from "components/Header";
import { Context } from "../../context";
import FlexBetween from "../FlexBetween";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const Customers = () => {
  const { customers, isLoading } = useContext(Context);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box m="1.5rem 2.5rem">
      {/* <Header title="PRODUCTS" subtitle="See your list of products." /> */}
      <h1>Customers</h1>
      {customers || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {customers.map(({ id, name, phone, active, verified }) => (
            <Card
              key={id}
              sx={{
                backgroundImage: "none",
                backgroundColor: "",
                borderRadius: "0.55rem",
              }}
            >
              <CardContent>
                <FlexBetween>
                  <Box>
                    <Typography sx={{ fontSize: 14 }} color={""} gutterBottom>
                      {name}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {phone}
                    </Typography>
                  </Box>

                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Button
                      sx={{
                        "& .MuiSvgIcon-root": { color: "red" },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="p" color="initial">
                        Deactivate
                      </Typography>
                      <DeleteForeverIcon backgroundColor="danger" />
                    </Button>
                  </Box>
                </FlexBetween>
                {/* <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography> */}
                {/* <Rating value={1} readOnly /> */}
              </CardContent>
              <CardActions>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  See More
                </Button>
              </CardActions>
              <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                  color: "",
                }}
              >
                <CardContent>
                  <Typography>id: {id}</Typography>

                  <Typography>active: {active ? "Yes" : "No"}</Typography>
                  <Typography>verified :{verified ? "Yes" : "No"}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Customers;
