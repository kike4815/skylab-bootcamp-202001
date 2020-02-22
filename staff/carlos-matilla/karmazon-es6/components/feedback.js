class Feedback extends Component {
    constructor(props) {
        super(document.createElement('p'))

        const feedback = this.container

        feedback.classList.add('feedback')
        feedback.classList.add('feedback--' + props.level)

        feedback.innerText = props.message

        // feedback.showMessage = function (message) {
        //     this.innerText = message
        // }
        feedback.showMessage = message => feedback.innerText = message
    }
}