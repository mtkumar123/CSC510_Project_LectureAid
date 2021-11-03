import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Button from '@mui/material/Button';
import {Accordion, AccordionSummary, AccordionDetails} from './commons';

function addBookmarkToLocalStorage(item){
    let link = item.answer
    let question = item.question
    let simpleAnswer = item.simple_answer

    let linksInStorage = JSON.parse(localStorage.getItem("links"));
    if (!linksInStorage) {
        linksInStorage = {};
    }
    linksInStorage[link] = {"question" : question, "simple_answer" : simpleAnswer}
    localStorage.setItem("links", JSON.stringify(linksInStorage));
}

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState("question0");
  const rows = props.results.results;
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
        {rows.map((item, index) => (
    //   <Accordion key={"question" + index} expanded={expanded === "question" + index} onChange={handleChange("question" + index)}>
    <Accordion key={"question" + index}>
        <AccordionSummary aria-controls={"question" + index + "-content"} id={"question" + index + "-header"}>
          <Button
          size="small"
          onClick={() => addBookmarkToLocalStorage(item)}>
            <BookmarkIcon/>
          </Button>
          <Typography>{item.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>{item.simple_answer}</Typography>
            <Link color="rgb(30,144,255)" underline="always" target="_blank" rel="noopener" href={item.answer}>
                {'Link'}
            </Link>{' '}
        </AccordionDetails>
      </Accordion>
      ))}
    </div>
  );
}