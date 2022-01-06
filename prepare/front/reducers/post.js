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
    postAdded: false
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
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
            return state;
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true
            }
        case ADD_POST_FAILURE:
            return state;
        default:
            return state;
    }
}

export default reducer;