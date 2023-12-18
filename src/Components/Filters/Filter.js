import styles from "./Filter.module.css";
import { DateRangePicker } from "react-date-range";

export const Filter = ({ setDateRange, dateRange, formValues, setFormValues }) => {
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

  return (
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
  );
};
