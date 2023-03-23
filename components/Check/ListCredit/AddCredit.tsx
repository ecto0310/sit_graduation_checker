import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Credit } from '../../../interfaces/Credits';
import { CreditInfo } from '../../../interfaces/Rules/Rules';

type AddCreditProps = {
    addCredit: (credit: Credit) => void;
    creditInfo: CreditInfo;
}

const AddCredit = ({ addCredit, creditInfo }: AddCreditProps) => {
    const grades = creditInfo.passGrade.concat(creditInfo.failGrade).concat(creditInfo.unknownGrade)

    const [group, setGroup] = useState<string>(creditInfo.groups[0]);
    const [name, setName] = useState<string>("");
    const [division, setDivision] = useState<string>(creditInfo.divisions[0]);
    const [count, setCount] = useState<number>(2);
    const [grade, setGrade] = useState<string>(grades[0]);
    const [semester, setSemester] = useState<string>("");

    return (
        <>
            <tr>
                <td>
                    <Form.Select value={group} onChange={e => setGroup(e.target.value)} >
                        {creditInfo.groups.map((data, index) => <option key={index} value={data}>{data}</option>)}
                    </Form.Select>
                </td>
                <td>
                    <Form.Select value={division} onChange={e => setDivision(e.target.value)} >
                        {creditInfo.divisions.map((data, index) => <option key={index} value={data}>{data}</option>)}
                    </Form.Select>
                </td>
                <td>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
                </td>
                <td>
                    <Form.Control value={count} type="number" onChange={(e) => setCount(parseInt(e.target.value))} />
                </td>
                <td>
                    <Form.Select value={grade} onChange={e => setGrade(e.target.value)} >
                        {grades.map((data, index) => <option key={index} value={data}>{data}</option>)}
                    </Form.Select>
                </td>
                <td>
                    <Form.Select className='mb-1' value={semester} onChange={e => setSemester(e.target.value)} >
                        <option key={-1} value={""}></option>
                        {["", ...Array(16)].map((v, k) => + k).map((data, index) => {
                            const year = (creditInfo.startYear + Math.floor(data / 2)) + "年度";
                            const semester = (data % 2 == 0 ? "前期" : "後期");
                            return <option key={index} value={year + semester}>{year + semester}</option>;
                        })}
                    </Form.Select>
                </td>
                <td>
                </td>
                <td><Button variant="primary" onClick={() => addCredit({ group: group, name: name, division: division, count: count, grade: grade, semester: semester, day: "", time: "" })}><FontAwesomeIcon icon={faPlusSquare} /></Button></td>
            </tr>
        </>
    )
}

export default AddCredit;
