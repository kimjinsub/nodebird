export const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: '제로초',
            },
            content: '첫 번째 게시글 #해시태그 #익스프레스',
            Images: [
                {
                    src: 'https://kimjinsub.github.io/meadowlark/public/img/logo.png'
                },
                {
                    src: 'https://kimjinsub.github.io/meadowlark/public/img/logo.png'
                },
                {
                    src: 'https://kimjinsub.github.io/meadowlark/public/img/logo.png'
                }
            ],
            Comments: [
                {
                    User: {
                        nickname: 'nero',
                    },
                    content: 'hi'
                },
                {
                    User: {
                        nickname: 'bero',
                    },
                    content: 'bye'
                }
            ]
        }
    ],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data
})
export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data
})
const dummyPost = {
    id: 2,
    content: 'dummy2',
    User: {
        id: 1,
        nickname: 'kimjs'
    },
    Images: [],
    Comments: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: false,
                addPostError: null
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true
            }
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error
            }
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: null
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: true
            }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error
            }
        default:
            return state;
    }
}

export default reducer;