import { ReactNode } from 'react';
import './FilePane.css';

export const FilePane = ({children}:{children:ReactNode}) => {
    return <>
        <div className="file-pane-body">
            <div className="file-pane-header">
                <span style={{marginLeft:"0.5rem"}}>Files</span> 
            </div>
            <div className="files-container">
            {children}
            </div>
        </div>
    </>
}