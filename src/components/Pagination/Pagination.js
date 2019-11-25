import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { PaginationBlock, Item } from './PaginationBlock';
import { addCurrentPage } from '../../actions';

const MapStateToProps = (state) => ({
  tasks: state.tasks,
});

const MapDispatchToProps = (dispatch) => ({
  addCurrentPage: (page) => dispatch(addCurrentPage(page)),
});

class ConnectedPagination extends Component {
  constructor() {
    super();
    this.state = {
      current: 1,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(page) {
    console.log('onClick');
    console.log(page);

    // console.log(e.target.id);
    this.setState({
      current: page,
    });
    this.props.addCurrentPage(page - 1);
  }

  componentDidMount() {
    this.props.addCurrentPage(0);
  }

  getPagination(tasks) {
    let counter = 0;
    tasks.map((elem, index) => {
      // console.log(index);
      if (index % 10 === 0) {
        console.log('Index', index);
        counter++;
        console.log('counter', counter);

        // return(<Item onClick= {this.onClick} key = {elem["_id"]} id={counter++}>{counter}</Item>)
      }
    });

    console.log(counter);

    return counter;
  }

  render() {
    console.log(this.props.tasks);

    return (


      <Pagination current={this.state.current} total={this.getPagination(this.props.tasks) * 10} onChange={this.onChange} />

    );
  }
}

const CustomPagination = connect(MapStateToProps, MapDispatchToProps)(ConnectedPagination);
export default CustomPagination;

{ /* <PaginationBlock>
            <Item>&laquo;</Item>
                {

                this.getPagination(this.props.tasks)

                }

                    <Item href="#">&raquo;</Item>
            </PaginationBlock> */ }
