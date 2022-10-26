import { useState } from 'react';
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const Usage = () => {
    const [studentNumber, setStudentNumber] = useState<string>();
    return (
        <>
            <h2>使い方</h2>
            <ol>
                <li>下記に学籍番号(アルファベットは小文字)を入力して移動ボタンを押しS*gsotの「現在までに履修している科目」のページに移動します</li>
                <InputGroup className="mb-3">
                    <Form.Control placeholder="学籍番号" onChange={(e) => setStudentNumber(e.target.value)} />
                    <a href={"https://sgsot4a.sic.shibaura-it.ac.jp/Sgsot/html/Study.html.var?uid=" + studentNumber} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary">移動</Button>
                    </a>
                </InputGroup>
                <li>下記ボタンのリンク先のスクリプトをデベロッパーツールのコンソールで実行し，単位情報のjsonを取得します．</li>
                <a href={"/exporter.js"} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary">スクリプト</Button>
                </a>
                <li>トップページにて，判定条件を選択肢，取得したjsonファイルを読み込ませます．</li>
            </ol>
        </>
    );
};


export default Usage;
