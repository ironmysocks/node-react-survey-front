import React from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import Results from './Results';
import axios from 'axios';
const API_URL = "http://localhost:3000/api";

var Question = React.createClass({

  getInitialState() {
    return {
      selectedValue: '',
      error: '',
      question: [],
      answers: [],
      showQuestion: true,
      buttonText: "See Results",
    };
  },

  componentDidMount() {
    axios.get(API_URL + '/questions/1')
      .then((response) => {
        this.setState({
          question: response.data.question,
          answers: response.data.answers
        });
      })
      .catch ((error) => {
        console.log("Failed: ", error);
      });
  },

  onChange(value) {
    this.setState({
      selectedValue: value,
      error: ''
    });
  },

 onSubmit(e) {
   e.preventDefault();

   //User must choose an answer
   if (this.state.showQuestion && this.state.selectedValue=="") {
     this.setState({ error: "Please answer the question and try again." });

   } else if (!this.state.showQuestion) {
     this.setState({
       showQuestion: true,
       buttonText: "See Results",
       selectedValue: '',
       error: ''
     });

   } else {

     //save response
     axios({
       method: 'post',
       url: API_URL + `/questions/${this.state.question.id}`,
       data: {
         "question_id": this.state.question.id,
         "answer_id":this.state.selectedValue
       }
     })
     .then((response) => {
       this.setState({
         error: '',
         showQuestion: false,
         buttonText: "Answer Again"
       });
     })
     .catch( (error) => {
        console.log("Failed: ",error);
      });
  }
 },

 render() {
   const card_style = {
      float: 'none',
      margin: 'auto',
      marginBottom: '10px',
      marginTop: '30px'
   };
   return (
     <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col-10">
          <div className="form-group">

            {this.state.showQuestion ?
              <div className="card" style={card_style}>
              <h3 className="card-header">Survey: {this.state.question.text}</h3>
              <div className="card-block">
                {this.state.error.length>0
                  ? <div className="alert alert-danger" id="error" role="alert">{this.state.error}</div>
                  : null
                }
                <RadioGroup
                  name={"answer" + this.state.question.id}
                  selectedValue={this.state.selectedValue}
                  onChange={this.onChange}>
                    {this.state.answers.map((o,i) => {
                      return (
                        <div>
                        <Radio key={o.id} value={o.id} /> {o.text}
                        </div>
                      );
                      }
                    )}
                </RadioGroup>
              </div>
              </div>

            : <Results question_id={this.state.question.id} /> }

            <button className="btn btn-primary" onClick={this.onSubmit}>{this.state.buttonText}</button>

            </div>
          </div>
        <div className="col"></div>
      </div>
    </div>
   );
 }

});

module.exports = Question;
