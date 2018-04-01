import React, {Component} from 'react'
import Avatar from './Avatar'

class UserInfo extends Component {
	render() {
		return (
			<div className="UserInfo">
				<Avatar user={this.props.userInfo} />
				<div className="UserInfo-name">
					{this.props.userInfo.name}
				</div>
			</div>
		)
	}
}

export default UserInfo;
