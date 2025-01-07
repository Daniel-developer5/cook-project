"use strict";
const serverless = require('serverless-http')

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../../dist/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(8080);

    const globalPrefix = '.netlify/functions/api';
    app.setGlobalPrefix(globalPrefix);
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverless(expressApp)
}
// bootstrap();
//# sourceMappingURL=main.js.map

export const handler = async (event, context, callback) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
};
  