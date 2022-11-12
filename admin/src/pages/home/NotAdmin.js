import React from 'react'

function NotAdmin() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <p>U can not log in as a user </p>
            <button >
                <a href="/">
                    Login Again
                </a>
            </button>
        </div>
    )
}

export default NotAdmin