
import { FC } from 'react';

type Props = {
    isPassCredit: boolean | undefined;
    isPassGradePointAverage: boolean | undefined;
}


const CheckResultRule: FC<Props> = ({ isPassCredit, isPassGradePointAverage }) => {
    return (
        <>
            <h2>結果</h2>
            {
                isPassCredit === undefined || isPassGradePointAverage === undefined ?
                    "unknown" :
                    isPassCredit && isPassGradePointAverage ?
                        "OK" :
                        "NG"
            }
        </>
    );
};

export default CheckResultRule;
