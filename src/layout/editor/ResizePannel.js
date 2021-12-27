import React, {
    useState, useRef, useEffect, useMemo, useCallback
} from 'react';
import PropTypes from 'prop-types';

const ResizePannel = ({
    magneticMargin, leftPannel, rightPannel, rightWidth
}) => {
    const container = useRef(null);
    const separator = useRef(null);

    const [drag, setDrag] = useState(false);
    const [width, setWidth] = useState(rightWidth);

    useEffect(() => setWidth(rightWidth), [rightWidth]);

    const handleDrag = useCallback((state) => setDrag(state), [setDrag]);

    const handleMouseMove = useCallback((ev) => {
        if (drag) {
            const bounds = container.current.getBoundingClientRect();
            const totalWidth = bounds.width;
            const partialWidth = ev.clientX - bounds.left;
            const widthPercentage = 100 - (100 * partialWidth) / totalWidth;
            if (widthPercentage + magneticMargin >= 100) {
                setWidth(100);
            } else if (widthPercentage - magneticMargin <= 0) {
                setWidth(0);
            } else {
                setWidth(widthPercentage);
            }
        }
    }, [drag, container, magneticMargin, setWidth]);
    return useMemo(() => (
        <div className="resize-pannel-container" data-testid="resize-pannel" ref={container}>
            <div className={`pannel-resizable ${width === 100 ? ' magnetic' : ''}`} style={{ width: `${100 - width}%` }}>{leftPannel}</div>
            <div className="pannel-separator">
                <div
                    ref={separator}
                    className="pannel-drag-handle"
                    role="button"
                    tabIndex={0}
                    label="drag handle"
                    onMouseMove={(ev) => handleMouseMove(ev)}
                    onMouseDown={() => handleDrag(true)}
                    onMouseUp={() => handleDrag(false)}
                />
                <div className="pannel-handle" />
            </div>
            <div className={`pannel-resizable ${width === 0 ? ' magnetic' : ''}`} style={{ width: `${width}%` }}>
                {rightPannel}
            </div>
        </div>), [
        container, leftPannel, separator, rightPannel, width, handleMouseMove, handleDrag
    ]);
};

ResizePannel.defaultProps = {
    magneticMargin: 20,
    rightWidth: 50
};

ResizePannel.propTypes = {
    magneticMargin: PropTypes.number,
    leftPannel: PropTypes.element.isRequired,
    rightPannel: PropTypes.element.isRequired,
    rightWidth: PropTypes.number
};

export default ResizePannel;
