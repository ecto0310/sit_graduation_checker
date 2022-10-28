
import { FC } from 'react';
import CheckMark from './CheckMark';

type Props = {
    isPassCredit: boolean | undefined;
    isPassGradePointAverage: boolean | undefined;
}

const CheckResultRule: FC<Props> = ({ isPassCredit, isPassGradePointAverage }) => {
    return (
        <>
            <h2>結果 <CheckMark result={isPassCredit === undefined || isPassGradePointAverage === undefined ? undefined : isPassCredit && isPassGradePointAverage ? true : false} /></h2>
        </>
    );
};

export default CheckResultRule;
