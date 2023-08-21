import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { getSelectedTime } from "@/store/timereducer";
import store from "@/store/store";

export default function Select() {
  const dispatch = useDispatch();
  const [selectedKeys, setSelectedKeys] = useState();

  const time = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
//   console.log(selectedKeys);
  let selectedvalue: number;
  if (selectedKeys) {
    selectedvalue = parseInt(selectedKeys.currentKey);
    // console.log(selectedvalue);
    dispatch(getSelectedTime(selectedvalue));
  }

//   console.log(store.getState());

  return (
    <Dropdown>
      <DropdownTrigger>
        {/* <Tooltip content="filter" color="secondary"> */}
        <FontAwesomeIcon icon={faFilter} style={{ cursor: "pointer" }} />
        {/* </Tooltip> */}
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection actions"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {time.map((item) => (
          <DropdownItem key={item}>{item}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
