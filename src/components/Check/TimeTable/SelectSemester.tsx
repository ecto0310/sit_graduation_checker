import { Form } from "react-bootstrap";

type SelectSemesterProps = {
  selected_semester: string;
  setSemester: (credits: string) => void;
  startYear: number;
};

const SelectSemester = ({
  selected_semester,
  setSemester,
  startYear,
}: SelectSemesterProps) => {
  return (
    <>
      <Form.Select
        className="mb-1"
        value={selected_semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        {[...Array(16)]
          .map((v, k) => +k)
          .map((data, index) => {
            const year = startYear + Math.floor(data / 2) + "年度";
            const semester = data % 2 == 0 ? "前期" : "後期";
            return (
              <option key={index} value={year + semester}>
                {year + semester}
              </option>
            );
          })}
      </Form.Select>
    </>
  );
};

export default SelectSemester;
