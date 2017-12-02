import React from "react";
import classes from  "./Checkout.css";
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/it';

const Checkin = props => (
	<div className="checkout">        
    <div>
      <h5>Lent Date:</h5>
      <DayPickerInput
      formatDate={formatDate}
      parseDate={parseDate}
      placeholder={`${formatDate(new Date())}`}
      />
    </div>
    <div>
      <h5>Due Date:</h5>
      <DayPickerInput
      formatDate={formatDate}
      parseDate={parseDate}
      placeholder={`${formatDate(new Date())}`}
      />
    </div>

    <div className="form-group">
      <h5>Lent Condition:</h5>
      <input className="form-control" {...props} />

    </div>
      
    <div>
      <button  onClick={this.handleTransactionSubmit} style={{ float: "left" }} className="btn btn">Submit
      </button>
    </div>
   

  </div>
);
export default Checkin;


