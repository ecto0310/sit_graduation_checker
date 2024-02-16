import { Credits } from "../../../interfaces/Credits";
import { CreditInfo } from "../../../interfaces/Rules/Rules";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { days } from "../../../interfaces/TimeTables";

type TableProps = {
  semester: string;
  credits: Credits;
  setCredits: (credits: Credits) => void;
  creditInfo: CreditInfo;
  setTime: (time: string) => void;
  setModalShow: (show: boolean) => void;
};

const TimeTableTable = ({
  semester,
  credits,
  setCredits,
  creditInfo,
  setTime,
  setModalShow,
}: TableProps) => {
  const getCreditIndexs = (semester: string): number[] => {
    let indexs: number[] = [];
    credits.credits.forEach((credit, index) => {
      if (credit.semester == semester && !days.includes(credit.day)) {
        indexs.push(index);
      }
    });
    return indexs;
  };

  const creditIndexs = getCreditIndexs(semester);

  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>系列</th>
            <th>区分</th>
            <th>科目名</th>
            <th>単位数</th>
            <th>評価</th>
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          {creditIndexs.map((creditIndex, index) => {
            const credit = credits.credits[creditIndex];
            return (
              <tr key={index}>
                <td>{credit.group}</td>
                <td>{credit.division}</td>
                <td>{credit.name}</td>
                <td>{credit.count}</td>
                <td>{credit.grade}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      credits.credits[creditIndex] = {
                        ...credits.credits[creditIndex],
                        semester: "",
                        day: "",
                        time: "",
                      };
                      setCredits({ ...credits, credits: credits.credits });
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </td>
              </tr>
            );
          })}
          <tr>
            {
              <>
                <td colSpan={5}></td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setTime("");
                      setModalShow(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlusSquare} />
                  </Button>
                </td>
              </>
            }
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TimeTableTable;
