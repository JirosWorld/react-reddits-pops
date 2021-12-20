import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router
} from "react-router-dom";
import './index.css';
import App from './App';

console.log("Reddit heeft een leuke console:\n" +
    " \n" +
    "                  ,d\"=≥,.,qOp,\n" +
    "                 ,7'  ''²$(  )\n" +
    "                ,7'      '?q$7'\n" +
    "             ..,$$,.\n" +
    "   ,.  .,,--***²\"\"²***--,,.  .,\n" +
    " ²   ,p²''              ''²q,   ²\n" +
    ":  ,7'                      '7,  :\n" +
    " ' $      ,db,      ,db,      $ '\n" +
    "  '$      ²$$²      ²$$²      $'\n" +
    "  '$                          $'\n" +
    "   '$.     .,        ,.     .$'\n" +
    "    'b,     '²«»«»«»²'     ,d'\n" +
    "     '²?bn,,          ,,nd?²'\n" +
    "       ,7$ ''²²²²²²²²'' $7,\n" +
    "     ,² ²$              $² ²,\n" +
    "     $  :$              $:  $\n" +
    "     $   $              $   $\n" +
    "     'b  q:            :p  d'\n" +
    "      '²«?$.          .$?»²'\n" +
    "         'b            d'\n" +
    "       ,²²'?,.      .,?'²²,\n" +
    "      ²==--≥²²==--==²²≤--==²\n" +
    "\n");

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <App/>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
