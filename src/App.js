import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [slot, setSlot] = useState("");
  const [Venue, setVenue] = useState("");

  useEffect(() => {
    // Load subjects from local storage on component mount
    const storedSubjects = localStorage.getItem("subjects");
    if (storedSubjects) {
      setSubjects(JSON.parse(storedSubjects));
    }
  }, []);

  useEffect(() => {
    // Save subjects to local storage whenever it changes
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (subject && slot && Venue) {
      setSubjects([...subjects, { subject, slot, Venue }]);
      setSubject("");
      setSlot("");
      setVenue("");
    }
  };

  const handleDeleteSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const [isLab, setIsLab] = useState(false);
  const handleToggleLab = () => {
    setIsLab(!isLab);
  };

  return (
    <div
      className="container"
      style={{
        margin: "20px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 className="mt-4">VIT AP</h1>
      <form onSubmit={handleAddSubject} className="mb-4">
        <div className="form-group">
          <input
            style={{
              marginTop: "10px",
              width: "100%",
              border: "1px solid purple",
            }}
            type="text"
            className="form-control"
            placeholder="Enter subject name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <div className="input-group">
            <input
              style={{
                marginTop: "10px",
                width: "100%",
                border: "1px solid purple",
              }}
              type="text"
              className="form-control"
              placeholder="Enter slot"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              pattern={
                isLab ? "[A-Za-z][0-9]++[A-Za-z][0-9]+" : "[A-Za-z][0-9]+"
              }
              required
            />
            <div className="input-group-append">
              <button
                style={{
                  marginTop: "10px",
                }}
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleToggleLab}
              >
                {isLab ? "Remove Labs" : "Add Labs"}
              </button>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            style={{
              marginTop: "10px",
              width: "100%",
              border: "1px solid purple",
            }}
            type="text"
            className="form-control"
            placeholder="Enter The Venue"
            value={Venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "10px", width: "100%" }}
        >
          Add Subject
        </button>
      </form>
      <div
        className="subject-list"
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {subjects
          .sort((a, b) => a.slot.localeCompare(b.slot))
          .map((subject, index) => (
            <div key={index} className="subject-item card mb-2">
              <div className="card-body">
                <p className="card-text">Subject: {subject.subject}</p>
                <p className="card-text">Slot: {subject.slot}</p>
                <p className="card-text">Venue: {subject.Venue}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteSubject(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
