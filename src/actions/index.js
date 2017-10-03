export const uploadImage = upload => ({
  type: 'UPLOAD_IMAGE',
  upload
});

export const uploadFailed = () => ({
  type: 'UPLOAD_FAILED'
});