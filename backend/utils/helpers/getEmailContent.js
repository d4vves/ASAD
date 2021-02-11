const getEmailContent = (config, emailId) => {
    let response;
    try {
      response = config.users.messages.get({
        userId: 'me',
        id: emailId
      })
    } catch(error) {
      throw new Error('The API returned an error: ' + error)
    }
    return response;
  };

  module.exports = getEmailContent;