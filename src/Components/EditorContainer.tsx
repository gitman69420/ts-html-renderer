import { Controlled as ControlledEditor } from "react-codemirror2";
import React from "react";
import './styles.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/lib/codemirror.css';
import { useState } from "react";

const defaultTabStyle = {
    height: "1.5rem",
    minWidth: "fit-content",
    maxWidth: "6rem",
    border: "2px solid white",
    margin: "0"
}

const openTabStyle = {
    ...defaultTabStyle,
    backgroundColor: "#4858b8",
}

const closeTabStyle = {
    ...defaultTabStyle,
    backgroundColor: "#040d42"
}

export const EditorContainer = (): JSX.Element => {
    const [content, setContent] = React.useState({
        html: '',
        js: '',
        css: '',
    });

    const [doc, setDoc] = useState(``);

    const [listOfFiles, setList] = React.useState(["index.html", "index.js", "index.css"]);

    const [currentFile, setCurrentFile] = React.useState(listOfFiles[0]);

    const FileTab = ({ key, currentFile, fileName }: { key: number, currentFile: string, fileName: string }): JSX.Element => {

        const [isOpen, setOpen] = React.useState(fileName === currentFile);

        return <>
            <div style={isOpen ? openTabStyle : closeTabStyle} onClick={() => { setOpen(true); setCurrentFile(fileName); }}>
                <p style={{ color: "white", font: "arial", margin: "0", textAlign: "center", padding: "0 1rem" }}>
                    {`${fileName}`}
                </p>
            </div>
        </>;
    }

    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            setDoc(`<html>
            <style>${content.css}</style>
            <script>${content.js}</script>
            <body>${content.html}</body>
        </html>`)
        }, 500);

        return ()=>{clearTimeout(timeOut);}
    }, [content]);

    return <>
        <div className="editor-container">
            <div className="editor-title">
                <div className="tab-holder" style={{ display: "flex" }}>
                    <FileTab key={0} currentFile={currentFile} fileName={"index.html"} />
                    <FileTab key={1} currentFile={currentFile} fileName={"index.js"} />
                    <FileTab key={2} currentFile={currentFile} fileName={"index.css"} />
                </div>
            </div>
        </div>

        <ControlledEditor
            className="code-mirror-wrapper"
            options={{
                theme: 'blackboard',
                mode: (currentFile.split('.')[1] === 'html') ? 'xml' : (currentFile.split('.')[1] === 'js') ? 'javascript' : 'css',
                lineWrapping: true,
                lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
                setContent({ ...content, [currentFile.split('.')[1]]: value });
            }}
            onChange={(editor, data, value) => {
            }}
            value={
                (currentFile.split('.')[1] === 'html') ? content.html : (currentFile.split('.')[1] === 'js' ? content.js : content.css)
            }
        />

        <iframe
            srcDoc={doc}
            title="Output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            style={{backgroundColor:"white"}}
        />

    </>;
}