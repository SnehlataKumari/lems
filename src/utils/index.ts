export const success = async (message = 'Success', data: any) => {
  return ({
    message,
    data: await data,
  })
};

// export const generateOTP = () => Math.floor(1000 + Math.random() * 9000);
export const generateOTP = () => 1234;