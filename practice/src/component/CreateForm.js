import React, {Component} from 'react';

class CreateForm extends Component{
    render(){
        return(
            <article>
                <h2>Create</h2>
                <form action='/create_process' method='post' onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.onSubmitValue(
                        e.target.title.value,
                        e.target.desc.value
                    );
                }}>
                    <p><input type="text" name="title" placeholder="제목" /></p>
                    <p><textarea name="desc" placeholder='내용' /></p>
                    <p><input type='submit' value='전송' /></p>
                </form>
            </article>
        )
    }
}

export default CreateForm