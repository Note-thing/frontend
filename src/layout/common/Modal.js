import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};
/**
 * Basic modal
 * @param {Object} props open: boolean to control whether the modal is displayed,
 *                       onClose fn to close the modal
 *                       title: ...title of the modal
 *                       children: body of the modal
 */
export default function CustomModal({
    open, onClose, title, children, testid
}) {
    return (
        <Modal
            sx={{ minWidth: '700px' }}
            open={open}
            onClose={() => onClose(false)}
            data-testid={testid}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>

                {children}

            </Box>
        </Modal>
    );
}
