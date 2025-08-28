import { Button, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { dashboardService } from "../../services/dashboard";
import { XAXIS_PAYMENT } from "./constants";

const Dashboard = () => {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [dataLalin, setDataLalin] = useState();
  const [dataPaymentChart, setDataPaymentChart] = useState();
  const [dataGateChart, setDataGateChart] = useState();
  const [dataShiftChart, setDataShiftChart] = useState();
  const [dataRuasChart, setDataRuasChart] = useState();

  useEffect(() => {
    getDataLalin();
  }, []);

  useEffect(() => {
    countTotalPayment();
    countTotalGate();
    countTotalShift();
    countTotalRuas()
  }, [dataLalin]);

  const getDataLalin = async () => {
    const { getAllLalin } = dashboardService();
    await getAllLalin(date).then((res) => {
      if (res && res?.data && res?.data?.data) {
        setDataLalin(res?.data?.data?.rows?.rows);
      }
    });
  };

  const filter = () => {
    getDataLalin()
  }

  const countTotalPayment = () => {
    if (dataLalin) {
      const clonedPayment = XAXIS_PAYMENT.map((item) => ({ ...item }));
      clonedPayment.forEach((item) => {
        const key = item.key;
        let total = dataLalin.reduce((sum, row) => {
          return sum + (row[key] || 0);
        }, 0);
        item.total = total;
      });

      setDataPaymentChart(clonedPayment);
    }
  };

  const countTotalGate = () => {
    if (dataLalin) {
      const gateCounts = dataLalin.reduce((acc, row) => {
        const gate = row.IdAsalGerbang;
        acc[gate] = (acc[gate] || 0) + 1;
        return acc;
      }, {});

      const gateData = Object.entries(gateCounts).map(([gate, count]) => ({
        name: "Gerbang " + Number(gate),
        total: count,
      }));

      setDataGateChart(gateData);
    }
  };

  const countTotalShift = () => {
    if (dataLalin) {
      const shiftCounts = dataLalin.reduce((acc, row) => {
        const shift = row.Shift;
        acc[shift] = (acc[shift] || 0) + 1;
        return acc;
      }, {});

      const totalRows = dataLalin.length;

      const shiftPercentages = Object.entries(shiftCounts).map(
        ([shift, count]) => ({
          name: "Shift " + Number(shift),
          value: count,
          percentage: ((count / totalRows) * 100).toFixed(0) + "%",
        })
      );

      console.log(shiftPercentages);
      setDataShiftChart(shiftPercentages);
    }
  };

  const countTotalRuas = () => {
    if (dataLalin) {
      const ruasCounts = dataLalin.reduce((acc, row) => {
        const ruas = row.IdCabang;
        acc[ruas] = (acc[ruas] || 0) + 1;
        return acc;
      }, {});

      const totalRows = dataLalin.length;

      const ruasPercentages = Object.entries(ruasCounts).map(
        ([ruas, count]) => ({
          name: "Ruas " + Number(ruas),
          value: count,
          percentage: ((count / totalRows) * 100).toFixed(0) + "%",
        })
      );

      setDataRuasChart(ruasPercentages);
    }
  }

  console.log("date", date)
  console.log(dataLalin);
  console.log("payment", dataPaymentChart);
  console.log("gate", dataGateChart);
  console.log("shift", dataShiftChart);
  console.log("ruas", dataRuasChart);

  return (
    <div className="flex flex-wrap flex-col p-6">
      <Text className="text-lg font-bold mb-5">Dashboard</Text>

      <div className="mb-5 flex justify-start items-center gap-3">
        <Input className="max-w-40" type="date" placeholder="Tanggal" onChange={(e) => setDate(e?.target?.value)} />
        <Button color="white" backgroundColor="blue.900" onClick={filter}>
          Filter
        </Button>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="w-2/3 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={dataPaymentChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="total"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={dataGateChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="total"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-1/4 h-full">
          <div>
            <div className="flex justify-center">
              <PieChart className="text-center" width={230} height={230}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={dataShiftChart}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>

            <div>
              <Text className="font-bold">Total Lalin</Text>
              {dataShiftChart?.map((shift, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    <Text>{shift?.name}</Text>
                  </div>

                  <Text>{shift?.percentage}</Text>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-center">
              <PieChart className="text-center" width={200} height={200}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={dataRuasChart}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </div>

            <div>
              <Text className="font-bold">Total Lalin</Text>
              {dataRuasChart?.map((ruas, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    <Text>{ruas?.name}</Text>
                  </div>

                  <Text>{ruas?.percentage}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
