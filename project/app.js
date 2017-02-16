
/**
 * App
 */

import css from './styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import FasetDirectoryListing from './components/FasetDirectoryListing';


ReactDOM.render(
    React.createElement(FasetDirectoryListing, {
        filters: {
          events:   [1],
          naics:    [],
          roles:    ["supplier"]
        },
    }),
    document.getElementById('app')
);