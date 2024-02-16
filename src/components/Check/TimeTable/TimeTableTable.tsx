import { Credits } from "../../../interfaces/Credits";
import { CreditInfo } from "../../../interfaces/Rules/Rules";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { times } from "../../../interfaces/TimeTables";

type TableProps = {
  semester: string;
  day: string;
  credits: Credits;
  setCredits: (credits: Credits) => void;
  creditInfo: CreditInfo;
  setTime: (time: string) => void;
  setModalShow: (show: boolean) => void;
};

const TimeTableTable = ({
  semester,
  day,
  credits,
  setCredits,
  creditInfo,
  setTime,
  setModalShow,
}: TableProps) => {
  const getCreditIndexs = (
    semester: string,
    day: string,
    time: string,
  ): number[] => {
    let indexs: number[] = [];
    credits.credits.forEach((credit, index) => {
      if (
        credit.semester == semester &&
        credit.day == day &&
        credit.time == time
      ) {
        indexs.push(index);
      }
    });
    return indexs;
  };

  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>時限</th>
            <th>系列</th>
            <th>区分</th>
            <th>科目名</th>
            <th>単位数</th>
            <th>評価</th>
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          {times.map((time, index_time) => {
            const creditIndexs = getCreditIndexs(semester, day, time);
            const duplicate = 2 <= creditIndexs.length;
            if (creditIndexs.length == 0) {
              return (
                <tr key={index_time}>
                  <td>{time}</td>
                  <td colSpan={5}></td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setTime(time);
                        setModalShow(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPlusSquare} />
                    </Button>
                  </td>
                </tr>
              );
            }
            return creditIndexs.map((creditIndex, index_credit) => {
              const credit = credits.credits[creditIndex];
              return (
                <tr key={index_time + "-" + index_credit}>
                  <td className={duplicate ? "bg-danger" : ""}>{time}</td>
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
            });
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TimeTableTable;
