import * as React from 'react';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
  marginBottom: "10px"
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },

}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

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
          <Typography>{item.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>{item.simple_answer}</Typography>
            <Link color="blue" underline="yes" target="_blank" rel="noopener" href={item.answer}>
                {'Link'}
            </Link>{' '}
        </AccordionDetails>
      </Accordion>
      ))}
    </div>
  );
}