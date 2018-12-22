import React from 'react';
// import PropTypes from 'prop-types';
import './Spinner.css';

function Spinner({ style }) {
  return (
    <div className="Spinner" style={style}>
      <div className="sk-circle">
        <div className="sk-circle1 sk-child" />
        <div className="sk-circle2 sk-child" />
        <div className="sk-circle3 sk-child" />
        <div className="sk-circle4 sk-child" />
        <div className="sk-circle5 sk-child" />
        <div className="sk-circle6 sk-child" />
        <div className="sk-circle7 sk-child" />
        <div className="sk-circle8 sk-child" />
        <div className="sk-circle9 sk-child" />
        <div className="sk-circle10 sk-child" />
        <div className="sk-circle11 sk-child" />
        <div className="sk-circle12 sk-child" />
      </div>
    </div>
  );
}

// Spinner.propTypes = {
//   someProp: PropTypes.string.isRequired,
// };

export default Spinner;
