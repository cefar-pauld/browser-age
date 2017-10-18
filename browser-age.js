/* global require */
const chrono = require('chrono-node'),
    forOwn = require('for-own'),
    fs = require('fs'),
    moment = require('moment');

const browsers = JSON.parse(fs.readFileSync('browsers.json')),
    data = JSON.parse(fs.readFileSync('data.json'));

function getVersionForDate(browser, date) {
    var closest = null;
    var match = null;

    forOwn(data[browser], function(m_value, m_key) {
        var mm = moment(m_key);
        if (mm.isBefore(date) && (!closest || closest.isBefore(mm))) {
            closest = mm;
            match = m_value;
        }
    });

    return match;
}

module.exports = {
    since: function(desc) {
        const date = chrono.parseDate(desc);
        if (date === null) {
            throw new RangeError('Invalid date description');
        }

        var result = {};
        forOwn(data, function(_, browser) {
            var version = getVersionForDate(browser, date);
            if (version) {
                result[browser] = version;
            }
        });

        return result;
    }
};
