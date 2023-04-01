import { Modal, Box } from '@mui/material';
import { useState, forwardRef } from 'react';

interface PopoverProps {
    children: React.ReactNode;
    renderPopover: React.ReactElement;
}

const Popover = forwardRef(({ children, renderPopover }: PopoverProps, ref) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box onClick={handleOpen} ref={ref}>
                {children}
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {renderPopover}
            </Modal>
        </>
    );
});

export default Popover;
