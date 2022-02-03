import React, {Component} from 'react';

class UpdateForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.readData.id,
            title : this.props.readData.title,
            desc : this.props.readData.desc
        }
    }
    inputChangeHandler=function(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }.bind(this);


    render(){
        return(
            <article>
                <h2>Update</h2>
                <form action='/update_process' method='post' onSubmit={function(e){
                    e.preventDefault();
                    this.props.onSubmitValue(
                        e.target.id.value,
                        e.target.title.value,
                        e.target.desc.value
                    )
                }.bind(this)}>
                    <input type='hidden' name='id' value={this.state.id} />
                    <p><input type='text' name='title' 
                        placeholder='제목' value={this.state.title}
                        onChange={this.inputChangeHandler} /></p>
                    <p><textarea  name='desc' placeholder='내용' value={this.state.desc} 
                        onChange={this.inputChangeHandler} /></p>
                    <p><input type='submit' value='전송' /></p>
                </form>
            </article>
        )
    }
}

export default UpdateForm