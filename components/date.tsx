import React from "react";
import {formatDateToDay, formatDateToMonth, formatDateToYear} from "@/lib/format-date";

export default function Date({date}) {

    return (
        <div className="date-full">
            <div className="date-left">
                <div className="date-day">{formatDateToDay(date)}</div>
                <div className="date-month">{formatDateToMonth(date)}</div>
            </div>
            <div className="date-right">
                <div className="date-year">{formatDateToYear(date)}</div>
            </div>
        </div>
    );
}
