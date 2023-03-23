import { Form, Nav } from 'react-bootstrap';
import { days } from '../../../interfaces/TimeTables';

type SelectDayProps = {
    selected_day: string;
    setDay: (credits: string) => void;
}

const SelectDay = ({ selected_day, setDay }: SelectDayProps) => {
    return (
        <>
            <Nav fill variant="tabs" className="mb-2">
                {
                    <>
                        {days.map((day) =>
                            <Nav.Item >
                                <Nav.Link active={day === selected_day} onClick={(e) => setDay(day)} >{day}</Nav.Link>
                            </Nav.Item>
                        )}
                        <Nav.Item >
                            <Nav.Link active={"" === selected_day} onClick={(e) => setDay("")} >その他</Nav.Link>
                        </Nav.Item>
                    </>
                }
            </Nav>
        </>
    )
}

export default SelectDay;
