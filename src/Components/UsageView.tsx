import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

const UsageView = () => {
    const [studentNumber, setStudentNumber] = useState<string>();
    const [exporterScript, setexporterScript] = useState<string>();
    const target = useRef(null);
    const [show, setShow] = useState(false);

    fetch(process.env.PUBLIC_URL + "/exporter.js")
        .then((res) => res.text())
        .then((text) => {
            setexporterScript(text);
        });

    const copyScript = () => {
        navigator.clipboard.writeText(exporterScript || "");
        setShow(!show);
        setTimeout(() => setShow(false), 1000);
    };

    return (
        <>
            <h2>使い方</h2>
            <ol>
                <li>
                    下記に学籍番号(アルファベットは小文字)を入力して移動ボタンを押しS*gsotの「現在までに履修している科目」のページに移動します
                </li>
                <InputGroup className="mb-3">
                    <Form.Control placeholder="学籍番号" onChange={(e) => setStudentNumber(e.target.value)} />
                    <a href={"https://sgsot4a.sic.shibaura-it.ac.jp/Sgsot/html/Study.html.var?uid=" + studentNumber} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary">移動</Button>
                    </a>
                </InputGroup>
                <li>
                    下記のスクリプトをデベロッパーツールのコンソールで実行し，単位情報のjsonを取得します．
                </li>

                <Button ref={target} onClick={() => copyScript()}>
                    コピー
                </Button>
                <Overlay target={target.current} show={show} placement="right">
                    {(props) => (
                        <Tooltip {...props}>
                            クリップボードにコピーしました
                        </Tooltip>
                    )}
                </Overlay>
                <div className="border">
                    <code>{exporterScript}</code>
                </div>

                <li>
                    トップページにて，判定条件を選択肢，取得したjsonファイルを読み込ませます．
                </li>
            </ol>
        </>
    );
};

export default UsageView;
