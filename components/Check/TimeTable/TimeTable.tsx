import { useState } from 'react';
import { Credits } from '../../../interfaces/Credits';
import { CreditInfo } from '../../../interfaces/Rules/Rules';
import { Classes, days, times } from '../../../interfaces/TimeTables';
import ModalSelectClass from './ModalSelectClass';
import OtherTimeTableTable from './OtherTimeTableTable';
import SelectDay from './SelectDay';
import SelectSemester from './SelectSemester';
import TimeTableTable from './TimeTableTable';

type TimeTableProps = {
    credits: Credits;
    setCredits: (credits: Credits) => void;
    creditInfo: CreditInfo;
}

const TimeTable = ({ credits, setCredits, creditInfo }: TimeTableProps) => {
    const [semester, setSemester] = useState<string>(creditInfo.startYear + "年度前期");
    const [day, setDay] = useState<string>(days[0]);
    const [time, setTime] = useState<string>(times[0]);
    const [classes, setClasses] = useState<Classes>();
    const [modalShow, setModalShow] = useState<boolean>(false);

    return (
        <>
            <SelectSemester selected_semester={semester} setSemester={setSemester} startYear={creditInfo.startYear} />
            <SelectDay selected_day={day} setDay={setDay} />
            {
                days.includes(day) ?
                    <TimeTableTable semester={semester} day={day} credits={credits} setCredits={setCredits} creditInfo={creditInfo} setTime={setTime} setModalShow={setModalShow} /> :
                    <OtherTimeTableTable semester={semester} credits={credits} setCredits={setCredits} creditInfo={creditInfo} setTime={setTime} setModalShow={setModalShow} />
            }
            <ModalSelectClass modalShow={modalShow} setModalShow={setModalShow} classes={classes ?? { classes: [] }} semester={semester} day={day} time={time} credits={credits} setCredits={setCredits} creditInfo={creditInfo} />
        </>
    )
}

export default TimeTable;
