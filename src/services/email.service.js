'use strict';
const config = require('../config');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(config.sendgrindkey);

const ServiceEmail = () => {
    const service = {
        send: async (to, subject, body) => {
            sendgrid.send({
                to: to,
                from: 'cleyton@cgamadev.io',
                subject: subject,
                html: body
            });
        }
    }

    return service
}

module.exports = ServiceEmail