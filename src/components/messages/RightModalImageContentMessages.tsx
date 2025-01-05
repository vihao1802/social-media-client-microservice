import {
  AddCircleOutline,
  FileDownloadOutlined,
  HistoryOutlined,
  RemoveCircleOutline,
} from '@mui/icons-material';
import { Box, IconButton, Modal } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface IModalImage {
  imgSrc: string;
  openModal: boolean;
  toggleModal: () => void;
}

const RightModalImageContentMessages = ({
  imgSrc,
  openModal,
  toggleModal,
}: IModalImage) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const handleZoomIn = () => {
    setScale((scale) => scale + 0.1);
  };

  const handleZoomOut = () => {
    setScale((scale) => scale - 0.1);
  };

  // Function to reset the position to the origin
  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  // Function to trigger the download of the image
  const downloadImage = async () => {
    const imageBlob = await fetch(imgSrc)
      .then((res) => res.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: 'image/*' }));

    const link = document.createElement('a');
    link.href = URL.createObjectURL(imageBlob);
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const image = imageRef.current;
    let isDragging = false;
    let prevPosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevPosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;
      prevPosition = { x: e.clientX, y: e.clientY };
      setPosition((position) => ({
        x: position.x + deltaX,
        y: position.y + deltaY,
      }));
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    image?.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      image?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [imageRef, scale]);

  return (
    <Modal
      open={openModal}
      onClose={() => {
        toggleModal();
        resetPosition();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            padding: '20px 30px',
            display: 'flex',
            gap: '10px',
          }}
        >
          <IconButton
            onClick={downloadImage}
            sx={{
              bgcolor: '#2B2B2B',
              color: 'white',
              padding: '2px',
              ':hover': {
                bgcolor: '#414141',
              },
            }}
          >
            <FileDownloadOutlined fontSize="large" sx={{ padding: '4px' }} />
          </IconButton>
          <IconButton
            onClick={resetPosition}
            sx={{
              bgcolor: '#2B2B2B',
              color: 'white',
              padding: '2px',
              ':hover': {
                bgcolor: '#414141',
              },
            }}
          >
            <HistoryOutlined fontSize="large" sx={{ padding: '4px' }} />
          </IconButton>

          <IconButton
            onClick={handleZoomIn}
            sx={{
              bgcolor: '#2B2B2B',
              color: 'white',
              padding: '2px',
              ':hover': {
                bgcolor: '#414141',
              },
            }}
          >
            <AddCircleOutline fontSize="large" sx={{ padding: '4px' }} />
          </IconButton>

          <IconButton
            onClick={handleZoomOut}
            sx={{
              bgcolor: '#2B2B2B',
              color: 'white',
              padding: '2px',
              ':hover': {
                bgcolor: '#414141',
              },
            }}
          >
            <RemoveCircleOutline fontSize="large" sx={{ padding: '4px' }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
            boxShadow: 18,
          }}
        >
          <img
            ref={imageRef}
            src={imgSrc}
            alt="Image"
            className="cursor-move "
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            }}
            draggable={false}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default RightModalImageContentMessages;
