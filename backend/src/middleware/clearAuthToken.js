const clearAuthToken = (res) => {
    // res.clearCookie('token', {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'Strict',
    // });
};

module.exports = clearAuthToken;
