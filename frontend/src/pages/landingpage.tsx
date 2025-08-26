// @ts-nocheck

import React, { useState } from "react";
import { MOCK_DATA, Item } from "../fake_data/fake_data"; //import Item for checking  and safety
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type AppProps = {
  test?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  defaultQuery?: string;
  onSearch?: (query: string) => void;
};
const App: React.FC = ({ test = "login button" }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [searchedValue, setSearchedValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

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
          <div>Date filter</div>
          <DateRangePicker
            ranges={dateRange}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
          />
          <div>
            Selected date range: {dateRange[0].startDate.toLocaleDateString()}{" "}
            to {dateRange[0].endDate.toLocaleDateString()}
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
