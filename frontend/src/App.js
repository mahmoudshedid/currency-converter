import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import CurrencyConverter from './converter/currency.converter';

function App() {
  return (
    <div>
      <div>
        <AppBar color="primary" position="static">
          <Toolbar>
            <TypoGraphy color="inherit">
              Currencies Converter
         </TypoGraphy>
          </Toolbar>
        </AppBar>
      </div>
      <div className="container">
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;
