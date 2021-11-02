import * as React from 'react';
import axios from "axios"; 
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CustomizedAccordions from './questions';
import { mainListItems, secondaryListItems } from './listItems';

const result = {
  results: [
    {
      answer: 'https://www.analyticsvidhya.com/blog/2021/08/data-preprocessing-in-data-mining-a-hands-on-guide/#:~:text=Data%20preprocessing%20is%20the%20process,learning%20or%20data%20mining%20algorithms.',
      question: 'What is meant by data preprocessing?',
      simple_answer: 'Data preprocessing is the process of transforming raw data into an understandable format. It is also an important step in data mining as we cannot work with raw data. The quality of the data should be checked before applying machine learning or data mining algorithms.Aug 10, 2021'
    },
    {
      answer: 'https://developer.ibm.com/articles/data-preprocessing-in-detail/#:~:text=To%20ensure%20high%2Dquality%20data,data%20reduction%2C%20and%20data%20transformation.',
      question: 'What are the steps in preprocessing?',
      simple_answer: "To ensure high-quality data, it's crucial to preprocess it. To make the process easier, data preprocessing is divided into four stages: data cleaning, data integration, data reduction, and data transformation.Jun 14, 2019"
    },
    {
      answer: 'https://towardsdatascience.com/data-preprocessing-e2b0bed4c7fb#:~:text=Data%20preprocessing%20is%20an%20important,understandable%20after%20performing%20data%20preprocessing.',
      question: 'What is importance of data preprocessing?',
      simple_answer: 'Data preprocessing is an important task. It is a data mining technique that transforms raw data into a more understandable, useful and efficient format. Data has a better idea. This idea will be clearer and understandable after performing data preprocessing.May 13, 2020'
    },
    {
      answer: 'https://www.sciencedirect.com/topics/engineering/data-preprocessing#:~:text=Data%20preprocessing%20is%20an%20important,to%20form%20a%20QSPR%20model.&text=Data%20cleaning%20and%20transformation%20are,used%20to%20create%20a%20model.',
      question: 'What is data preprocessing and why it is important?',
      simple_answer: 'Data preprocessing is an important step to prepare the data to form a QSPR model. ... Data cleaning and transformation are methods used to remove outliers and standardize the data so that they take a form that can be easily used to create a model.'
    },
    {
      answer: 'https://ncss-wpengine.netdna-ssl.com/wp-content/themes/ncss/pdf/Procedures/NCSS/Subset_Selection_in_Multiple_Regression.pdf',
      question: 'What is subset selection method?',
      simple_answer: 'Subset selection refers to the task of finding a small subset of the available independent variables that does a good job of predicting the dependent variable.'
    },
    {
      answer: 'https://www.cs.waikato.ac.nz/~ml/publications/1998/Hall-Smith98.pdf',
      question: 'What is subset selection in machine learning?',
      simple_answer: 'Feature subset selection is the process of identifying and removing as much of the irrelevant and redundant information as possible. This reduces the dimensionality of the data and allows learning algorithms to operate faster and more effectively.'
    },
    {
      answer: 'https://quantifyinghealth.com/best-subset-selection/#:~:text=Best%20subset%20selection%20is%20a,possible%20combinations%20of%20independent%20variables.',
      question: 'What is best subset selection?',
      simple_answer: 'Best subset selection is a method that aims to find the subset of independent variables (Xi) that best predict the outcome (Y) and it does so by considering all possible combinations of independent variables.'
    },
    {
      answer: 'https://home.agh.edu.pl/~wojnicki/phd/node14.html#:~:text=The%20second%20class%20of%20problems,set%20of%20constraints%20is%20satisfied.&text=For%20simplicity%2C%20it%20is%20assumed,is%20both%20discrete%20and%20finite.',
      question: 'What is subset selection problem?',
      simple_answer: 'The second class of problems (C2) is the Subset Selection. The problem of Admissible Subset Selection (AdSS, for short) concerns finding a subset of a given set so that a given set of constraints is satisfied. ... For simplicity, it is assumed that the set is both discrete and finite.'
    },
    {
      answer: 'https://machinelearningmastery.com/principal-components-analysis-for-dimensionality-reduction-in-python/#:~:text=for%20Dimensionality%20Reduction-,Dimensionality%20Reduction%20and%20PCA,to%20predict%20the%20target%20variable.',
      question: 'What is PCA dimensionality reduction?',
      simple_answer: 'Dimensionality Reduction and PCA. Dimensionality reduction refers to reducing the number of input variables for a dataset. If your data is represented using rows and columns, such as in a spreadsheet, then the input variables are the columns that are fed as input to a model to predict the target variable.May 8, 2020'
    },
    {
      answer: 'https://www.kdnuggets.com/2020/05/dimensionality-reduction-principal-component-analysis.html#:~:text=Principal%20Component%20Analysis(PCA)%20is,of%20orthogonal(perpendicular)%20axes.',
      question: 'How PCA is used for dimension reduction?',
      simple_answer: 'Principal Component Analysis(PCA) is one of the most popular linear dimension reduction algorithms. It is a projection based method that transforms the data by projecting it onto a set of orthogonal(perpendicular) axes.'
    },
    {
      answer: 'https://blog.paperspace.com/dimension-reduction-with-principal-component-analysis/#:~:text=Principal%20Component%20Analysis(PCA)%20is,a%20set%20of%20orthogonal%20axes.',
      question: 'Is PCA linear dimensionality reduction?',
      simple_answer: 'Principal Component Analysis(PCA) is one of the most popular linear dimension reduction. Sometimes, it is used alone and sometimes as a starting solution for other dimension reduction methods. PCA is a projection based method which transforms the data by projecting it onto a set of orthogonal axes.'
    }
  ]
}


function getResults(filename){
  let results = {}
  axios.get('http://127.0.0.1:5000/get-results', {params : {filename : "lecture4"}})
      .then(res => {
        results = JSON.parse(res.data);
        console.log(results);
      })
  return results
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" underline="none" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Lecture Aid
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <CustomizedAccordions
                  //results = {getResults("lecture4")}
                  results = {result}
                  >
                    
                  </CustomizedAccordions>
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}