//해당 문서에서 React의 기능을 사용하기 위해 import한다.
import React, {Component} from 'react';
import './App.css';

/*
외부 JS파일로 모듈화한 컴포넌트를 해당 문서로 import하기 위한 구문으로
export default로 지정한 이름을 그대로 사용하면 된다.
형식] import 컴포넌트명으로 사용할 이름 from '컴포넌트경로'
*/
import Subject from './components/Subject';
import Navi from './components/Navi';
import Content from './components/Content';
import Buttons from './components/Buttons';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';


//클래스형 컴포넌트(함수형 컴포넌트는 Hook(훅)에서 다뤄본다.)
class App extends Component{
  //생성자에서 state를 생성 및 초기화 한다.
  constructor(props){
    super(props);
    //해당 앱에서 사용할 데이터
    /*
    mode를 통해 첫 진입인지 쓰기, 읽기모드인지 판단한다.
    차후 쓰기, 삭제, 수정 등도 해당 state를 통해 판단하게 될 것이다.
    */
    //게시물의 일련번호를 부여하기 위한 시퀀스 용도의 변수
    this.max_content_id = 3;  //기본 게시물이 3개이므로 3으로 설정함.
    this.state = {
      subject : {title : 'WEB(st)', sub : 'World Wide Web(st)'},
      contents : [
        {id : 1, title : 'HTML', desc : 'HTML은 내용을 출력합니다.'},
        {id : 2, title : 'CSS', desc : 'CSS는 스타일을 지정합니다.'},
        {id : 3, title : 'Javascript', desc : 'JS는 화면을 동적으로 제어합니다.'},
      ],
      mode : 'welcome',
      welcome : {title : 'Welcome', desc : 'Hello, React..!!'},
      selected_content_id : 2,
    }
  }

  render(){
    //제목, 내용, mode에 따른 컴포넌트 구분용 변수
    let _title, _desc, _article = null;
    //첫 진입인 경우 환영메세지를 보여준다.
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      //welcome인 경우 첫 진입이므로 내용이 보여야 한다.
      _article = <Content title={_title} desc={_desc}></Content>;
    }

    else if(this.state.mode === 'read'){
      //_title = this.state.contents[0].title;
      //_desc = this.state.contents[0].desc;
      var i =0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
      }
      //read인 경우에도 내용이 보인다.
      _article = <Content title={_title} desc={_desc}></Content>;
    }

    else if(this.state.mode === 'create'){
      //create일 때는 입력폼이 보인다.
      //자식 컴포넌트에서 폼값을 받기 위해 onSubmitValue props를 내려준다.
      _article = <CreateForm onSubmitValue={function(_title, _desc){
        console.log(_title, _desc);

        //일련번호 부여를 위해 +1 증가
        this.max_content_id = this.max_content_id +1;
        //일련번호와 폼값을 이용해서 새로운 객체를 추가한다.
        //concat()함수는 배열을 추가하는 기능도 가지고 있다.
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        //state값을 변경한다. 앞에서 추가한 배열로 교체된다. 그리고 화면이 다시 렌더링된다.
        this.setState({
          contents : _contents,
          mode : 'read',
          selected_content_id : this.max_content_id
        });
      }.bind(this)}></CreateForm>;
    }

    else if(this.state.mode === 'update'){
      /*
      기존의 내용을 읽어오기 위해 선택한 게시물의 일련번호에서 1을 차감한 후
      index로 사용하고 있다. 이 부분은 게시물을 삭제하는 경우 문제가 발생한다.
      (차후 수정 예정)
      */
      //let _readData = this.state.contents[this.state.selected_content_id-1];
      let _readData;
      let i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _readData = data;
          break;
        }
        i++;
      }
      //read인 경우에도 내용이 보인다.
      _article = <UpdateForm readData = {_readData}
        onSubmitValue={function(_id, _title, _desc){
        //전송된 폼값을 확인 (여기서 id는 일련번호를 말한다.)
        console.log(_id, _title, _desc);

        //기존의 배열을 복사하기 위해 Array.from()을 사용한다.
        var _contents = Array.from(this.state.contents);
        //수정할 index를 선택한 후 수정할 내용을 삽입한다.
        //_contents[this.state.selected_content_id-1] = {id:Number(_id), title:_title, desc:_desc};
        
        var i=0;
        while(i < _contents.length){
          var data = _contents[i];
          if(data.id === Number(_id)){
            _contents[i] = {id:Number(_id), title:_title, desc:_desc};
            break;
          }
          i++;
        }

        //변경된 내용을 state에 적용한다.
        this.setState({
          contents : _contents,
          mode : 'read'
        });
      }.bind(this)}></UpdateForm>
    }

    else if(this.state.mode === 'delete'){
      //여기서 처리하면 렌더링이 두번되므로 비효율적이다.
    }


    //Navi컴포넌트로 배열로 정의된 contents를 props로 전달한다.
    return(
      <div className='App'>
        {/* 
        부모가 자식에게 함수기능을 가진 props를 내려준다. 
        여기서는 onChangePage라는 props를 정의했다.
        해당 함수는 state 중 mode를 welcome으로 변경하는 기능이 정의되었다.
        */}
        <Subject 
          title={this.state.subject.title} sub={this.state.subject.sub}
          onChangePage={function(){
            //alert("이벤트 확인용(부모)");
            this.setState({mode:'welcome'});
          }.bind(this)}></Subject>

        {/* 
        Navi컴포넌트로 state 변경 기능을 가진 함수를 props로 내려준다.
        자식은 해당 props를 호출하고, 이때 data-id로 지정된 값을 매개변수로 전달해준다.
        이를 통해 state값을 변경한다. 
        */}
        <Navi data={this.state.contents}
          onChangePage={function(id){
            //console.log('이벤트확인용(Navi)')
            console.log('content_id : ', id);
            this.setState({
              mode : 'read',
              selected_content_id : Number(id)
            });
          }.bind(this)}></Navi>

        <Buttons onChangeMode={function(btn_mode){
          //원래는 버튼 누르면서 모드 바뀌면서 렌더링 한번 위에 delete가서 렌더링 한번 두번이 된다.
          //여기서 삭제 처리를 하면 렌더링을 한번만 해도 되므로 효율적이다.
          if(btn_mode === 'delete'){
            //리엑트에서는 confirm()을 사용할때는 반드시 window를 붙여야 한다.
            if(window.confirm('삭제할까요?')){
              //기존의 배열을 복사한다.
              var _contents = Array.from(this.state.contents);
              var i = 0;
              //복사한 배열에서 삭제할 id값을 가진 원소를 찾는다.
              while(i<_contents.length){
                if(_contents[i].id===this.state.selected_content_id){
                  //splice()를 통해 i번째 인덱스의 원소 1개를 삭제한다.
                  //splice는 splice(시작인덱스, 삭제할원소의갯수, 추가할원소1, 원소2...)
                  _contents.splice(i,1);
                  break;
                }
                i++;
              }
              //게시물이 삭제되면 소멸되므로 welcome으로 이동한다.
              //또한 삭제된 배열 복사본을 state에 적용한다.
              this.setState({
                mode : 'welcome',
                contents : _contents
              });
            }
          }
          else{
            //mode가 delete가 아닌 경우 state 변경 후 렌더링한다.
            this.setState({
              mode : btn_mode
            });
          }
        }.bind(this)}></Buttons>

        {/* content와 article은 동시에 출력되면 안되므로 if문 처리를 위해 변수로 컴포넌트를 저장한다. */}
        {_article}
      </div>
    );
  }
}

export default App;