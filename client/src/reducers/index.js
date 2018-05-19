import { SHOW_COMMENT_FORM, GET_POST_DATA, GET_COMMENT_DATA, GET_POST_DETAIL, CLEAR_POST_DETAIL, SORT_POST_LISTING, LOAD_CATEGORIES } from '../actions';

const initialState = {
    post: {},
    comments: [],
    sortByKey: 'all',
    categories: [],
    commentId: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SHOW_COMMENT_FORM:
            return {
                ...state,
                commentId: action.commentId
            };
        case LOAD_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case SORT_POST_LISTING:
            return {
                ...state,
                sortByKey: action.key
            };
        case GET_POST_DETAIL:
            return {
                ...state,
                post: action.post,
                comments: action.comments
            };
        case CLEAR_POST_DETAIL:
            return {
                ...state,
                post: {},
                comments: []
            }
        case GET_POST_DATA:
            return {
                ...state,
                post: action.payload
            };
        case GET_COMMENT_DATA:
            return {
                ...state,
                comments: action.payload
            };
        default:
            return state;
    }
}