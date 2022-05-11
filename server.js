
const app = require('./app');
let listen = app.listen( process.env.PORT || 3000, () => {
    //app.listen( 3000, () => {
    //console.log("Express server listening on port %d in %s mode", listen.address().port, app.settings.env);
    console.log("Server listen");
})
// 3306
// 80
// 80000