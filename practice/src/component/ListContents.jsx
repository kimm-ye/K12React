import React, {Component} from 'react';

class ListContents extends Component{
    state = {
      blist : [],
      pageNum : 1
    }
    componentDidMount(){
      let pageNum = this.state.pageNum;
      fetch('http://localhost:8081/practice/restapi/boardList.do?nowPage='+pageNum)
        .then(function(result){
          return result.json();
        })
        .then(function(json){
          this.setState({blist:json});
        }.bind(this));
    }
    render(){
      let listTr = [];
      for(var i = 0; i < this.state.blist.length; i++){
        var row = this.state.blist[i];
        listTr.push(
          <tr align="center" key={row.num}>
            <td>{row.num}</td>
            <td align='left'><a href={row.num} data-id={row.num} onClick={
              (e)=>{
                e.preventDefault();
                this.props.myBoardView(e.target.dataset.id, 'view');
              }
            }>{row.title}</a></td>
  
            <td align='center'>{row.id}</td>
            <td align='center'>{row.visitcount}</td>
            <td align='center'>{row.postdate}</td>
          </tr>
        );
      }
      return(
        <div class="col-lg-10" id="lay_contents">
            <h2>게시판 목록</h2>
            <table class="table table-bordered">
            <thead>
              <tr>
                  <th width="10%">번호</th>
                  <th width="*">제목</th>
                  <th width="15%">작성자</th>
                  <th width="15%">조회수</th>
                  <th width="15%">작성일</th>
              </tr>
              </thead>
              <tbody>
                {listTr}
              </tbody>
            </table>
            <div align="right">
                <button type="button" onClick={(e)=>{
                    this.props.myBoardWrite('write');
                }}>글쓰기</button>
            </div>
        </div>
      )
    }
}

export default ListContents;