import React, {Component} from 'react';
import './App.css';
import Top from './component/Top';
import Left from './component/Left';
import Bottom from './component/Bottom';
import ListContents from './component/ListContents';
import ViewContents from './component/ViewContents';
import WrtieContent from './component/WriteContents';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode : 'list',
      num : 0
    };
  }
  render(){
    let content;
    if(this.state.mode==='list'){
      content = <ListContents 
        myBoardView = {(pnum, pmode)=>{
          this.setState({
            num:pnum, mode:pmode
          });
        }}
        myBoardWrite={(pmode)=>{
          this.setState({
            mode:pmode
        });
      }}></ListContents>
    }

    else if(this.state.mode==='view'){
      content = <ViewContents num={this.state.num} myBoardList={(pmode)=>{
        this.setState({
          mode:pmode
        });
      }}></ViewContents>
    }

    else if(this.state.mode === 'write'){
      content = <WrtieContent
        myBoardList={(pmode)=>{
          this.setState({mode:pmode});
        }}
        mySubmitValue={(_id, _title, _content)=>{
          let param = {
            id : _id,
            title : _title,
            content : _content,
          };

          let url = 'http://localhost:8081/practice/restapi/boardWrite.do';
          fetch(url, {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json;charset=utf-8'
            },
            body : JSON.stringify(param)
          })
          .then((response)=>{
            return response.json();
          })
          .then((json)=>{
            if(json.result === 'success'){
              console.log(' 성공')
            }
            else {
              alert('실패')
            }
          });
          this.setState({mode:'list'});
        }}
      ></WrtieContent>
    }

    return(
      <div className='container'>
        <Top></Top>
        <div class="row">
          <Left></Left>
          {content}
        </div>
        <Bottom></Bottom>
      </div>
    );
  }
}

export default App;
