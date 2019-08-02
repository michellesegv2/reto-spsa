import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ text, idHd, handleClick }) => {
    return (
        <div className='header' id={idHd}>
            {text} <span onClick={handleClick} ><img src="https://plazavea.vteximg.com.br/arquivos/home-reto-spsa.png" alt="home" /></span>
        </div>
    )
}

Header.propTypes = {
    idHd: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};
export default Header