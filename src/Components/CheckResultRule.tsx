
import { FC } from 'react';

type Props = {
    isPassCredit: boolean;
    isPassGradePointAverage: boolean;
}


const CheckResultRule: FC<Props> = ({ isPassCredit, isPassGradePointAverage }) => {
    return (
        <>
            <h2>結果</h2>
            {isPassCredit && isPassGradePointAverage ? "OK" : "NG"}
        </>
    );
};

export default CheckResultRule;
