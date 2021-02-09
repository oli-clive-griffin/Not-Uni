import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { createModuleAPI, updateModuleAPI } from '../apis/modules'
import CategoryCard from './CategoryCard'

class CreateModule extends React.Component {
  state = {
    title: '',
    user_id: this.props.user.uid,
    description: '',
    category: '',
    duration: '',
    number_of_elements: '', // this is calculated later
    elements: [],
    deletedElements: []
  }

  editing = this.props.match.path === '/edit/:id'

  componentDidMount () {
    if (this.editing) {

      const currentModuleId = Number(this.props.match.params.id)
      const currentModule = this.props.modules.find((module) => module.id == currentModuleId)
      if (currentModule) this.setState({ ...currentModule })
      
    }
  }

  componentDidUpdate (prevProps) {
    if (this.editing) {
      if (!prevProps || prevProps.match.params.id !== this.props.match.params.id || prevProps.modules.length !== this.props.modules.length || prevProps !== this.props) {

        console.log("update if");

        const currentModuleId = Number(this.props.match.params.id)
        const currentModule = this.props.modules.find((module) => module.id === currentModuleId)
        this.setState({ ...currentModule })
      }
    }
  }  


  addElementHandler = (type) => {
    const newElement = {
      type: type,
      content: ''
    }

    this.setState({
      elements: [...this.state.elements, newElement]
    })
  }

  elementChangeHandler = (evt, i) => {
    const newElements = [...this.state.elements]
    newElements[i].content = evt.target.value

    this.setState({
      elements: [...this.state.elements]
    })
  }

  renderElement = (element, i) => {
    switch (element.type) {
      case 'heading':
        return (
          <input className="input-box heading-input" onChange={(evt) => this.elementChangeHandler(evt, i)} value={this.state.elements[i].content} type="text" placeholder="Heading" />
        )

      case 'paragraph':
        return (
          <textarea className="input-box paragraph-input" onChange={(evt) => this.elementChangeHandler(evt, i)} value={this.state.elements[i].content} placeholder="text" />
        )

      case 'link':
        return (
          <div className="link-input input-box">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
            <input className="" onChange={(evt) => this.elementChangeHandler(evt, i)} value={this.state.elements[i].content} type="url" placeholder="Link"/>
          </div>
        )

      case 'video':
        return (
          <div className="link-input input-box">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>
            <input className="" onChange={(evt) => this.elementChangeHandler(evt, i)} value={this.state.elements[i].content} type="url" placeholder="Youtube Video Link"/>
          </div>

        )
    }
  }

  titleChangeHandler = (evt) => {
    this.setState({
      title: evt.target.value
    })
  }

  durationChangeHandler = (evt) => {
    this.setState({
      duration: evt.target.value
    })
  }

  categoryChangeHandler = (category) => {
    this.setState({
      category: category
    })
  }

  difficultyChangeHandler = (difficulty) => {
    this.setState({
      difficulty: difficulty
    })
  }

  metaChangeHandler = (evt, propType) => {
    this.setState({
      [propType]: evt.target.value
    })
  }

  deleteElementHandler = (i, id) => {
    const tempElements = this.state.elements
    tempElements.splice(i, 1)
    this.setState({
      elements: tempElements
    })

    if (this.editing && id) {
      this.setState({
        deletedElements: [...this.state.deletedElements, id]
      })
    } 
  }

  positionChanger = (direction, i) => {
    const rearrangedElements = [...this.state.elements]
    if (direction === 'down') {
      this.arrayMove(rearrangedElements, i, i + 1)
    } else if (direction === 'up') {
      this.arrayMove(rearrangedElements, i, i - 1)
    }

    this.setState({ elements: rearrangedElements })
  }

  arrayMove = (arr, oldIndex, newIndex) => {
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  }

  submitHandler = () => {
    if (this.editing) {
      updateModuleAPI(this.state)
        .then(() => {
          this.props.history.push('/module/' + this.props.match.params.id)
        })
    } else { 
      createModuleAPI(this.state)
        .then(() => {
          this.props.history.push('/modulecreated')
        })
    }
  }

