import React, {Component} from 'react';
import './App.css';
import Subject from './component/Subject';
import Navi from './component/Navi';
import Content from './component/Content';
import Buttons from './component/Buttons';
import CreateForm from './component/CreateForm';
import UpdateForm from './component/UpdateForm';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      subject : {title : "WEB(state)" , sub:"world wide web(state)"},
      contents : [
        {id: 1, title:"HTML", desc : "HTML is...."},
        {id: 2, title:"CSS", desc : "CSS is...."},
        {id: 3, title:"Javascript", desc : "Javascript is...."},
      ],
      mode : "welcome",
      welcome : {title : "Welcome", desc : "Hello~~~ React~~!!!!"},
      selected_content_id: 1,
    }
  }
  render(){
    let _title, _desc, _article = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <Content title={_title} desc={_desc}></Content>;
    }
    else if(this.state.mode === "read"){
      var i = 0;
      while(i<this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++
      }
      _article = <Content title={_title} desc={_desc}></Content>;
    }
    else if(this.state.mode === "create"){
      _article = <CreateForm onSubmitValue={(_title, _desc)=>{
        console.log(_title, _desc);

        this.max_content_id = this.max_content_id +1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          contents : _contents,
          mode : 'read',
          selected_content_id : this.max_content_id
        });
      }}></CreateForm>
    }
    else if(this.state.mode === "update"){
      //let _readData = this.state.contents[this.state.selected_content_id-1];
      let _readData;
      let i = 0;
      while(i<this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _readData = data;
          break;
        }
        i++;
      }
      _article = <UpdateForm readData = {_readData} onSubmitValue={(_id, _title, _desc)=>{
        console.log(_id, _title, _desc);

        var _contents = Array.from(this.state.contents);
        //_contents[this.state.selected_content_id-1] = {id:Number(_id), title:_title, desc: _desc};
        var i =0;
        while(i<_contents.length){
          var data = _contents[i];
          if(data.id === Number(_id)){
            _contents[i] = {id:Number(_id), title:_title, desc: _desc};
            break;
          }
          i++;
        }
        this.setState({
          contents : _contents,
          mode : 'read',
        });
      }}></UpdateForm>
    }


    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} sub={this.state.subject.sub}
          onChangePage = {()=>{
            this.setState({mode : "welcome"});
          }}
        ></Subject>
        <Navi data={this.state.contents}
          onChangePage={function(id){
            this.setState({
              mode : "read", 
              selected_content_id : Number(id)
            });
          }.bind(this)}
        ></Navi>
        <Buttons onChangeMode={(btn_mode)=>{
          if(btn_mode === 'delete'){
            if(window.confirm('찐삭제?')){
              var _contents = Array.from(this.state.contents);
              var i =0;
              while(i<_contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }
                i++;
              }
              this.setState({
                mode : 'welcome',
                contents:_contents
              });
            }
          }
          else{
            this.setState({
              mode:btn_mode
            });
          }
        }}
        ></Buttons>
        {_article}
      </div>
    );
  }
}

export default App;
