import React, {Component} from 'react';

class Navi extends Component{
    render() {
        let lists = [];
        let data = this.props.data;
        let i = 0;
        /*
        state에 정의한 contents를 props로 받아서 배열 크기만큼 반복하여 li태그를 출력한다. 
        이때 warning이 뜨게 되는데, 중복되지 않는 key prop을 추가해야 한다는 내용이다.
        리엑트의 요청사항이므로 li태그에 key속성을 추가하여 중복되지 않는 값을 가지도록 처리해준다.
        
        자식은 부모쪽으로 데이터를 전달할때 event를 이용한다.
        data-id라는 속성은 event를 통해 전달될때 "이벤트객체.target.dataset.id"를 
        통해 그 값을 얻어올 수 있다.
        */
        while(i<data.length){
            lists.push(<li key={data[i].id}>
                <a href={"/content/"+data[i].id}
                    data-id={data[i].id}
                    onClick={(event) => {
                        //console.log(event);
                        //debugger; //실행을 잠시 멈추고 디버깅 모드로 진입하게 한다.
                        event.preventDefault();
                        //부모가 props로 전달해준 함수를 호출할때 매개변수로
                        //data-id 속성으로 지정한 값을 얻어와서 전달한다.
                        this.props.onChangePage(event.target.dataset.id);
                    }}
                >{data[i].title}</a></li>);
            i++;
        }
        return (
        <nav>
            <ul>
                {lists}
            </ul>
        </nav>
        );
    }
}

export default Navi;