import * as ReadableApi from '../utils/Api';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const GET_POST_DATA = 'GET_POST_DATA';
export const GET_POST_DETAIL = 'GET_POST_DETAIL';
export const CLEAR_POST_DETAIL = 'CLEAR_POST_DETAIL';
export const SORT_POST_LISTING = 'SORT_POST_LISTING';

export const SHOW_COMMENT_FORM = 'SHOW_COMMENT_FORM';
export const GET_COMMENT_DATA = 'GET_COMMENT_DATA';

export const loadCategories = () => (dispatch) => {
    ReadableApi.getCategories().then((categories) => {
        dispatch({ 
            type: LOAD_CATEGORIES,
            payload: categories
        });
    });
}

export const voteOnPost = (postId, direction) => async (dispatch) => {
    if(direction === 'up') {
        await ReadableApi.upVotePost(postId);
    }
    else {
        await ReadableApi.downVotePost(postId);
    }

    await ReadableApi.getPostById(postId).then((post) => {
        dispatch({ 
            type: GET_POST_DATA,
            payload: post
        });
    });
}

export const getPostDetail = (postId) => async (dispatch) => {
    let postDetail = {};
    let postComments = [];

    await ReadableApi.getPostById(postId).then((post) => {
        postDetail = post;
    });

    await ReadableApi.getCommentsByPostId(postId).then((comments) => {
        postComments = comments;
    });

    dispatch({ 
        type: GET_POST_DETAIL,
        post: postDetail,
        comments: postComments 
    });
}

export const clearPostDetail = () => (dispatch) => {
    dispatch({ 
        type: CLEAR_POST_DETAIL
    });
}

export const voteOnComment = (postId, commentId, direction) => async (dispatch) => {
    if(direction === 'up') {
        await ReadableApi.upVoteComment(commentId);
    }
    else {
        await ReadableApi.downVoteComment(commentId);
    }

    await ReadableApi.getCommentsByPostId(postId).then((comments) => {
        dispatch({ 
            type: GET_COMMENT_DATA,
            payload: comments 
        });
    });
}

export const showCommentForm = (commentId) => (dispatch) => {(
    dispatch({
        type: SHOW_COMMENT_FORM,
        commentId: commentId
    }));
}

export const addPost = (post) => (dispatch) => {
    ReadableApi.addPost(post).then((newPost) => {
        dispatch({ 
            type: GET_POST_DATA,
            payload: newPost 
        });
    });
}

export const updatePost = (post) => (dispatch) => {
    ReadableApi.updatePost(post).then((newPost) => {
        dispatch({ 
            type: GET_POST_DATA,
            payload: newPost 
        });        
    });
}

export const deletePost = (postId) => (dispatch) => {
    ReadableApi.deletePost(postId);
}

export const addComment = (postId, comment) => async (dispatch) => {
    await ReadableApi.addComment(comment);

    await ReadableApi.getCommentsByPostId(postId).then((comments) => {
        dispatch({ 
            type: GET_COMMENT_DATA,
            payload: comments 
        });
    });
}

export const updateComment = (postId, comment) => async (dispatch) => {
    await ReadableApi.updateComment(comment);

    await ReadableApi.getCommentsByPostId(postId).then((comments) => {
        dispatch({ 
            type: GET_COMMENT_DATA,
            payload: comments 
        });
    });
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
    await ReadableApi.deleteComment(commentId);

    await ReadableApi.getCommentsByPostId(postId).then((comments) => {
        dispatch({ 
            type: GET_COMMENT_DATA,
            payload: comments 
        });
    });
}

export const sortBy = (sortKey) => (dispatch) => {
    dispatch({
        type: SORT_POST_LISTING,
        key: sortKey
    });
}
