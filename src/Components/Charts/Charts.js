import styles from "./Charts.module.css";
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";
export const Charts = ({ barChartData, lineChartData, handleBarClick }) => {
  return (
    <>
      <ResponsiveContainer width={800} height={300} className={styles.chartContainer}>
        <span className={styles.greetings}>Analysis per feature with hours</span>
        <BarChart data={barChartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: "Time Spent", position: "insideBottom", offset: -5 }} />
          <YAxis dataKey="name" type="category" label={{ value: "Features", angle: -90, position: "insideLeft", margin: 20 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" barSize={100} onClick={(bar) => handleBarClick(bar)} />
        </BarChart>
      </ResponsiveContainer>

      {lineChartData.length > 0 && (
        <ResponsiveContainer width={800} height={300} className={styles.chartContainer}>
          <span className={styles.lineHeading}>Analysis of the selected feature with selected date range</span>
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
  );
};
