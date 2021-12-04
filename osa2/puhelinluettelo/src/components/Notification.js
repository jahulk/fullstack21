import React from 'react';

const Notification = ({ content, type }) => {
  if (content === null) {
    return null;
  }

  return <div className={type}>{content}</div>;
};

export default Notification;
