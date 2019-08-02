import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text, idBtn, href, handleClick }) => {
    return (
        <div className='container-fluid'>
            <a href={href} type="button" id={idBtn} className="btn" onClick={handleClick}>{text}</a>
        </div>
    )
}


Button.propTypes = {
    idBtn: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default Button