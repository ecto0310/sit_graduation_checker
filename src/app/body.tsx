"use client";

import { ReactNode, Suspense } from "react";
import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";
import Header from "./header";

interface BodyProps {
  children: ReactNode;
}

const Body = ({ children }: BodyProps) => {
  return (
    <>
      <Header />
      <Container>
        <Alert variant={"danger"} className="mt-1">
          判定結果は参考値です。万が一誤りがあった場合でも、製作者は一切責任を負いません。
        </Alert>

        <Suspense>{children}</Suspense>
      </Container>
    </>
  );
};

export default Body;
