export const SHOW_COMMENT_FORM = 'SHOW_COMMENT_FORM';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELTE_COMMENT';

export const SHOW_POST_CONTENT_FORM = 'SHOW_POST_CONTENT_FORM';
export const ADD_POST_CONTENT = 'ADD_POST_CONTENT';
export const UPDATE_POST_CONTENT = 'UPDATE_POST_CONTENT';
export const DELETE_POST_CONTENT = 'DELETE_POST_CONTENT';

export function showCommentForm(commentId) {
    return { type: SHOW_COMMENT_FORM, commentId: commentId }
}

export function addComment(comment) {
    return { type: ADD_COMMENT,  comment: comment}
}

export function updateComment(comment) {
    return { type: UPDATE_COMMENT,  comment: comment}
}

export function deleteComment(commentId) {
    return { type: DELTE_COMMENT,  postId: commentId}
}

export function showPostCotentForm(postId) {
    return { type: SHOW_POST_CONTENT_FORM, postId: postId }
}

export function addPostCotent(post) {
    return { type: ADD_POST_CONTENT,  post: post}
}

export function updatePostCotent(post) {
    return { type: UPDATE_POST_CONTENT,  post: post}
}

export function deletePostCotent(postId) {
    return { type: DELTE_POST_CONTENT,  postId: postId}
}