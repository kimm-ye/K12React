import React, {Component} from 'react';

class ViewContents extends Component{
    state ={
      bview : {
        content : "내용"
      }
    }
    componentDidMount(){
      fetch('http://localhost:8081/practice/restapi/boardView.do?num='+this.props.num)
      .then((result)=>{
        return result.json();
      })
      .then((json)=>{
        this.setState({bview:json});
      });
    }
    render(){
      return(
        <div class="col-lg-10" id="lay_contents">
            <h2>게시판내용보기</h2>
            <table class="table table-bordered">
            <tbody>
                <tr>
                    <td>번호</td>
                    <td>{this.state.bview.num}</td>
                    <td>작성자</td>
                    <td>{this.state.bview.id}</td>
                </tr>
                <tr>
                    <td>작성일</td>
                    <td>{this.state.bview.postdate}</td>
                    <td>조회수</td>
                    <td>{this.state.bview.visitcount}</td>
                </tr>
                <tr>
                    <td>제목</td>
                    <td colspan="3">{this.state.bview.title}</td>
                </tr>
                <tr>
                    <td>내용</td>
                    <td colspan="3" height="100">{
                      this.state.bview.content.split('\n').map(line=>{
                        return (
                            <span key={Math.random()}>{line}<br/></span>
                        );
                    })
                    }</td>
                </tr>
                <tr>
                    <td colspan="4" align="center">                     
                        <button type="button" onClick={(e)=>{
                          e.preventDefault();
                          this.props.myBoardList('list');
                        }}>
                            목록보기
                        </button>
                    </td>
                </tr>
            </tbody>                                
            </table>
        </div>
      );
    }
}

export default ViewContents;