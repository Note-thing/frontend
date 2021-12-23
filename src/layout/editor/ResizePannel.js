import React, { useState } from 'react';

const ResizePannel = () => {
    const [drag, setDrag] = useState(false);
    const [width, setWidth] = useState(300);

    const handleDrag = (state) => {
        console.log('handleDrag', state);
        setDrag(state);
    };

    const handleMouseMove = (ev) => {
        if (drag) {
            console.log('handleMouseMove', ev);
        }
    };
    return (
        <div className="editor-resize-container">
            <div className="editor-pannel-grow">Grow</div>
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
            <div className="editor-pannel-resizable" style={{ width: `${width}px` }}>
                Resize
            </div>
        </div>
    );
};

export default ResizePannel;
