import { FC } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export enum Result {
    Pass,
    Unknown,
    Fail,
}

type Props = {
    result: Result;
}

const CheckMark: FC<Props> = ({ result }) => {
    const resultIcon = (): JSX.Element => {
        switch (result) {
            case Result.Pass:
                return (<FontAwesomeIcon icon={faCircleCheck} style={{ color: '#198754' }} />);
            case Result.Unknown:
                return (<FontAwesomeIcon icon={faCircleQuestion} style={{ color: '#ffc107' }} />);
        }
        return (<FontAwesomeIcon icon={faCircleXmark} style={{ color: '#dc3545' }} />);
    }

    return (
        <>
            {resultIcon()}
        </>
    );
};

export default CheckMark;
