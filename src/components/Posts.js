import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";

export class Post extends Component{
    constructor(){
        super();
    }

    componentDidMount(){
        console.log("Call getData from didMount");
        
        this.props.getData()
    }

    render(){
        console.log("Render in Posts");
        
        console.log(this.props.tasks);
        // console.log(this.props.articles);
        return(
        <ul className="list-group list-group-flush">
        {this.props.tasks.map(el => (
          <li className="list-group-item" key={el.id}>
            {el.title}
          </li>
        ))}
      </ul>)
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.remoteArticles.slice(0, 10)
        
    }
}
export default connect(
    mapStateToProps,
    { getData }
)(Post)