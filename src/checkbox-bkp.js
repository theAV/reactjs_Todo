class Checkbox extends Component{
  constructor(props){
    super(props);
    this.Clickhandler = this.Clickhandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  Clickhandler(e){
    this.props.onselectItem(e);
  }
  onChange(){}
  render(){    
    return (
      <span>
        <input type="checkbox" 
          value = {this.props.val} 
          checked = {this.props.isChecked === true} 
          disabled = {this.props.isChecked === true} 
          onChange = {this.onChange} onClick={this.Clickhandler} /> 
      </span>
    )
  }
}