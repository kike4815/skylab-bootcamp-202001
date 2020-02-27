'use strict'

function Feedback(props) {
    var feedback = document.createElement('p')
    Component.call(this, feedback)

    feedback.classList.add('feedback')
    feedback.classList.add('feedback--' + props.level)

    feedback.innerText = props.message

}

Feedback.prototype = Object.create(Component.prototype)
Feedback.prototype.constructor = Feedback