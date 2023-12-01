// import React from "react";

// function Availtechnicians() {
//   return <div>Availtechnicians</div>;
// }

// export default Availtechnicians;

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
  useTheme,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Context } from "../../context";
import FlexBetween from "../FlexBetween";
import Header from "../Header";

const Availtechnicians = () => {
  const theme = useTheme()
  const { availableTechnicians, isLoading } = useContext(Context);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Available Technicians"
        subtitle="See your list of Available Technicians."
      />
      <h4>Number of Available Techs : {availableTechnicians.length} </h4>
      {availableTechnicians || !isLoading ? (
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
          {availableTechnicians.map(
            ({ id, name, phone, online, suspended, assigned }) => (
              <Card
                key={id}
                sx={{
                  backgroundImage: "none",
                  backgroundColor: theme.palette.background.alt,
                  borderRadius: "0.55rem",
                }}
              >
                <CardContent sx={{ position: "relative" }}>
                  <FlexBetween>
                    <Box>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color={theme.palette.secondary[700]}
                        gutterBottom
                      >
                        {name}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {phone}
                      </Typography>
                    </Box>
                  </FlexBetween>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    sx={{ position: "absolute", top: "0", right: "0" }}
                  >
                    <Button
                      sx={{
                        "& .MuiSvgIcon-root": { color: "red" },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="p" color="initial">
                        suspend
                      </Typography>
                      <DeleteForeverIcon backgroundColor="danger" />
                    </Button>
                  </Box>
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
                    color: theme.palette.neutral[300],
                  }}
                >
                  <CardContent>
                    <Typography>id: {id}</Typography>

                    <Typography>online: {online ? "Yes" : "No"}</Typography>
                    <Typography>
                      suspended :{suspended ? "Yes" : "No"}
                    </Typography>
                    <Typography>assigned :{assigned ? "Yes" : "No"}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Availtechnicians;
