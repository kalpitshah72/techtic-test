import React from "react";
import { Radio } from "antd";

export default function Form() {
  return (
    <div>
      <Radio.Group>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
      </Radio.Group>
    </div>
  );
}
