import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import "./HomePage.styles.css";
const HomePage = ({ filteredData, search }) => {
  return (
    <div className="home-page flex">
      <div className="search-bar">
        <h2>Search For A character</h2>
        <CustomInput className="search-input" onChange={search}></CustomInput>
      </div>
      <div className="search-results">
        {filteredData.map((item) => {
          return (
            <Link
              to={item._id.toString()}
              key={item._id}
            >{`${item.name} (${item._id})`}</Link>
          );
        })}
      </div>
    </div>
  );
};
export default HomePage;
