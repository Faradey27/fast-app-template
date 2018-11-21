const NextRoutes = require('next-routes');

const routes = new NextRoutes();

routes.add('item', '/items/:itemId');

export const Link = routes.Link;
export default routes;
