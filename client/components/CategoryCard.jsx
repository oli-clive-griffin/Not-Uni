import React from 'react'

export default class CategoryCard extends React.Component {
  clickMe = () => {
    this.props.callBack()
  }

  render () {
    return (
      <div className={this.props.isActive ? 'radio selected' : 'radio'} onClick={() => this.clickMe(this.props.category)} >
        <img src={`/images/icons/${this.props.category}.png`} />
        <span> {this.props.displayName} </span>
      </div>
    )
  }
}
