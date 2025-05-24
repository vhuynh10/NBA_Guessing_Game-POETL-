import React from 'react'

export default function VictoryScreen({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "3rem",
        flexDirection: "column"
      }}
    >
      🎉 Victory! 🎉
      <button
        style={{
          marginTop: "2rem",
          fontSize: "1.5rem",
          padding: "0.5rem 2rem",
          borderRadius: "8px",
          border: "none",
          background: "#fff",
          color: "#333",
          cursor: "pointer"
        }}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}