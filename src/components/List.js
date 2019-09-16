import React, {Component} from "react";
import { connect } from "react-redux";

function mapStateToProps(state){
    return { tasks: state.tasks,
            date: state.date
         }
}

class ConnectedList extends Component{
    constructor(){
        super()
    }

    getDate(dateObj){
        
        var h = this.addZero(dateObj.getHours());
        var m = this.addZero(dateObj.getMinutes());
        var s = this.addZero(dateObj.getSeconds());

        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var date = h + ":" + m + ":" + s + " " + year + "/" + month + "/" + day;
        return date;
    }
    addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
    render(){
        // console.log(this.props.tasks);
        

        return (
            <ul>
                {this.props.tasks.map(
                    task => (
                        <li >
                            {task.name + '  ' + task.date} 
                        </li>
                    )
                )}
            </ul>
        )
    }
}

const List = connect(mapStateToProps)(ConnectedList)
export default List