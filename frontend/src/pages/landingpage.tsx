// @ts-nocheck

import React, { useState } from "react";
import { MOCK_DATA, Item } from "../fake_data/fake_data"; //import Item for checking  and safety
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type AppProps = {
  test?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  defaultQuery?: string;
  onSearch?: (query: string) => void;
};

const HOUR_TIME_RANGES = {
  hour0: {
    text: "Select time range...",
    value: 0,
  },
  hour1: {
    text: "Last hour",
    value: 1,
  },
  hour2: {
    text: "Last 2 hours",
    value: 2,
  },
  hour5: {
    text: "Last 5 hours",
    value: 5,
  },
  hour12: {
    text: "Last 12 hours",
    value: 12,
  },
  hour24: {
    text: "Last 24 hours",
    value: 24,
  },
};

const App: React.FC = ({ test = "login button" }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  // const [dateRange, setDateRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: "selection",
  //   },
  // ]);
  const [searchedValue, setSearchedValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSearch = () => {
    alert(`You searched: ${query}`);
    const result = MOCK_DATA.filter(
      (item: Item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(result);
    console.log(result);
    setSearchedValue(query);
    setHasSearched(true);
  };

  const getLastHourRange = () => {
    const end = new Date();
    const start = new Date(end.getTime() - 60 * 60 * 1000); // subtract 1 hour in milliseconds
    return { start, end };
  };

  const getLastNHoursRange = (hours: number) => {
    const end = new Date();
    const start = new Date(end.getTime() - hours * 60 * 60 * 1000);
    return { start, end };
  };

  const handleTimeRangeChange = (hours: string) => {
    const hoursNum = parseInt(hours);
    if (hoursNum === 0) return; // Skip if default option selected

    const { start, end } = getLastNHoursRange(hoursNum);
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            marginLeft: "10px",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          {test}
        </button>
      </div>
      {/* searching bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>Date-Time filter</div>
          {/* <DateRangePicker
            ranges={dateRange}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
          /> */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Select Date Range"
              isClearable
              monthsShown={2}
              inline
            />
            {/* <span>to</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="End Date & Time"
            /> */}
            <select
              onChange={(event) => handleTimeRangeChange(event.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "200px",
              }}
            >
              {Object.values(HOUR_TIME_RANGES).map((hourFilter) => (
                <option key={hourFilter.value} value={hourFilter.value}>
                  {hourFilter.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            {/* Selected date range: {dateRange[0].startDate.toLocaleDateString()}{" "}
            to {dateRange[0].endDate.toLocaleDateString()} */}
            Selected range:{" "}
            {startDate ? startDate.toLocaleString() : "Start Date Not selected"}{" "}
            to {endDate ? endDate.toLocaleString() : "End Date Not selected"}
          </div>
        </div>
        <div>
          <input
            type="text"
            value={query}
            placeholder="Type to search..."
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "8px",
              width: "250px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              marginLeft: "10px",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              background: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {hasSearched && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div>
              Here is the data after searching for{" "}
              <strong>{searchedValue}</strong>
            </div>
            {results.length === 0 ? (
              <div>No results found!</div>
            ) : (
              <ul>
                {results.map((item: Item) => (
                  <li key={item.id}>
                    <strong>{item.title}</strong> ({item.category}):{" "}
                    {item.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div>
        <div>Full Mock Data</div>
        <ul>
          {MOCK_DATA.map((item: Item) => (
            <li key={item.id}>
              <strong>{item.title}</strong> ({item.category}):{" "}
              {item.description}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div>Mock Blank Section Below</div>
        {/* Empty sections */}
        <section
          style={{
            border: "1px dashed #ccc",
            padding: "20px",
            marginBottom: "15px",
          }}
        >
          Section 1 (Content goes here)
        </section>
        <section
          style={{
            border: "1px dashed #ccc",
            padding: "20px",
            marginBottom: "15px",
          }}
        >
          Section 2 (Content goes here)
        </section>
        <section
          style={{
            border: "1px dashed #ccc",
            padding: "20px",
          }}
        >
          Section 3 (Content goes here)
        </section>
      </div>
    </div>
  );
};

export default App;
