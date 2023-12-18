import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContextProvider";
import styles from "./Home.module.css";
import Login from "../Login/Login";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";

import { SideBar } from "../../Components/SideBar/SideBar";
import { Filter } from "../../Components/Filters/Filter";
import { Charts } from "../../Components/Charts/Charts";

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
      const url = window.location.href.includes("localhost") ? "http://localhost:5000" : "https://analyticsbackend.onrender.com";
      const response = await fetch(`${url}/api/chartinfo`);
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
        <Filter formValues={formValues} setFormValues={setFormValues} setDateRange={setDateRange} dateRange={dateRange} />
        {barChartData.length > 0 ? (
          <Charts barChartData={barChartData} lineChartData={lineChartData} handleBarClick={handleBarClick} />
        ) : (
          <>
            <span>No charts to display for the selected filters</span>
          </>
        )}
      </div>
    </div>
  );
};
