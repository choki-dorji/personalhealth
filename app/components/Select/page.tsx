// import React, { useState } from "react";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
// } from "@nextui-org/react";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useDispatch } from "react-redux";
// import { getSelectedTime } from "@/store/timereducer";

// export default function Select() {
//   const dispatch = useDispatch();
//   const [selectedKeys, setSelectedKeys] = useState();

//   const time = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
//   //   console.log(selectedKeys);
//   let selectedvalue: number;
//   if (selectedKeys) {
//     console.log(selectedKeys);
//     selectedvalue = parseInt(selectedKeys.currentKey);
//     dispatch(getSelectedTime(selectedvalue));
//   }

//   //   console.log(store.getState());

//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         {/* <Tooltip content="filter" color="secondary"> */}
//         <FontAwesomeIcon icon={faFilter} style={{ cursor: "pointer" }} />
//         {/* </Tooltip> */}
//       </DropdownTrigger>
//       <DropdownMenu
//         aria-label="Single selection actions"
//         variant="flat"
//         disallowEmptySelection
//         selectionMode="single"
//         selectedKeys={selectedKeys}
//         onSelectionChange={setSelectedKeys}
//       >
//         {time.map((item) => (
//           <DropdownItem key={item}>{item}</DropdownItem>
//         ))}
//       </DropdownMenu>
//     </Dropdown>
//   );
// }
// /////////////////////////////////////////////////////////////////////////
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
  const [selectedKeys, setSelectedKeys] = useState<any>();

  const timeRanges = [
    { label: "All", range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    { label: "Morning (4 - 10)", range: [4, 5, 6, 7, 8, 9, 10] },
    { label: "Afternoon (11 - 4)", range: [11, 12, 1, 2, 3, 4] },
    { label: "Night (5 - 3)", range: [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3] },
  ];

  console.log(selectedKeys);
  let selectedvalue: number;
  if (selectedKeys) {
    console.log(selectedKeys);
    selectedvalue = parseInt(selectedKeys.currentKey);
    dispatch(getSelectedTime(selectedvalue));
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <FontAwesomeIcon icon={faFilter} style={{ cursor: "pointer" }} />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection actions"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {timeRanges.map((range, index) => (
          <DropdownItem key={index}>{range.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
