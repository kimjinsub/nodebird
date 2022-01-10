import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button type="primary" htmlType="submit">삐약</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.proptypes = {
  post: Proptypes.object.isRequired,
};

export default CommentForm;
