"use client";

import MainTab from "@/components/Check/MainTab";
import SelectClass from "@/components/Check/SelectClass";
import SelectCredit from "@/components/Check/SelectCredit";
import { Credits, defaultCredits } from "@/interfaces/Credits";
import { Rules, defaultRules } from "@/interfaces/Rules/Rules";
import { Classes, defaultClasses } from "@/interfaces/TimeTables";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

const Page = () => {
  const searchParams = useSearchParams();

  const [credits, setCredits] = useState<Credits>(defaultCredits);
  const [rules, setRules] = useState<Rules>(defaultRules);
  const [mode, setMode] = useState<string>("check");
  const [classes, setClasses] = useState<Classes>(defaultClasses);

  useEffect(() => {
    if (searchParams.get("ruleFile") !== undefined && rules === defaultRules) {
      fetch("/rules/" + searchParams.get("ruleFile"))
        .then((response) => response.json())
        .then((data) => {
          setRules(data);
        });
    }
  });

  const saveCredits = (credits: Credits) => {
    sessionStorage.setItem("credit", JSON.stringify(credits));
    setCredits(credits);
  };

  return (
    <>
      <div className="h3">判定項目: {rules?.title || "読み込み中"}</div>
      <div>
        <SelectCredit credits={credits} setCredits={saveCredits} />
      </div>
      <div>
        <SelectClass classes={classes} setClasses={setClasses} />
      </div>
      <div>
        <Nav fill variant="tabs" className="mb-2">
          <Nav.Item>
            <Nav.Link
              disabled={rules === undefined}
              active={mode === "check"}
              onClick={(e) => setMode("check")}
            >
              要件チェック
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              disabled={credits === undefined}
              active={mode === "credit"}
              onClick={(e) => setMode("credit")}
            >
              単位状況
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              disabled={credits === undefined}
              active={mode === "timetable"}
              onClick={(e) => setMode("timetable")}
            >
              時間割
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <MainTab
          mode={mode}
          credits={credits}
          setCredits={saveCredits}
          rules={rules}
          classes={classes}
        />
      </div>
    </>
  );
};

export default Page;
