import { FC } from 'react';
import CheckMark, { Result } from './CheckMark';

type Props = {
    creditResult: Result;
    gradePointAverageResult: Result;
}

const CheckResultView: FC<Props> = ({ creditResult, gradePointAverageResult }) => {

    return (
        <>
            <h2>結果 <CheckMark result={Math.max(creditResult, gradePointAverageResult)} /></h2>
        </>
    );
};

export default CheckResultView;
