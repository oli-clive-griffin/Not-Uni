import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter , Link } from 'react-router-dom'

class ModuleCard extends React.Component {
  
  isYourModule = (this.props.isYourModule)
  
  state={
    delete: this.props.delete
  }

  render () {
   
      let moduleDifficulty = ''
      let difficultyColor = ''
      switch (this.props.module.difficulty) {
        case 'Beginner':
          moduleDifficulty = '<Beginner>';
          difficultyColor = '#2A881B';
          break;
        case 'Intermediate':
          moduleDifficulty = '<(Intermediate)>';
          difficultyColor = 'rgb(216, 194, 0)';
          break;
        case 'Advanced':
          moduleDifficulty = '<({Advanced})>';
          difficultyColor = 'rgb(216, 0, 0)';
          break;
    }

    const findHeader = this.props.module.elements.filter((element) => {
      return (element.type === 'heading')
    })

    let cardColor = ''

    switch (this.props.module.category) {
      case 'HTML':
        cardColor = 'HTML';
        break;
      case 'C':
        cardColor = 'C';
        break;
      case 'JavaScript':
        cardColor = 'JavaScript';
        break;
      case 'Python':
        cardColor = 'Python';
        break;
      case 'Ruby':
        cardColor = 'Ruby';
        break;
      case 'C++':
        cardColor = 'Cplus';
        break;
      case 'CSS':
        cardColor = 'CSS';
        break;
      case 'Csharp':
        cardColor = 'CSharp';
        break;
      default:
        cardColor = ''
    }

   console.log(this.props)
    return (
      <>
        <div className='module-card'>

          <div className={'s-c-heading ' + cardColor}>
            <h1>{this.props.module.title}</h1>
            {this.isYourModule &&
              <Link to={'/edit/' + this.props.module.id } >
                Edit This Module
              </Link> 
            }

            {this.state.delete &&
            <svg className='trashCan' onClick={() => this.props.handleDelete(true, this.props.module)}width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8.46 11.88L9.87 10.47L12 12.59L14.12 10.47L15.53 11.88L13.41 14L15.53 16.12L14.12 17.53L12 15.41L9.88 17.53L8.47 16.12L10.59 14L8.46 11.88ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="white"/>
            </svg>
            }

            {/* {this.props.hasLoaded.authHasLoaded && <> {this.props.isAuthenticated && <Likes module={this.props.module} />}</>} */}
          </div>
          <div className='s-c-info'>
            <p> {this.props.module.description}</p>
            <ul className="steps-list">
              {findHeader.map((header) => {
                return (
                  <li key={header.id}> {header.content}</li>
                )
              })}
            </ul>
            <div className='module-card-difficulty'> 
              <h4 className='colored-difficulty' style={{color: difficultyColor}}> {moduleDifficulty}</h4>
            </div>
          </div>
          <Link to={`/module/${this.props.module.id}`}> Learn More</Link>
        </div>
      </>
    )
  }
}

function mapStateToProps (globalState) {
  return {
    user: globalState.user,
    modules: globalState.modules,
    hasLoaded: globalState.hasLoaded,
    isAuthenticated: globalState.isAuthenticated
  }
}
export default connect(mapStateToProps)(ModuleCard)
