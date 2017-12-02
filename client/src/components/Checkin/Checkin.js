import React from "react";
import classes from  "./Checkin.css";
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/it';

const Checkin = props => (
  <div className="checkin">  
	  <div>
	    <h5>Return Date:</h5>
	    <DayPickerInput
	    formatDate={formatDate}
	    parseDate={parseDate}
	    placeholder={`${formatDate(new Date())}`}
	    />
	  </div>
	</div>
);
export default Checkin;


