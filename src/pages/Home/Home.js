import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContextProvider";
import styles from "./Home.module.css";
import Login from "../Login/Login";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const Home = () => {
  const [formValues, setFormValues] = useState({
    gender: "male",
    ageRange: "15-25",
  });

  const [chartData, setChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date("2022-10-04"),
      endDate: addDays(new Date("2022-10-04"), 4),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const cookie = JSON.parse(localStorage.getItem("filters"));
    if (cookie) {
      const { ageRange, gender, dateRange } = cookie;
      setFormValues({ ageRange, gender });
      // setDateRange(dateRange);
    }
    console.log("cookie", cookie);
    fetchChartData();
  }, []);

  useEffect(() => {
    filterData();
  }, [chartData, dateRange, formValues]);

  const storeCookie = (key, value) => {
    const item = { ...formValues, dateRange };
    localStorage.setItem(
      "filters",
      JSON.stringify({
        ...item,
        [key]: value,
      })
    );
  };

  const filterData = () => {
    let startDate = dateRange[0].startDate;
    let endDate = dateRange[0].endDate;
    const filteredDataWithDate = chartData.filter((item) => new Date(item.Day) >= startDate && new Date(item.Day) <= endDate);
    const filteredWithGender = filteredDataWithDate.filter((item) => item.Gender.toLowerCase() === formValues.gender);
    const filteredWithAge = filteredWithGender.filter((item) => item.Age === formValues.ageRange);
    const features = ["F", "E", "D", "C", "B", "A"];

    setFilteredData(filteredWithAge);

    if (filteredWithAge.length > 0) {
      const check = features.map((key) => ({
        name: key,
        value: filteredWithAge.reduce((acc, item) => acc + item[key], 0),
      }));
      setBarChartData(check);
    } else {
      setBarChartData([]);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/chartinfo");
      const { chartData } = await response.json();
      await setChartData(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBarClick = (bar) => {
    // setSelectedBar(bar);

    if (filteredData.length > 0) {
      const barCheck = filteredData.map((item) => ({
        name: new Date(item.Day).toLocaleDateString("en-US", { day: "2-digit", month: "short" }),
        value: item[bar.name],
      }));
      setLineChartData(barCheck);
    }
  };

  return (
    <>
      <div className={styles.filters}>
        <DateRangePicker
          onChange={(item) => {
            setDateRange([item.selection]);
          }}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={dateRange}
          direction="horizontal"
        />
        <div>
          <label htmlFor="ageRange">Age</label>
          <select
            name="ageRange"
            id="age"
            value={formValues.ageRange}
            onChange={(e) => {
              setFormValues((formValues) => ({
                ...formValues,
                ageRange: e.target.value,
              }));
              storeCookie("ageRange", e.target.value);
            }}
          >
            <option value="15-25">15-25</option>
            <option value=">25">Greater than 25</option>
          </select>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formValues.gender}
            onChange={(e) => {
              setFormValues((formValues) => ({
                ...formValues,
                gender: e.target.value,
              }));
              storeCookie("gender", e.target.value);
            }}
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
      </div>
      {barChartData.length > 0 ? (
        <>
          {barChartData && (
            <BarChart width={600} height={200} data={barChartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" barSize={100} onClick={(bar) => handleBarClick(bar)} />
            </BarChart>
          )}
          {lineChartData.length > 0 && (
            <LineChart width={400} height={300} data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          )}
        </>
      ) : (
        <>
          <span>No charts to display for the selected filters</span>
        </>
      )}

      {/* <div style={{ border: "1px solid black", padding: "10px", marginTop: "20px" }}>
        <p>Clicked Bar: {selectedBar && selectedBar.name}</p>

      </div> */}
    </>
  );
};
