export const upload = (state = {}, action) => {
  switch (action.type) {
    case 'UPLOAD_IMAGE':
      console.log('upload image');
      return action.upload;
    case 'UPLOAD_FAILED':
      return { error: 'Upload failed.' }
    default:
      return state;
  }
};

export default upload;