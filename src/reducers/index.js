import {SHOW_COMMENT_FORM} from './actions'
 
const initialState = {

}
 
function comment(state = initialState, action) {
    switch (action.type) {
        case SHOW_COMMENT_FORM:
            return state;
        default:
          return state;
    }
}