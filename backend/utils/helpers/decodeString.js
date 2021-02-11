const decodeString = (string) => {
    return string
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
  };

  module.exports = decodeString;