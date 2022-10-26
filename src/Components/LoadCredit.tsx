import { FC } from 'react';
import Form from "react-bootstrap/Form";

export type Credits = {
    credits: Credit[];
}

export type Credit = {
    group: string;
    division: string;
    name: string;
    count: number;
    evaluation: string;
}

type Props = {
    setCredit: (data: Credits) => void
}

const LoadCredit: FC<Props> = ({ setCredit }) => {

    const loadCreditFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        var file = e.currentTarget.files![0];
        file.text().then(text => setCredit(JSON.parse(text)));
    }

    return (
        <>
            <Form.Control type="file" onChange={loadCreditFile} />
        </>
    );
};


export default LoadCredit;
