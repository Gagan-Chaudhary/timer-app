import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const ListStyle = {
  backgroundColor: "#D9D9D9",
  margin: "10px",
  borderRadius: "15px",
};

const Main = () => {
  const [timers, setTimers] = useState([]);
  const [input, setInput] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      timers.forEach((timer, i) => {
        console.log(timer[0]);
        if (timer[0] <= 0 || isNaN(timer[0])) {
          timers.splice(i, 1);
        } else {
          timer[0]--;
        }
      });

      setTimers([...timers]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
  const addTimer = (event) => {
    event.preventDefault();

    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    var t = new Date().toISOString().substring(11, 16);
    console.log(t);
    var dateObj = new Date(Date.now());
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getSeconds();

    var timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    console.log(timeString);
    d = [day, month, year].join(".");
    d = d + " " + timeString;

    console.log("👽", "I am working");
    let arr = [input, d];
    setTimers([...timers, arr]);
    setInput("");
  };

  return (
    <>
      <div className="App">
        <h1 className="main">Timer App ⌛</h1>
        <form className="form">
          <div>
            <FormControl>
              <InputLabel> Add Timer</InputLabel>
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </FormControl>
          </div>

          <div className="add">
            <Button
              type="submit"
              onClick={addTimer}
              variant="contained"
              color="primary"
              disabled={!input}
            >
              Add
            </Button>
          </div>
        </form>

        <div className="timers">
          <div className="div1">
            <List>
              {timers.map((timer) => (
                <ListItem
                  style={ListStyle}
                  secondaryAction={
                    <IconButton>
                      <ClearIcon
                        sx={{ fontSize: "30px" }}
                        onClick={() => {
                          timers.forEach((t, i) => {
                            if (timer == t) {
                              timers.splice(i, 1);
                            }
                          });
                          setTimers([...timers]);
                        }}
                      />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      Math.floor(timer[0] / 60) + " : " + (timer[0] % 60)
                    }
                    secondary={timer[1]}
                    primaryTypographyProps={{
                      fontSize: 30,
                      fontWeight: "bold",
                      color: "black",
                    }}
                    secondaryTypographyProps={{
                      fontSize: 15,
                      color: "black",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
