import React from "react";
import { GiMountains } from "react-icons/gi";
import styles from "./header.module.css";

export default function Header() {
  
  function handleSearch(e) {
    console.log(e.target.value);
  }

  return (
    <header>
      <div className="background"></div>
      <div className="blur"></div>
      <nav>
        <GiMountains className="logo" size="3rem" color="hsl(0 0% 100%)" />
        <h1>Skiline</h1>
        <input
          onChange={(e) => handleSearch(e)}
          className="search"
          type="text"
          placeholder="Search"
        ></input>
      </nav>
    </header>
  );
}
