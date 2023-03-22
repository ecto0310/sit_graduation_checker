import { useState } from 'react';
import { Credit, Credits } from '../../interfaces/Credits';
import { CreditInfo } from '../../interfaces/Rules/Rules';
import { Classes, days, times } from '../../interfaces/TimeTables';
import ModalSelectClass from './TimeTable/ModalSelectClass';
import OtherTimeTableTable from './TimeTable/OtherTimeTableTable';
import SelectClass from './TimeTable/SelectClass';
import SelectDay from './TimeTable/SelectDay';
import SelectSemester from './TimeTable/SelectSemester';
import TimeTableTable from './TimeTable/TimeTableTable';

type TimeTableProps = {
    credits: Credits;
    setCredits: (credits: Credits) => void;
    creditInfo: CreditInfo;
}

const TimeTable = ({ credits, setCredits, creditInfo }: TimeTableProps) => {
    const [semester, setSemester] = useState<string>(creditInfo.startYear + "年度前期");
    const [day, setDay] = useState<string>(days[0]);
    const [_, setTime] = useState<string>(times[0]);
    const [classes, setClasses] = useState<Classes>();
    const [modalShow, setModalShow] = useState<boolean>(false);

    return (
        <>
            <SelectSemester selected_semester={semester} setSemester={setSemester} startYear={creditInfo.startYear} />
            <SelectClass classes={classes} setClasses={setClasses} />
            <SelectDay selected_day={day} setDay={setDay} />
            {
                day == days[6] ?
                    <OtherTimeTableTable semester={semester} credits={credits} setCredits={setCredits} creditInfo={creditInfo} setTime={setTime} setModalShow={setModalShow} /> :
                    <TimeTableTable semester={semester} day={day} credits={credits} setCredits={setCredits} creditInfo={creditInfo} setTime={setTime} setModalShow={setModalShow} />
            }
            <ModalSelectClass modalShow={modalShow} setModalShow={setModalShow} classes={classes ?? { classes: [] }} />
        </>
    )
}

export default TimeTable;
