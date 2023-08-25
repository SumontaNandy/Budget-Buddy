import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import EditRow from "./EditRow";

const options = [
  { 
    name: "Edit Series",
    component: EditRow
  },
  { 
    name: "Delete Series",
    component: EditRow
  }
];

const ITEM_HEIGHT = 48;

export default function Settings(props) {
  console.log("props settings: ", props);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [Dialog, setDialog] = React.useState(false);
  const handleDialog = () => {
    setDialog(false);
  };
       
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch"
          }
        }}
      >
        { options.map((option) => (
          <MenuItem
            key={option.name}
            onClick={(e) => { setDialog(true) }}
          >
            {option.name}
          </MenuItem>
        )) }
      </Menu>

      { Dialog && <EditRow account={props.account} category={props.category} handleDialog={handleDialog} /> }
    </div>
  );
}