import React from 'react';

import moment from 'moment';
import { Tooltip } from 'react-bootstrap';

export const upVote = (postId) => {
 //   console.log("UP VOTE: " + postId);
 //   alert('You voted!');
}

export const downVote = (postId) => {
    console.log("DOWN VOTE: " + postId);
//    alert('You voted!');
}

export const tooltip = (tip) => (
    <Tooltip id="tooltip">{tip}</Tooltip>
);

export const formatTimeStamp = (timestamp) => (
    moment(timestamp).format("MMMM Do YYYY")
);

export const calculatePhotoIdFromText = (textValue, maxId) => {
    let photoId = -1;
    if(textValue) {
        photoId = textValue.split('').reduce((accumulator, currentValue) => {
            return(accumulator += currentValue.charCodeAt(0));
        }, 0);

        if(photoId > maxId) {
            photoId = photoId % maxId;
        }
    }
    return photoId;
}

export const getPhotoLocation = (textValue, size) => {
    const photoId = calculatePhotoIdFromText(textValue, 1000);
    const photoLocation = `https://picsum.photos/${size}?image=${photoId}`;
    return photoLocation;
}

export const getUserPhotoLocation = (username) => {
    const photoId = calculatePhotoIdFromText(username, 99);

    let gender = 'men';
    if(photoId % 2 === 1) {
        gender = 'women';
    }

    const photoLocation = `https://randomuser.me/api/portraits/med/${gender}/${photoId}.jpg`;
    return photoLocation;
}