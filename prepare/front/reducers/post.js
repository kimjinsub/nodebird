import shortId from 'shortid';

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
                    id: shortId.generate(),
                    src: 'https://kimjinsub.github.io/meadowlark/public/img/logo.png'
                },
                {
                    id: shortId.generate(),
                    src: 'https://kimjinsub.github.io/meadowlark/public/img/logo.png'
                },
                {
                    id: shortId.generate(),
                    src: 'https://kimjinsub.github.io/meadowlark/public/img/logo.png'
                }
            ],
            Comments: [
                {
                    id: shortId.generate(),
                    User: {
                        nickname: 'nero',
                    },
                    content: 'hi'
                },
                {
                    id: shortId.generate(),
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
const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: 'kimjs'
    },
    Images: [],
    Comments: []
})
const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'kim.js'
    }
});
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: false,
                addPostError: null
            }
        case ADD_POST_SUCCESS:
            debugger;
            return {
                ...state,
                mainPosts: [dummyPost(action.data), ...state.mainPosts],
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
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null
            }
        case ADD_COMMENT_SUCCESS: {
            const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
            const post = { ...state.mainPosts[postIndex] };
            post.Comments = [dummyComment(action.data.content), ...post.Comments];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post;
            return {
                ...state,
                mainPosts,
                addCommentLoading: false,
                addCommentDone: true
            };
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