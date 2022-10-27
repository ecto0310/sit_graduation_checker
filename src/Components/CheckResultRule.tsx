
import { FC } from 'react';

type Props = {
    isPassCredit: boolean | undefined;
    isPassGradePointAverage: boolean | undefined;
}

export const resultView = (result: boolean | undefined): string => {
    return result === undefined ? "unknown" : result ? "OK" : "NG";
}


const CheckResultRule: FC<Props> = ({ isPassCredit, isPassGradePointAverage }) => {
    return (
        <>
            <h2>結果 {resultView(isPassCredit === undefined || isPassGradePointAverage === undefined ? undefined : isPassCredit && isPassGradePointAverage ? true : false)}</h2>
        </>
    );
};

export default CheckResultRule;
