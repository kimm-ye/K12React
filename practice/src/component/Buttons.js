import React, {Component} from 'react';

class Buttons extends Component{
    render(){
        return(
            <ul>
                <li style={{listStyleType:'none'}}>
                    <input type="button" value="create" onClick={(e)=>{
                        e.preventDefault();
                        this.props.onChangeMode('create');
                    }}/>
                    <input type="button" value="update" onClick={(e)=>{
                        e.preventDefault();
                        this.props.onChangeMode('update');
                    }}/>
                    <input type="button" value="delete" onClick={(e)=>{
                        e.preventDefault();
                        this.props.onChangeMode('delete');
                    }}/>
                </li>
            </ul>
        );
    }
}

export default Buttons