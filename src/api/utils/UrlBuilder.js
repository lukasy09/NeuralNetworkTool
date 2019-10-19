const defaultHttpPort = 80;
const defaultHttpsPort = 443;
const secure = 'https';
const insecure = 'http';

/**
 * Building http/s URL from config e.g
 * e.g: {
 *  ssl: false,
 *  host: localhost,
 *  port: 8000,
 *  uri: objects/keras/train
 *  params: [{q: '2', 'p': 3}] => ?q=2&p=3
 * }
 * @TODO tests + params
 * @param config
 */
export const buildUrl = (config) => {
    // Reading input data
    const ssl = config.ssl;
    const host = config.host;
    const port = config.port ? config.port.toString() : (ssl ? defaultHttpsPort : defaultHttpPort);
    const uri = config.uri;
    //let params = config.params;
    const siteProtocol = ssl ? secure : insecure;
    return `${siteProtocol}://${host}:${port}/${uri}/`;
};

const stringifyParams = (params) => {

};