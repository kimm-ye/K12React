import React, {Component} from 'react';

class WrtieContent extends Component{
    render(){
        return(
            <div class="col-lg-10" id="lay_contents">
                <h2>게시판글쓰기</h2>
                <form method="post" onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.mySubmitValue(
                        e.target.id.value,
                        e.target.title.value,
                        e.target.content.value
                    );
                }}>
                <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th width="20%">아이디</th>
                        <td width="80%">
                            <input type="text" name="id" value="musthave" readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input type="text" name="title"  />
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td height="100">
                            <textarea name="content"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4" align="center">                     
                            <button type="submit" onClick="">
                                작성완료
                            </button>
                            <button type="button" onClick={(e)=>{
                                this.props.myBoardList('list');
                            }}>
                                리 스 트
                            </button>
                        </td>
                    </tr>  
                </tbody>                              
                </table>
                </form>
            </div>
        );
    }
}


export default WrtieContent;