  render () {
    {this.props.hasLoaded.authHasLoaded && this.props.isAuthenticated !== true && this.props.history.push('/login')}
    return (
      <div className='create-module'>
        <div className="meta-input">
          {this.editing ?
            <h1> Edit Your Module </h1> :
            <h1> Create A Module </h1>
          }

          <input className="input-box title-input" onChange={(evt) => this.metaChangeHandler(evt, 'title')} value={this.state.title} type="text" placeholder="Title"/>

          <textarea className="input-box description-input" onChange={(evt) => this.metaChangeHandler(evt, 'description')} value={this.state.description} placeholder="Short Desciption" />

          <input className="input-box duration-input" onChange={(evt) => this.metaChangeHandler(evt, 'duration')} value={this.state.duration} type="number" placeholder="Approximate Duration (Minutes)"/>

          <h3> Category </h3>
          <div className="radio-container">
            <CategoryCard displayName="HTML" category="HTML" isActive = {this.state.category === 'HTML'} callBack={() => this.categoryChangeHandler('HTML')}/>
            <CategoryCard displayName="Javascript" category="Javascript" isActive = {this.state.category === 'Javascript'} callBack={() => this.categoryChangeHandler('Javascript')}/>
            <CategoryCard displayName="Python" category="Python" isActive = {this.state.category === 'Python'} callBack={() => this.categoryChangeHandler('Python')}/>
            <CategoryCard displayName="CSS" category="CSS" isActive = {this.state.category === 'CSS'} callBack={() => this.categoryChangeHandler('CSS')}/>
            <CategoryCard displayName="Ruby" category="Ruby" isActive = {this.state.category === 'Ruby'} callBack={() => this.categoryChangeHandler('Ruby')}/>
            <CategoryCard displayName="C++" category="C++" isActive = {this.state.category === 'C++'} callBack={() => this.categoryChangeHandler('C++')}/>
            <CategoryCard displayName="C#" category="Csharp" isActive = {this.state.category === 'Csharp'} callBack={() => this.categoryChangeHandler('Csharp')}/>
          </div>
          <h3> Difficulty </h3>
          <div className="radio-container"> 
            <div className={this.state.difficulty === "Beginner" ? 'green radio selected' : 'green radio'} onClick={() => this.difficultyChangeHandler("Beginner")} >
              <span> {'<Beginner>'} </span>
            </div>
            <div className={this.state.difficulty === "Intermediate" ? 'yellow radio selected' : 'yellow radio'} onClick={() => this.difficultyChangeHandler("Intermediate")} >
              <span>  {'<(Intermediate)>'} </span>
            </div>
            <div className={this.state.difficulty === "Advanced" ? 'red radio selected' : 'red radio'} onClick={() => this.difficultyChangeHandler("Advanced")} >
              <span>  {'<({Advanced})>'} </span>
            </div>
          </div>
          <div className="step-spacer" /> 

        </div>

        <div className="element-input-div-container" >
          {this.state.elements.map((element, i) => {
            const spacer = <div className="step-spacer"> </div>
            let needsSpacer = false

            if (i > 0 && element.type == 'heading') {
              needsSpacer = true
            }

            return (
              <>
                {needsSpacer && spacer}
                <div key={i} className="element-input-div" style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderElement(element, i)}
                  <div className="edit-element-div">
                    <div className="edit-element-button" onClick={() => this.positionChanger('up', i)}> Up </div>
                    <div className="edit-element-button" onClick={() => this.positionChanger('down', i)}> Down </div>
                    <div className="edit-element-button" onClick={() => this.deleteElementHandler(i, element.id)}> Delete</div>
                  </div>
                </div>
              </>
            )
          })}
        </div>

        <div className="add-element-button-div">
          <div className="add-element-button" onClick={() => this.addElementHandler('heading')}>
            + Add Step
          </div>
          <div className="add-element-button" onClick={() => this.addElementHandler('paragraph')} >
            + Add Paragraph
          </div>
          <div className="add-element-button" onClick={() => this.addElementHandler('link')} >
            + Add Link
          </div>
          <div className="add-element-button" onClick={() => this.addElementHandler('video')} >
            + Add Video
          </div>
        </div>
        <div className="submit-button" onClick={() => this.submitHandler()} >
          {this.editing ? 'Update' : 'Create Module' } 
        </div>

      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    searchModules: globalState.searchModules,
    modules: globalState.modules,
    isAuthenticated: globalState.isAuthenticated,
    authHasLoaded: globalState.authHasLoaded,
    user: globalState.user,
    hasLoaded: globalState.hasLoaded

  }
}

export default connect(mapStateToProps)(CreateModule)
