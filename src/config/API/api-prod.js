const protocol = 'http';
const host = '192.168.10.106';
const port = '5003';
const trailUrl = 'api/v1';

const hostUrl = `${protocol}://${host}${port ? ':' + port : ''}/`;
// const endpoint = `${protocol}://${host}${(port ? ':' + port : '')}/${trailUrl}`;
const endpoint = ` http://87bd-117-99-107-240.ngrok.io/${trailUrl}`;


export default {
    protocol: protocol,
    host: host,
    port: port,
    apiUrl: trailUrl,
    endpoint: endpoint,
    hostUrl: hostUrl
};
