import { FC } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";

type Props = {
    result: boolean | undefined;
}

const CheckMark: FC<Props> = ({ result }) => {
    return (
        <>
            {
                result === undefined ?
                    <FontAwesomeIcon icon={faCircleQuestion} style={{ color: '#ffc107' }} /> :
                    result ?
                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#198754' }} /> :
                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#dc3545' }} />
            }
        </>
    );
};

export default CheckMark;
