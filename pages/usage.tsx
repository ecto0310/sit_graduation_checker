import Link from "next/link";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const UsagePage = () => {
    const [studentNumber, setStudentNumber] = useState<string>();

    return (
        <>
            <div>
                <h2>使い方</h2>
                <ol>
                    <li>
                        単位情報をS*gsotからエクスポートするにはTampermonkeyをインストールする必要があります。
                    </li>
                    <Link href="https://www.tampermonkey.net/" target="_blank" rel="noopener noreferrer"><Button variant="primary">Tampermonkey公式ページ</Button></Link>

                    <li>
                        エクスポート用のスクリプトをインストールします。
                    </li>
                    <Link href="https://github.com/ecto0310/sit_graduation_checker/raw/main/public/exporter.user.js" target="_blank" rel="noopener noreferrer"><Button variant="primary">エクスポート用スクリプト</Button></Link>
                    <li>
                        下記に学籍番号(アルファベットは小文字)を入力して移動ボタンを押しS*gsotの「現在までに履修している科目」のページに移動します。
                    </li>
                    <InputGroup className="mb-3">
                        <Form.Control placeholder="学籍番号" onChange={(e) => setStudentNumber(e.target.value)} />
                        <Link href={"https://sgsot4a.sic.shibaura-it.ac.jp/Sgsot/html/Study.html.var?uid=" + studentNumber} target="_blank" rel="noopener noreferrer">
                            <Button variant="primary">移動</Button>
                        </Link>
                    </InputGroup>
                    <li>
                        移動先のページの最下部の「単位情報を出力する(SIT Graduation Checker)」をクリックしてcredits.jsonをダウンロードします。
                    </li>
                    <li>
                        トップページにて条件データを選択し、移動先ページにてcredits.jsonを単位データとして読み込ませます。
                    </li>
                </ol>
            </div>
        </>
    )
}


export default UsagePage;
