import React, { useState } from "react";
import { Radio, Checkbox, Input, Button } from "antd";
import { isEmpty } from "lodash";

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
      console.log(formDetails);
    }
  };

  return (
    <div>
      Gender
      <Radio.Group onChange={onChange}>
        <Radio value={"Male"}>Male</Radio>
        <Radio value={"Female"}>Female</Radio>
      </Radio.Group>
      Favourite Sport
      <Checkbox.Group options={plainOptions} onChange={handleCheckBox} />
      Enter Day
      <br />
      <Input
        placeholder="Enter Day"
        onChange={(e) =>
          setFormDetails({ ...formDetails, day: e.target.value })
        }
      />
      <br />
      Add Hobbies
      <br />
      <TextArea
        rows={4}
        onChange={(e) =>
          setFormDetails({ ...formDetails, hobby: e.target.value })
        }
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
