import React from 'react'

const BackendErrorMessages = ({ backendErrors }) => {
    console.log("🔥🚀 ===> BackendErrorMessages ===> backendErrors", backendErrors);
    const errorsMessages = {
        email: ['cant be blank'],
        password: ['cant be blank'],
        username: ['cant be blank', 'is to short (minimum is 3 character)'],
    }

    const errorMessages = Object.keys(errorsMessages).map(name => {
        const messages = errorsMessages[name]
            .join(' ')
        return `${name} ${messages}`
    })
    return (
        <ul className="error-messages">
            {errorMessages.map(errorMessage => {
                return <li key={errorMessage}>{errorMessage}</li>
            })}
        </ul>
    )
}

export default BackendErrorMessages
