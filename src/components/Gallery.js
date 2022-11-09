import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ModalKuva from './ModalKuva';

const Gallery = (props) => {

    const [open, setOpen] = React.useState(false);
    const [kuva, setKuva] = React.useState('');

    const handleClickOpen = (src) => {
        setKuva(src);
        setOpen(true);  
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Box sx={{ width: 1152 }}>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {props.photos.map((item) => (
                        <ImageListItem key={item.urls.small}>
                            <img
                                src={`${item.urls.regular}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.urls.regular}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.alt_description}
                                loading="lazy"
                                onClick={ () => { handleClickOpen(item.urls.regular) }}      
                            />
                            <ImageListItemBar
                                title={item.description}
                                subtitle={item.user.name}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
            <ModalKuva kuva={kuva} handleClose={handleClose} open={open}/>
        </div>
    )
};

export default Gallery;
