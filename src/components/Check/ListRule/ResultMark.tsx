import {
  faCircleCheck,
  faCircleQuestion,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Result } from "../../../interfaces/Result";

type ResultMarkProps = {
  result: Result;
};

const ResultMark = ({ result }: ResultMarkProps) => {
  switch (result) {
    case "pass":
      return (
        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#198754" }} />
      );
    case "unknown":
      return (
        <FontAwesomeIcon icon={faCircleQuestion} style={{ color: "#ffc107" }} />
      );
  }
  return <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#dc3545" }} />;
};

export default ResultMark;
