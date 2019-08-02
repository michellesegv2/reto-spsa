
import React from 'react';
import PropTypes from 'prop-types';

const Data = ({ title, result }) => {
    return (
        <div className="data">
            <h4>{title} </h4>
            <p>{result}</p>
        </div>
    )
};

Data.propTypes = {
    title: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired
}

export default Data