import React, { useState } from "react";
import "./styles.css";
import birthdayImg from "/images/birthday.svg";

export default function App() {
  let [name, setName] = useState("");
  let [message, setMessage] = useState("");
  let [dob, setDob] = useState("");
  let [loader, setLoader] = useState("");

  function checkPrime() {
    setTimeout(() => setLoader("fa fa-circle-o-notch fa-spin"));
    const dobNumber = Number(dob.replace("/", ""));
    setTimeout(() => {
      if (name.length === 0) {
        setMessage("Please enter your name !");
      } else if (
        dob[2] !== "/" ||
        isNaN(dobNumber) ||
        dobNumber <= 0 ||
        dobNumber === 1
      ) {
        setMessage("Please enter the correct format !");
      } else {
        // output.classList.remove("output-load");
        const dobString = dobNumber.toString();
        let isPrime = true;
        let date = undefined;
        let month = undefined;
        // 1 will be jan then 2 will be feb and so on
        const monthDays = {
          1: 31,
          2: 29,
          3: 31,
          4: 30,
          5: 31,
          6: 30,
          7: 31,
          8: 31,
          9: 30,
          10: 31,
          11: 30,
          12: 31
        };

        if (dobString.length === 3) {
          date = parseInt(dobString[0], 10);
          month = parseInt(dobString.slice(1), 10);
        } else if (dobString.length === 4) {
          date = parseInt(dobString.slice(0, 2), 10);
          month = parseInt(dobString.slice(2, 4), 10);
        }

        if (date === 1) {
          setMessage(
            `${name} your birthday ${date} is neither prime nor composite number !`
          );
        } else if (monthDays[month] >= date) {
          for (let i = 2; i < date; i++) {
            if (date % i === 0 && name) {
              isPrime = false;
              break;
            }
          }
          if (isPrime) {
            setMessage(`${name} your birthday ${date} is a prime number !`);
          } else {
            setMessage(`${name} your birthday ${date} is not a prime number !`);
          }
        } else {
          setMessage(
            "Please enter a valid day or month or make sure the format is correct !"
          );
        }
      }
    }, 200);
    setTimeout(() => setLoader(""), 350);
  }

  return (
    <main>
      <h1>Birthday prime checker</h1>
      <img src={birthdayImg} alt="birthday" width="35%" />
      <input
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="enter your name"
        require="true"
      />
      <input
        onChange={(event) => setDob(event.target.value)}
        type="text"
        placeholder="enter your birthday in DD/MM format"
        minLength="5"
      />
      <button type="button" onClick={checkPrime}>
        <i className={loader}></i> &nbsp;check
      </button>
      {message[0] === "P" ||
      message.indexOf("not") !== -1 ||
      message.indexOf("nor") !== -1 ? (
        <p id="output" style={{ color: "rgb(255, 101, 132)" }}>
          {message}
        </p>
      ) : (
        <p id="output" style={{ color: "green" }}>
          {message}
        </p>
      )}
    </main>
  );
}
