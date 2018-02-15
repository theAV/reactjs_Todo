import React, { Component } from 'react';
import {Grid, Row, Col, Panel, Well, ListGroup, ListGroupItem, Checkbox, Glyphicon, Button, ButtonGroup} from 'react-bootstrap';
import AddToList from './addtolist'
import IDB from './Indexed_db/indexdb'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      slectedList : [],
      isUpdating: false,
      updatingId:0
    }
    this.ListSelecthandler = this.ListSelecthandler.bind(this);
    this.removeFromDone = this.removeFromDone.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addToTodo = this.addToTodo.bind(this);
    this.priorityClass = this.priorityClass.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.cancel = this.cancel.bind(this);
  };

  /**
   * select from todo
  */
  ListSelecthandler(e){
    let data = this.state.todos;
    const selectedTopicId = parseInt(e.target.value, 0);
    let preSelected = this.state.slectedList;
    let newAdded = [];
      for (var i = data.length - 1; i >= 0; i--) {
        if(data[i].id === selectedTopicId){
          data[i].done = !data[i].done;
          if(preSelected.indexOf(data[i]) === -1){
            preSelected.push(data[i]);
          }else{
            preSelected.splice(preSelected.indexOf(data[i]), 1);
          }
          newAdded = preSelected;
        }
      }
    this.setState({
      todos: data,
      slectedList: newAdded
    })
  };

  /**
   * remove from done list
   */
  removeFromDone(id){
    let SelectedList = this.state.slectedList;
    let data = this.state.todos.slice(0);
    SelectedList.forEach(function(value, index){
      if(value.id===id){
        SelectedList.splice(index, 1);
        data.forEach(function(val, indx){
          if(val===value){
            val.done = !val.done;
          }
        })
      }
    });
    this.setState({
      todos: data,
      slectedList: SelectedList
    });
  }
  
  /**
   * method insert data into todo list
   */
  addToTodo(data){
    IDB.addTodb(data);
    let todolist = this.state.todos;
    let updatedObj;
    let isKeyExist = todolist.find(function (obj) { return obj.id === data.id });
    if (todolist.length > 0 && isKeyExist){
      for (var i = todolist.length - 1; i >= 0; i--) {
        if (todolist[i].id === data.id){
          todolist[i] = data; 
          updatedObj = todolist;          
        }  
      }
    }else{
      updatedObj = todolist;
      updatedObj.push(data);
    }

    this.setState({
      todos: updatedObj,
      isUpdating: false,
      updatingId: 0
    });
  };
  
  /**
   * handler for remove item from todo list
   */
  removeTodo(id){
    let data = this.state.todos;
    for (let i = 0; i < data.length; i++) {
      if(data[i].id === id){
        data.splice(data.indexOf(data[i]), 1);
      }
    }
    this.setState({
      todos: data
    })
  };

  /** 
   * handler for todo list item
  */
  editTodo(id){
    let editId = this.state.todos.filter(item =>
      {return item.id === id}
    )
    this.child.EditTodoHandler(editId);
    this.setState({
      isUpdating: true,
      updatingId: id
    })
  };
  /**
   *  cancel editing
   */
  cancel(){
    this.setState({
      isUpdating: false,
      updatingId: 0
    })
  }
  /**
   * switch priority className as per priority lavel
   */
  priorityClass(priority){
    let pClass;
    switch (priority) {
      case 1:
        pClass = 'high-priority';
        break;
      case 2:
        pClass = 'medium-priority';
        break;
      case 3:
        pClass = 'low-priority';
        break;
      default:
        pClass = '';
    }
    return pClass;
  };
  
  /** 
  * init state of todo priority
  */
  componentWillMount(){
    let alreadyDoneMarked = this.state.todos.filter((x)=>{
      return x.done === true;
    })
    this.setState({
      slectedList: alreadyDoneMarked
    })
  };

  onChange(){}
  
  render() {
    const hasSelected = this.state.slectedList;
    let data = this.state.todos;    
    let RemainingTodo = function(){
      return data.filter((x)=>{
        return !x.done;
      }).length;
    }

    /*todo list*/
    const defaultList = data.map((x)=>{
      let bgstyle = (this.state.updatingId === x.id) ? 'list-group-item-warning' : "";
        return(
          <ListGroupItem key={x.id} className={this.priorityClass(x.priority) + ' todo-list '+ bgstyle} disabled={x.done === true}>
            <ButtonGroup className="pull-right">
              <Button bsSize="xs" bsStyle="primary" disabled={x.done === true || (this.state.updatingId === x.id)} onClick={this.editTodo.bind(this, x.id)}>
                <Glyphicon glyph="edit" />
              </Button>
              <Button bsSize="xs" bsStyle="danger" disabled={(this.state.updatingId === x.id)} onClick={this.removeTodo.bind(this, x.id)}>
                <Glyphicon glyph="remove" />
              </Button>
            </ButtonGroup>    
            <Checkbox inline 
              value = {x.id} 
              checked = {x.done === true}
              disabled={x.done === true || (this.state.updatingId === x.id)} 
              onChange = {this.onChange} onClick={this.ListSelecthandler}>
              <div>
                {x.text} <i className="small">{(this.state.updatingId === x.id) ? 'Editing' : ''} </i>
                <div className="small text-muted">
                  <i>{(x.priority === 1) ? 'High Priority' : '' || (x.priority === 2) ? 'Medium Priority' : '' || (x.priority === 3) ? 'Low Priority' : ''}</i>
                </div>
              </div>
            </Checkbox>
          </ListGroupItem>
        )
    })
    /*done list*/
    const selectedList = hasSelected.map((itm) => <ListGroupItem key={itm.id} className={this.priorityClass(itm.priority) + ' todo-list'}> 
                                                    <a className="pull-right close" onClick={this.removeFromDone.bind(this, itm.id)}>
                                                      <span aria-hidden="true">&times;</span>
                                                    </a>
                                                    <div className="overflow">{itm.text}</div>
                                                    <div className="small text-muted">
                                                      <i>{(itm.priority === 1) ? 'High Priority' : '' || (itm.priority === 2) ? 'Medium Priority' : '' || (itm.priority === 3) ? 'Low Priority' : ''}</i>
                                                    </div>
                                                  </ListGroupItem>);
    return (
      <Grid>
        <Row>
        <Col lg={6} lgOffset={3}>
          <br />
          <Well>
              <AddToList ref={instance => { this.child = instance; }} cancel={this.cancel} addtoListHandler={this.addToTodo} isUpdating={this.state.isUpdating} updatingId={this.state.updatingId}/>
          </Well>
        </Col>
        {data.length > 0 &&
          <Col lg={6}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Todos</Panel.Title>
              </Panel.Heading>
              <ListGroup>
                <ListGroupItem bsStyle="info">Remaining: {RemainingTodo()}</ListGroupItem>
                {defaultList}
              </ListGroup>
            </Panel>
          </Col>
        }
          {hasSelected.length > 0 && <Col lg={6}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Finished Todos</Panel.Title>
              </Panel.Heading>
              <ListGroup>
                {selectedList}
              </ListGroup>
            </Panel>            
          </Col>
          }
        </Row>
      </Grid>
    );
  }
}

export default App;

