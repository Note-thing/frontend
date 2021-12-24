import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const ResizePannel = ({ leftPannel, rightPannel }) => {
    const container = useRef(null);
    const separator = useRef(null);

    const [drag, setDrag] = useState(false);
    const [width, setWidth] = useState(50);

    const handleDrag = (state) => setDrag(state);

    const handleMouseMove = (ev) => {
        if (drag) {
            ev.stopPropagation();
            ev.preventDefault();
            const bounds = container.current.getBoundingClientRect();
            const totalWidth = container.current.clientWidth;
            const partialWidth = ev.clientX - bounds.left + (separator.current.clientWidth / 2);
            setWidth(100 - (100 * partialWidth) / totalWidth);
        }
    };
    return (
        <div className="resize-pannel-container" ref={container}>
            <div className="pannel-grow">{leftPannel}</div>
            <div
                className="pannel-separator"
                ref={separator}
                role="button"
                tabIndex={0}
                onMouseMove={(ev) => handleMouseMove(ev)}
                onMouseDown={() => handleDrag(true)}
                onMouseUp={() => handleDrag(false)}
            >
                <div className="pannel-handle" />
            </div>
            <div className="pannel-resizable" style={{ width: `${width}%` }}>
                {rightPannel}
            </div>
        </div>
    );
};

ResizePannel.propTypes = {
    leftPannel: PropTypes.element.isRequired,
    rightPannel: PropTypes.element.isRequired
};

export default ResizePannel;
