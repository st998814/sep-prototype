// @ts-nocheck

import React, { useState } from "react";
type AppProps = {
  test?: string;
  title?: string;                        
  subtitle?: string;                     
  placeholder?: string;                  
  defaultQuery?: string;                 
  onSearch?: (query: string) => void;    
};
const App: React.FC = ({test="login button"}) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`You searched: ${query}`);

  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>

      <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center", marginBottom: "20px" }}>        
        <button style={{
            marginLeft: "10px",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
          }}>
          {test}
        </button>
      </div>
      {/* searching bar */}
      <div style={{ marginBottom: "20px" }}>
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
  );
};

export default App;
