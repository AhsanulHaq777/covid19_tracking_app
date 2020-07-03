import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 1000,
    marginTop: 50

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'lightgrey',
    
  },
  gridTitle: {
    color: '#3f51b5',
  }
}));

export default function DataGrids() {
  const classes = useStyles();
  const [globalData, setGlobalData] = useState({});
  useEffect(() => {
    async function getGlobalData() {
      const response = await fetch("https://api.thevirustracker.com/free-api?global=stats");
      let globalApiData = await response.json();
      delete globalApiData.results[0].source;
      setGlobalData(globalApiData.results[0]);
      console.log(globalApiData.results[0]);
    }
    getGlobalData();
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {Object.keys(globalData).map((dataKey, indexKey) => {
          return (
            <Grid item xs={12} sm={4} key={indexKey}>
              <Paper elevation={4} className={classes.paper}>
                <h3 className={classes.gridTitle}>{dataKey.replace(/_/g, ' ').toUpperCase()}</h3>
                <h3>{globalData[dataKey]}</h3>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}
