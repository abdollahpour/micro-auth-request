/**
 * If path is "/monitor" Don't do anything just authentication headers will not pass to upstream
 */
module.exports = async (req, res) => {
    res.writeHead(200);
    res.end();
}