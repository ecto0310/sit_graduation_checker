"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {
  Department,
  RuleFile,
  PresetRuleFiles,
  Year,
} from "../../interfaces/PresetRuleFiles";

const SelectRule = () => {
  const router = useRouter();

  const [presetRuleFiles, setPresetRuleFiles] = useState<PresetRuleFiles>();
  const [candidateYear, setCandidateYear] = useState<Year>();
  const [candidateDepartment, setCandidateDepartment] = useState<Department>();
  const [ruleFile, setRuleFile] = useState<RuleFile>();

  useEffect(() => {
    if (presetRuleFiles === undefined) {
      fetch("/rules.json")
        .then((response) => response.json())
        .then((data) => {
          setPresetRuleFiles(data);
        });
    }
  });

  const checkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/check?ruleFile=${ruleFile?.file}`);
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Col sm="2">
            <Form.Label>入学年度</Form.Label>
          </Col>
          <Col sm="10">
            <Form.Select
              onChange={(e) =>
                setCandidateYear(
                  presetRuleFiles!.years!.find((year) => {
                    return year.name == e.target.value;
                  }),
                )
              }
            >
              <option hidden>入学年度</option>
              {presetRuleFiles &&
                presetRuleFiles.years.map((year) => (
                  <option key={year.name} value={year.name}>
                    {year.name}
                  </option>
                ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm="2">
            <Form.Label>学部/学科</Form.Label>
          </Col>
          <Col sm="10">
            <Form.Select
              onChange={(e) =>
                setCandidateDepartment(
                  candidateYear?.departments.find((department) => {
                    return department.name == e.target.value;
                  }),
                )
              }
            >
              <option hidden>学部/学科</option>
              {candidateYear &&
                candidateYear.departments.map((department) => (
                  <option key={department.name} value={department.name}>
                    {department.name}
                  </option>
                ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm="2">
            <Form.Label>条件データ</Form.Label>
          </Col>
          <Col sm="10">
            <Form.Select
              onChange={(e) =>
                setRuleFile(
                  candidateDepartment?.ruleFiles.find((ruleFile) => {
                    return ruleFile.file == e.target.value;
                  }),
                )
              }
            >
              <option hidden>条件データ</option>
              {candidateDepartment &&
                candidateDepartment.ruleFiles.map((ruleFile) => (
                  <option key={ruleFile.file} value={ruleFile.file}>
                    {ruleFile.name}
                  </option>
                ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Button
            disabled={ruleFile === undefined}
            variant="primary"
            onClick={checkClick}
          >
            確認
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default SelectRule;
