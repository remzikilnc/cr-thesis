import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from "@/components/admin/card";

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
        src: `${window.location.origin}/${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${
            height * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function ProductImageList({imageData}) {
    return (
        <Card>
            <ImageList
                sx={{
                    width: 500,
                    height: 900,
                    transform: 'translateZ(0)',
                }}
                rowHeight={200}
                gap={1}
            >
                {imageData.map((item) => {
                    const cols = item.type === 'poster' ? 2 : 1;
                    const rows = item.type === 'poster' ? 2 : 1;

                    return (
                        <ImageListItem key={item.id} cols={cols} rows={rows}>
                            <img
                                {...srcset(item.url, 250, 200, rows, cols)}
                                alt={item.type}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{
                                    background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                                position="top"
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        </Card>
    );
}
