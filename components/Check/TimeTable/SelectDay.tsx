import { Form, Nav } from 'react-bootstrap';

type SelectDayProps = {
    selected_day: string;
    setDay: (credits: string) => void;
}

const SelectDay = ({ selected_day, setDay }: SelectDayProps) => {
    const days = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

    return (
        <>
            <Nav fill variant="tabs" className="mb-2">
                {
                    days.map((day) =>
                        <Nav.Item >
                            <Nav.Link active={day === selected_day} onClick={(e) => setDay(day)} >{day}</Nav.Link>
                        </Nav.Item>
                    )
                }
            </Nav>
        </>
    )
}

export default SelectDay;
