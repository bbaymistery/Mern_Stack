import React from 'react'

const Icons = ({ setContent, content, theme }) => {
    const reactions = [
        '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
        '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
        '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
    ]

    return (
        <div className="nav-item dropdown" style={{ opacity: 1, filter: theme ? 'invert(1)' : 'invert(0)' }}>
            <span
                role="button"
                id="navbarDropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-toggle="dropdown"
                className="nav-link position-relative px-1"
            >
                <span style={{ opacity: 0.4, fontSize: "16px" }}>😄</span>
            </span>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <div className="reactions">
                    {reactions.map(icon => (<span key={icon} onClick={() => setContent(content + icon)}>  {icon}  </span>))}
                </div>
            </div>

        </div>
    )
}

export default Icons
