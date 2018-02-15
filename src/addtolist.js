/**
 * AddToList class is a form from user add Todo
 */
import React, { Component } from 'react';
import {Button, FormGroup, ControlLabel, FormControl, Radio} from 'react-bootstrap';

class AddToList extends Component{
	constructor(props){
		super(props)
		this.state = {
			blankform: {
				id: 0,
				text: "",
				defaultPriority: 3,
				done: false
			},
			btnDisabled: true		
		}
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.addText = this.addText.bind(this);
		this.onPriorityChange = this.onPriorityChange.bind(this);
		this.EditTodoHandler = this.EditTodoHandler.bind(this);
		this.CancelEditing = this.CancelEditing.bind(this);
		this.formReset = this.formReset.bind(this);
	};

	/**
	 * update the text area text
	 * update the add button's disablity
	 */
	inputChangeHandler(e){
		let blankForm = this.state.blankform;
		blankForm['text'] = e.target.value;
		this.setState({
			blankform: blankForm, 
			btnDisabled: (e.target.value.length > 0) ? false : true
		});
	};

	/** 
	 * handler for add todo in to list
	 */
	addText(){
		let todoForm = document.getElementsByName('todoForm')[0];
		let tododata = {};
		let date = new Date();
		let idComponent = [
			date.getYear(),
			date.getMilliseconds(),
			date.getHours()
		];
		
		tododata.id = (this.props.updatingId > 0) ? this.props.updatingId : parseInt(idComponent.join('') + Math.floor((Math.random() * 100)), 0);
		tododata.text = todoForm.text.value;
		tododata.priority = (todoForm.priority.value === "") ? this.state.blankform.defaultPriority : parseInt(todoForm.priority.value, 0) ;
		tododata.done = false;

		this.props.addtoListHandler(tododata);

		this.formReset();		
	};


	/**
	 * todo edit handler
	 */
	EditTodoHandler(obj){
		let Obj = obj[0];
		let blankForm = this.state.blankform;
		blankForm['id'] = Obj.id;
		blankForm['text'] = Obj.text;
		blankForm['defaultPriority'] = Obj.priority;
		blankForm['done'] = Obj.done;				
		this.setState({
			blankform: blankForm,
			btnDisabled: false
		});
	};
 
	/**
	 * priority checkbox handler
	 */
	onPriorityChange(e){
		let blankForm = this.state.blankform;
		blankForm['defaultPriority'] = parseInt(e.target.value, 0);
		this.setState({
			blankform: blankForm
		});
	};
	/**
	 * cancel editing 
	 */
	CancelEditing(){
		this.props.cancel();
		this.formReset();
	}
	
	/**
	 * form reset 
	*/
	formReset(){
		let blankForm = this.state.blankform;
		blankForm['id'] = 0;
		blankForm['text'] = "";
		blankForm['defaultPriority'] = 3;
		blankForm['done'] = false;
		this.setState({
			blankform: blankForm,
			btnDisabled: true
		});
	}
	render(){
		const priority_lavel = this.state.blankform.defaultPriority;
		return(
			<form name="todoForm">
				<FormGroup controlId="todoinput">
			      <ControlLabel>Todo Text</ControlLabel>
					<FormControl name="text" onChange={this.inputChangeHandler} componentClass="textarea" value={this.state.blankform.text} placeholder="Write here..." />
			    </FormGroup>
			    <FormGroup>
			    	<div><ControlLabel>Set Priority</ControlLabel></div>
			    	<Radio onChange={this.onPriorityChange} name="priority" checked={priority_lavel===1} value="1" inline>
				        High
				    </Radio>
				    <Radio onChange={this.onPriorityChange} name="priority" checked={priority_lavel===2} value="2" inline>
				        Medium
				    </Radio>
				    <Radio onChange={this.onPriorityChange} name="priority" checked={priority_lavel===3} value="3" inline>
				        Low
				    </Radio>
			    </FormGroup>
			    <Button disabled={this.state.btnDisabled} onClick={this.addText}>
					{(this.props.isUpdating) ? 'Update' : 'Add'}
				</Button>
				&nbsp;{(this.props.isUpdating) ? <Button onClick={this.CancelEditing}>Cancel</Button> : null}
            </form>
			)
	}
}

export default AddToList;