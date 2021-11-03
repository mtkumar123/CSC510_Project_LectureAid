import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";

export function MainListItems(props) {
  const [selectedMenu, setSelectedMenu] = React.useState("home");

  const handleChange = (value) => {
    props.getSelectedMenuItem(value);
  };

  return (
    <div>
      <ListItem button color="" onClick={() => handleChange("home")}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => handleChange("upload")}>
        <ListItemIcon>
          <FileUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Upload" />
      </ListItem>
      <ListItem button onClick={() => handleChange("history")}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItem>
      <ListItem button onClick={() => handleChange("bookmarks")}>
        <ListItemIcon>
          <BookmarkIcon />
        </ListItemIcon>
        <ListItemText primary="Bookmarks" />
      </ListItem>
      <ListItem button onClick={() => handleChange("online-search")}>
        <ListItemIcon>
          <ScreenSearchDesktopIcon />
        </ListItemIcon>
        <ListItemText primary="Online Search" />
      </ListItem>
    </div>
  );
}

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Extra???</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="X" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Y" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Z" />
    </ListItem>
  </div>
);
