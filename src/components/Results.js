import React from 'react';
import axios from 'axios';
//const API_URL = "http://localhost:3000/api";
const API_URL = "https://hidden-scrubland-25651.herokuapp.com/api";

var Results = React.createClass({

  getInitialState() {
    return {
      question_text: "",
      results: []
    };
  },

  componentDidMount() {
    //get results
     axios.get(API_URL + `/questions/${this.props.question_id}/results`)
      .then((response) => {
        this.setState({
          question_text: response.data.question.text,
          results: response.data.answers
        });
      })
      .catch((error) => {
        console.log("Failed: ",error);
      });
  },

  render() {
    const card_style = {
       float: 'none',
       margin: 'auto',
       marginBottom: '10px',
       marginTop: '30px'
    };
    return (
      <div className="card" style={card_style}>
      <h3 className="card-header">Results: {this.state.question_text}</h3>
      <div className="card-block">
      <table className="table table-striped">
      <thead>
      <tr>
        <th></th>
        <th>Number of Responses</th>
        <th>Percentage of Total</th>
      </tr>
      </thead>
      <tbody>
      {this.state.results.map((a) => {
        return (
          <tr>
            <td>{a.text}</td>
            <td>{a.num_responses}</td>
            <td>{a.percent}%</td>
          </tr>
        );
      })}
      </tbody>
      </table>
      </div>
      </div>
    );
  }
});

module.exports = Results;
