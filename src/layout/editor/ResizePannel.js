import React, { useState, useRef } from 'react';

const ResizePannel = ({leftPannel, rightPannel}) => {
    const editorContainer = useRef(null);
    const [drag, setDrag] = useState(false);
    const [width, setWidth] = useState(50);

    const handleDrag = (state) => setDrag(state);

    const handleMouseMove = (ev) => {
        if (drag) {
            ev.stopPropagation();
            ev.preventDefault();
            const container = editorContainer.current;
            const bounds = container.getBoundingClientRect();
            const totalWidth = container.clientWidth;
            const partialWidth = ev.clientX - bounds.left + 4;
            setWidth(100 - (100 * partialWidth) / totalWidth);
        }
    };
    return (
        <div className="editor-resize-container" ref={editorContainer}>
            <div className="editor-pannel-grow">{leftPannel}</div>
            <div
                className="editor-pannel-separator"
                role="button"
                tabIndex={0}
                onMouseMove={(ev) => handleMouseMove(ev)}
                onMouseDown={() => handleDrag(true)}
                onMouseUp={() => handleDrag(false)}
            >
                <div className="editor-pannel-handle" />
            </div>
            <div className="editor-pannel-resizable" style={{ width: `${width}%` }}>
                {rightPannel}
            </div>
        </div>
    );
};

export default ResizePannel;
