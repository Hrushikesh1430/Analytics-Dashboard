import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContextProvider";
import styles from "./Home.module.css";
import Login from "../Login/Login";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";
import { SideBar } from "../../Components/SideBar/SideBar";

export const Home = () => {
  const { innerWidth } = useContext(DataContext);
  const [formValues, setFormValues] = useState({
    gender: "male",
    ageRange: "15-25",
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date("2022-10-04"),
      endDate: addDays(new Date("2022-10-04"), 4),
      key: "selection",
    },
  ]);

  const [chartData, setChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const cookie = JSON.parse(localStorage.getItem("filters"));
    if (cookie) {
      const { ageRange, gender, dateRange } = cookie;

      const item = {
        ageRange,
        gender,
      };
      let cookieDate = [{ ...dateRange[0], startDate: new Date(dateRange[0].startDate), endDate: new Date(dateRange[0].endDate) }];
      console.log("cookieItem", item);
      setFormValues({ ageRange, gender });
      setDateRange(cookieDate);
    }

    fetchChartData();
  }, []);

  useEffect(() => {
    filterData();
  }, [chartData, dateRange, formValues]);

  const storeCookie = (key, value) => {
    const item = { ...formValues, dateRange };
    console.log(
      JSON.stringify({
        ...item,
        [key]: value,
      })
    );
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
      console.log(barCheck);
      setLineChartData(barCheck);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <SideBar />
      <div className={styles.main}>
        <div className={styles.greetings}>Hello Jeni 👋🏼,</div>
        <div className={styles.filters}>
          <div className={styles.datePickerContainer}>
            <h3 className={styles.heading}>Date Range</h3>
            <DateRangePicker
              onChange={(item) => {
                console.log(item.selection);
                storeCookie("dateRange", [item.selection]);
                setDateRange([item.selection]);
              }}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={dateRange}
              direction="horizontal"
            />
          </div>

          <div className={styles.selectFilterContainer}>
            <div>
              <label htmlFor="ageRange">Age Filter</label>
              <select
                name="ageRange"
                id="age"
                value={formValues.ageRange}
                className={styles.customSelect}
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
            </div>
            <div>
              <label htmlFor="gender">Gender Filter</label>
              <select
                name="gender"
                id="gender"
                className={styles.customSelect}
                value={formValues.gender}
                onChange={(e) => {
                  setFormValues((formValues) => ({
                    ...formValues,
                    gender: e.target.value,
                  }));
                  storeCookie("gender", e.target.value);
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>
        {barChartData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={300} className={styles.chartContainer}>
              {barChartData && (
                <BarChart data={barChartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" label={{ value: "Time Spent", position: "insideBottom", offset: -5 }} />
                  <YAxis dataKey="name" type="category" label={{ value: "Features", angle: -90, position: "insideLeft", margin: 20 }} />
                  <Tooltip />

                  <Bar dataKey="value" fill="#8884d8" barSize={100} onClick={(bar) => handleBarClick(bar)} />
                </BarChart>
              )}
            </ResponsiveContainer>

            {lineChartData.length > 0 && (
              <ResponsiveContainer width="100%" height={300} className={styles.chartContainer}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" label={{ value: "Dates", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Time Spent", angle: -90, position: "insideLeft", margin: 20 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </>
        ) : (
          <>
            <span>No charts to display for the selected filters</span>
          </>
        )}
      </div>

      {/* <div className={styles.main}>


     
      </div> */}
    </div>
  );
};
