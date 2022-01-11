import React, {Component} from 'react';

/*
CDN방식에서는 React.Component를 상속했지만,
웹팩(WebPack) 방식에서는 아래와 같이 상속하면 된다. 
컴포넌트를 만들때에는 항상 하나의 최상위 태그만 있어야 한다.
*/
class Subject extends Component{
    render(){
        return(
            <header>
                <h1>{this.props.title}</h1>
                {this.props.sub}
            </header>
        );
    }
}
// Subject란 이름으로 땡겨쓰란 의미
export default Subject;