import React, { Component } from 'react'

class Avator extends Component {
	render() {
		return (
			<div>
				<img className="Avatar"
					src={this.props.user.avatarUrl}
					alt={this.props.user.name}
					title={this.props.user.name} />
			</div>
		)
	}
}

export default Avator;
