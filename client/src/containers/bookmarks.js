import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Accordion, AccordionSummary, AccordionDetails } from "./commons";

function getRatingsFromLocalStorage() {
  let linksInStorage = JSON.parse(localStorage.getItem("links"));
  return linksInStorage;
}

export default function BookmarkAccordian() {
  const [expanded, setExpanded] = React.useState("bookmark0");
  const rows = getRatingsFromLocalStorage();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  let keys = Object.keys(rows);

  return (
    <div>
      {keys.map((item, index) => (
        <Accordion key={"bookmark" + index}>
          <AccordionSummary aria-controls={"bookmark" + index + "-content"} id={"bookmark" + index + "-header"}>
            <Typography>{rows[item].question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{rows[item].simple_answer}</Typography>
            <Link color="rgb(30,144,255)" underline="always" target="_blank" rel="noopener" href={item}>
              {"Link"}
            </Link>{" "}
            ~
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
