import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMoneyBill, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { calcTime, convertMoney } from '../../../helpers.js';
import './MovieInfoBar.css';

const MovieInfoBar = (props) => {
    return (
        <div className="rmdb-movieinfobar">
            <div className="rmdb-movieinfobar-content">
                <div className="rmdb-movieinfobar-content-col">
                    <FontAwesomeIcon className="fa-time" icon={faTimes} size="2x" />
                    <span className="rmdb-movieinfobar-info">Running time: {calcTime(props.time)}</span>
                </div>
                <div className="rmdb-movieinfobar-content-col">
                    <FontAwesomeIcon className="fa-budget" icon={faMoneyBill} size="2x" />
                    <span className="rmdb-movieinfobar-info">Budget: {convertMoney(props.budget)}</span>
                </div>
                <div className="rmdb-movieinfobar-content-col">
                    <FontAwesomeIcon className="fa-revenue" icon={faTicketAlt} size="2x" />
                    <span className="rmdb-movieinfobar-info">Revenue: {convertMoney(props.revenue)}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieInfoBar
