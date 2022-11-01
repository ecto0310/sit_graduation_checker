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
    setCredit: (data: Credits) => void;
}

const LoadCredit: FC<Props> = ({ setCredit }) => {

    const loadCreditFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        var file = e.currentTarget.files![0];
        file.text().then(text => {
            let data: Credits = JSON.parse(text);
            data.credits = data.credits.sort((a, b) => {
                if (a.group !== b.group) {
                    return a.group < b.group ? 1 : -1;
                }
                if (a.division !== b.division) {
                    return a.division < b.division ? 1 : -1;
                }
                if (a.count !== b.count) {
                    return a.count < b.count ? 1 : -1;
                }
                return a.evaluation < b.evaluation ? 1 : -1;
            });
            setCredit(data);
        });
    }

    return (
        <>
            <Form.Control type="file" onChange={loadCreditFile} />
        </>
    );
};


export default LoadCredit;
