import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Paper,
  Button,
} from "@mui/material";
import { useState } from "react";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import TableContainer from "@mui/material/TableContainer";
import BlankCard from "../shared/BlankCard";
import { getDelta } from "@/utils/delta";
import { useContract } from "@/hooks/useContract";

const TopPayingClients = () => {

  const [deltas, setDeltas] = useState<number[]>(getDelta());

  const { isLoading, approve, transfer } = useContract();

  const products = [
    {
      id: "1",
      name: "Sunil Joshi",
      post: "Web Designer",
      pname: `8${deltas[0]}%`,
      priority: "Low",
      pbg: "primary.main",
      budget: `3${deltas[0]}.${deltas[1]}`,
    },
    {
      id: "2",
      name: "Andrew McDownland",
      post: "Project Manager",
      pname: `7${deltas[0]}%`,
      priority: "Medium",
      pbg: "secondary.main",
      budget: `2${deltas[1]}.${deltas[1]}`,
    },
    {
      id: "3",
      name: "Christopher Jamil",
      post: "Project Manager",
      pname: `3${deltas[2]}.${deltas[2]}`,
      priority: "High",
      pbg: "error.main",
      budget: "12.8",
    },
    {
      id: "4",
      name: "Nirav Joshi",
      post: "Frontend Engineer",
      pname: `1${deltas[3]}.${deltas[3]}`,
      priority: "Critical",
      pbg: "success.main",
      budget: "2.4",
    },
  ];

  const handleSupport = () => {
    approve("0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d", 10);
  }

  return (
    <DashboardCard title="Gamers">
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <Table
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Gamer
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Win Probability
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Bet price
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Support
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {product.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          {product.post}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {product.pname}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">${product.budget}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => handleSupport()}
                    >
                      Support
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default TopPayingClients;
