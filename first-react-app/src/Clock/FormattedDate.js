import React, { Component } from 'react'

class FormattedDate extends Component {
    formateDate(date) {
        return date.toLocaleTimeString();
    }

    render() {
        return (
            <span>
                {this.formateDate(this.props.date)}
            </span>
        )
    }
}

export default FormattedDate;
