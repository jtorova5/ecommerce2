
const tesTer = (req, res) => {
    req.logger.fatal('Code again');
    req.logger.error('Something wrong with the code');
    req.logger.warning('Take care!');
    req.logger.info('Data error');
    req.logger.http('Connection error');
    req.logger.debug('Find error');
    res.json({});
};
  
module.exports = {tesTer};