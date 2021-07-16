/* IMPORTS FROM LIBRARIES */
import { Controlled as ControlledEditor } from "react-codemirror2";
import React, { useState, useEffect } from "react";

/* IMPORTS FOR STYLES */
import './styles.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/lib/codemirror.css';

/* IMPORTS FOR COMPONENTS*/
import { FilePane } from "./FilePane";

/* STYLE OF FILE TABS */
const defaultTabStyle = {
    height: "1.5rem",
    minWidth: "fit-content",
    maxWidth: "6rem",
    borderWidth: "2px 0",
    borderColor: "white",
    borderStyle: "solid",
    margin: "0",
    display: "flex",
    alignItems: "center",
}

/* STYLE JSON OF OPENED TAB */
const openTabStyle = {
    ...defaultTabStyle,
    backgroundColor: "#040d42",
    borderBottom: "0"
}

/* STYLE JSON OF CLOSED TAB */
const closeTabStyle = {
    ...defaultTabStyle,
    backgroundColor: "#4858b8",
}

/* COMPONENT FOR ENTIRE APP */
export const EditorContainer = (): JSX.Element => {
    const [content, setContent] = useState({
        html: '',
        js: '',
        css: '',
    });

    /* STATE VARIABLE FOR RENDERING HTML, CSS AND JAVASCRIPT */
    const [doc, setDoc] = useState(``);

    /* ARRAY OF ALL FILES */
    const listOfAllFiles = ["index.html", "index.js", "index.css"];

    /* STATE VARIABLE TO STORE ALL OPEN FILES */
    const [listOfFiles, setList] = useState(["index.html"]);

    /* STATE VARIABLE FOR CHECKING WHAT THE CURRENT FILE IS */
    const [currentFile, setCurrentFile] = useState(listOfFiles[0]);

    /* COMPONENT FOR SINGULAR TAB FOR A FILE */
    const FileTab = ({ currentFile, fileName, closeTab }: { currentFile: string, fileName: string, closeTab: (fileName: string) => void }): JSX.Element => {

        const [isOpen, setOpen] = React.useState(fileName === currentFile);

        useEffect(() => {
            if (!(listOfFiles.includes(currentFile))) {
                setCurrentFile(listOfFiles[0]);
                console.log('triggered');
            }
        }, [listOfFiles]);

        return <>
            <div style={isOpen ? openTabStyle : closeTabStyle} onClick={() => { setOpen(true); setCurrentFile(fileName); }}>
                <p className="tab-file-name">
                    {`${fileName}`}
                </p>
                <button className="tab-close-button" onClick={() => { closeTab(fileName) }}>
                    X
                </button>
            </div>
        </>;
    }

    /* COMPONENT FOR SINGULAR FILE IN THE FILE PANE */
    const File = ({ fileName }: { fileName: string }) => {
        const fileClosedStyle = {
            backgroundColor: "red"
        }

        const openFile = () => {
            if (!(listOfFiles.includes(fileName))) {
                setList([...listOfFiles, fileName]);
            }
            setCurrentFile(fileName);
        }

        return <>
            <div className="file" style={(fileName in listOfFiles) ? fileClosedStyle : {}} onClick={openFile}>
                <p className="tab-file-name">{`${fileName}`}</p>
            </div>
        </>;
    }

    /* REDETTING DELAY FOR EVERY DOCUMENT VALUE CHANGE */
    const renderDelay = 250; //DELAY VALUE IN MILLISECONDS
    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            setDoc(`<html>
            <style>${content.css}</style>
            <script>${content.js}</script>
            <body>${content.html}</body>
        </html>`)
        }, renderDelay);

        return () => { clearTimeout(timeOut); }
    }, [content]);

    return <>
        <FilePane>
            {
                listOfAllFiles.map((item) => {
                    return <File fileName={item} />
                })
            }
        </FilePane>
        <div>
            <div className="editor-container">
                <div className="editor-title">
                    <div style={{ display: "flex" }}>
                        {listOfFiles.map((item) => {
                            return <FileTab currentFile={currentFile} fileName={item} closeTab={(namOfFile) => { if (listOfFiles.length !== 1) setList(listOfFiles.filter((name) => { return name !== namOfFile; })); else alert("You cannot close all the files"); }} />
                        })}
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
                    smartIndent:true,
                    indentWithTabs:true,
                    autocorrect:true,
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
                frameBorder="1px 0 0 1px"
                width="100%"
                height="60%"
                style={{ backgroundColor: "white" }}
            />
        </div>
    </>;
}