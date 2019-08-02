
import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ name, lastname, age, born, death}) => {
    return (
        <div className="person">
            <h4>{name + " " + lastname} </h4>
            <p>Edad: {age}</p>
            <p>Nacimiento: {born}</p>
            <p>Año estimado para morir: {death}</p>

        </div>
    )
};

Person.propTypes = {
    name: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    born: PropTypes.string.isRequired
}

export default Person