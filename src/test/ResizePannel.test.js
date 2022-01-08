import React from 'react';
import {
    render, fireEvent, cleanup, act
} from '@testing-library/react';
import ResizePannel from '../layout/editor/ResizePannel';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: 'http://localhost/directory/1/note/1'
    })
}));

const stateChangeWait = () => new Promise((r) => setTimeout(r, 1000));
const pannelBounds = {
    width: 1000,
    height: 1000
};
const resizePannel = () => render(
    <ResizePannel
        rightWidth={50}
        leftPannel={
            <div>Left Pannel</div>
        }
        rightPannel={
            <div>Right Pannel</div>
        }
    />
);

describe('ResizePannel', () => {
    afterAll(() => {
        cleanup();
    });
    beforeEach(() => {
        Element.prototype.getBoundingClientRect = jest.fn(() => ({
            width: pannelBounds.width,
            height: pannelBounds.height,
            left: 0
        }));
    });
    it('ResizePannel | All layout components present', () => {
        const { container } = resizePannel();
        expect(container).toBeTruthy();
        expect(container.getElementsByClassName('pannel-resizable').length).toBe(2);
        expect(container.getElementsByClassName('pannel-separator').length).toBe(1);
        expect(container.getElementsByClassName('pannel-handle').length).toBe(1);
    });

    it('ResizePannel | Initial pannel width', async () => {
        const { container } = resizePannel();
        const [leftPannel, rightPannel] = container.getElementsByClassName('pannel-resizable');
        expect(getComputedStyle(leftPannel).width).toBe('50%');
        expect(getComputedStyle(rightPannel).width).toBe('50%');
    });

    it('ResizePannel | Resize normal smaller then', async () => {
        const { container } = resizePannel();
        const separator = container.getElementsByClassName('pannel-drag-handle')[0];
        const [leftPannel, rightPannel] = container.getElementsByClassName('pannel-resizable');
        expect(getComputedStyle(leftPannel).width).toBe('50%');
        expect(getComputedStyle(rightPannel).width).toBe('50%');
        await act(async () => {
            fireEvent.mouseDown(separator);
            /* Event Triggered -> handler called in ResizePannel -> state not updated. */
            await stateChangeWait();
            fireEvent.mouseMove(separator, {
                clientX: 300
            });
            await stateChangeWait();
            fireEvent.mouseUp(separator);
        });
        expect(getComputedStyle(leftPannel).width).toBe('30%');
        expect(getComputedStyle(rightPannel).width).toBe('70%');
    });

    it('ResizePannel | Resize normal bigger then', async () => {
        const { container } = resizePannel();
        const separator = container.getElementsByClassName('pannel-drag-handle')[0];
        const [leftPannel, rightPannel] = container.getElementsByClassName('pannel-resizable');
        expect(getComputedStyle(leftPannel).width).toBe('50%');
        expect(getComputedStyle(rightPannel).width).toBe('50%');
        await act(async () => {
            fireEvent.mouseDown(separator);
            /* Event Triggered -> handler called in ResizePannel -> state not updated. */
            await stateChangeWait();
            fireEvent.mouseMove(separator, {
                clientX: 700
            });
            await stateChangeWait();
            fireEvent.mouseUp(separator);
        });
        expect(getComputedStyle(leftPannel).width).toBe('70%');
        expect(getComputedStyle(rightPannel).width).toBe('30%');
    });

    it('ResizePannel | Resize full left', async () => {
        const { container } = resizePannel();
        const separator = container.getElementsByClassName('pannel-drag-handle')[0];
        const [leftPannel, rightPannel] = container.getElementsByClassName('pannel-resizable');
        expect(getComputedStyle(leftPannel).width).toBe('50%');
        expect(getComputedStyle(rightPannel).width).toBe('50%');
        await act(async () => {
            fireEvent.mouseDown(separator);
            await stateChangeWait();
            fireEvent.mouseMove(separator, {
                clientX: 0
            });
            await stateChangeWait();
            fireEvent.mouseUp(separator);
        });
        expect(getComputedStyle(leftPannel).width).toBe('0%');
        expect(getComputedStyle(rightPannel).width).toBe('100%');
    });

    it('ResizePannel | Resize full right', async () => {
        const { container } = resizePannel();
        const separator = container.getElementsByClassName('pannel-drag-handle')[0];
        const [leftPannel, rightPannel] = container.getElementsByClassName('pannel-resizable');
        expect(getComputedStyle(leftPannel).width).toBe('50%');
        expect(getComputedStyle(rightPannel).width).toBe('50%');
        await act(async () => {
            fireEvent.mouseDown(separator);
            await stateChangeWait();
            fireEvent.mouseMove(separator, {
                clientX: 1000
            });
            await stateChangeWait();
            fireEvent.mouseUp(separator);
        });
        expect(getComputedStyle(leftPannel).width).toBe('100%');
        expect(getComputedStyle(rightPannel).width).toBe('0%');
    });

    it('ResizePannel | Resize magnetic left', async () => {
        const { container } = resizePannel();
        const separator = container.getElementsByClassName('pannel-drag-handle')[0];
        const [leftPannel, rightPannel] = container.getElementsByClassName('pannel-resizable');
        expect(getComputedStyle(leftPannel).width).toBe('50%');
        expect(getComputedStyle(rightPannel).width).toBe('50%');
        await act(async () => {
            fireEvent.mouseDown(separator);
            await stateChangeWait();
            fireEvent.mouseMove(separator, {
                clientX: 200
            });
            await stateChangeWait();
            fireEvent.mouseUp(separator);
        });
        expect(getComputedStyle(leftPannel).width).toBe('0%');
        expect(getComputedStyle(rightPannel).width).toBe('100%');
    });

    it('ResizePannel | Resize magnetic right', async () => {
        const { container } = resizePannel();
        const separator = container.getElementsByClassName('pannel-drag-handle')[0];
        const [leftPannel, rightPannel] = container.getElementsByClassName('pannel-resizable');
        expect(getComputedStyle(leftPannel).width).toBe('50%');
        expect(getComputedStyle(rightPannel).width).toBe('50%');
        await act(async () => {
            fireEvent.mouseDown(separator);
            await stateChangeWait();
            fireEvent.mouseMove(separator, {
                clientX: 800
            });
            await stateChangeWait();
            fireEvent.mouseUp(separator);
        });
        expect(getComputedStyle(leftPannel).width).toBe('100%');
        expect(getComputedStyle(rightPannel).width).toBe('0%');
    });
});
