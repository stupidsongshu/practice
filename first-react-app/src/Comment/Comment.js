import React from 'react'
import UserInfo from './UserInfo'

function formatDate(date) {
	return date.toLocaleDateString();
}

class Welcome extends React.Component {
	render() {
		return (
			<div className="Comment">
				<UserInfo userInfo={this.props.author} /> 
				<div className="Comment-text">
					{this.props.text}
				</div>
				<div className="Comment-date">
					{formatDate(this.props.date)}
				</div>
			</div>
		)
	}
}

export default Welcome;
