import React from "react";
import "./index.css";
import { useRoute, useLocation } from "wouter";

export default function Overlay() {
  const [, params] = useRoute("/:name");
  const [, setLocation] = useLocation();
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          color: "#92b1cc",
        }}
      >
        <div className="text" style={{ display: params ? "none" : "block" }}>
          {params ? (
            ""
          ) : (
            <h3>
              You Seem Lost... <br /> Follow The Portal back Home
            </h3>
          )}
        </div>

        <a
          style={{ position: "absolute", top: 40, left: 40, fontSize: "16px", color: params ? "#0032f4" : "inherit" }}
          href="#"
          onClick={() => setLocation("/")}
        >
          {params ? "< Back" : "Double click to enter portal"}
        </a>
      </div>
      <div className="hero" style={{ display: params ? "flex" : "none" }}>
        <h1>Never Gonna Give You Home...</h1>
        <h3>Never Gonna...</h3>
      </div>
    </>
  );
}
