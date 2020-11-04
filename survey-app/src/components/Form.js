import React, { useState } from "react";
import { Radio, Checkbox, Input, Button } from "antd";
import { isEmpty } from "lodash";
import axios from "axios";

const { TextArea } = Input;
export default function Form() {
  const [formDetails, setFormDetails] = useState({
    gender: null,
    sport: [],
    day: null,
    hobby: null,
  });
  const [error, setError] = useState("");
  const plainOptions = ["Cricket", "Football", "Basketball"];
  const onChange = (e) => {
    setFormDetails({ ...formDetails, gender: e.target.value });
  };

  const handleCheckBox = (value) => {
    setFormDetails({ ...formDetails, sport: value });
  };

  const showError = (fieldName) => {
    setError(`Please enter ${fieldName} to submit`);
  };

  const onSubmit = () => {
    if (isEmpty(formDetails.gender)) {
      showError("Gender");
    } else if (isEmpty(formDetails.sport)) {
      showError("Sport");
    } else if (isEmpty(formDetails.day)) {
      showError("Day");
    } else if (isEmpty(formDetails.hobby)) {
      showError("Hobby");
    } else {
      setError("");
      axios
        .post(
          `http://localhost:5000/api/auth/form`,
          {
            ...formDetails,
          },
          {
            headers: {
              Authorization: `Basic ${localStorage.getItem("token")}`,
            },
          }
        )
        .catch((error) => {
          if (error) {
            alert("You've already filled the form.");
          }
        })
        .then((res) => {
          if (res) {
            setFormDetails({
              gender: null,
              sport: [],
              day: null,
              hobby: null,
            });
            alert("Thanks for filling the form");
          }
        });
    }
  };

  return (
    <div>
      Gender
      <Radio.Group onChange={onChange} value={formDetails.gender}>
        <Radio value={"Male"}>Male</Radio>
        <Radio value={"Female"}>Female</Radio>
      </Radio.Group>
      Favourite Sport
      <Checkbox.Group
        options={plainOptions}
        onChange={handleCheckBox}
        value={formDetails.sport}
      />
      Enter Day
      <br />
      <Input
        placeholder="Enter Day"
        onChange={(e) =>
          setFormDetails({ ...formDetails, day: e.target.value })
        }
        value={formDetails.day}
      />
      <br />
      Add Hobbies
      <br />
      <TextArea
        rows={4}
        onChange={(e) =>
          setFormDetails({ ...formDetails, hobby: e.target.value })
        }
        value={formDetails.hobby}
      />
      <br />
      <Button type="primary" onClick={onSubmit}>
        Submit
      </Button>
      <br />
      {error}
    </div>
  );
}
