import React from 'react';

//import * as ReadableApi from './utils/Api';

import moment from 'moment';
import { Tooltip } from 'react-bootstrap';

export const tooltip = (tip) => (
    <Tooltip id="tooltip">{tip}</Tooltip>
);

export const formatTimeStamp = (timestamp) => (
    moment(timestamp).format("MMMM Do YYYY")
);

export const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const calculatePhotoIdFromText = (textValue, maxId) => {
    let photoId = 0;
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
    const photoId = calculatePhotoIdFromText2(textValue, 1000);
    const photoLocation = `https://picsum.photos/${size}?image=${photoId}`;
    return photoLocation;
}


export const calculatePhotoIdFromText2 = (textValue, maxId) => {
    let photoId = 0;
    if(textValue) {
        photoId = textValue.split('').reduce((accumulator, currentValue) => {
            return(accumulator += currentValue.charCodeAt(0));
        }, 0);

        if(photoId > maxId) {
            photoId = photoId % maxId;
        }

    //    const photoNotFound = ReadableApi.getPhotoLocation(photoId);
     //   console.log('photoNotFound['+photoNotFound+']');
        // if(photoNotFound) {
        //     photoId = testPhotoId(photoId+1);
        // }
    }
    return photoId;
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