const R = require('ramda')
const winston = require('winston');
const { format } = winston;
const { combine, simple } = format;

require('winston-daily-rotate-file');

let logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.json()
  ),
  transports: [
    new (winston.transports.DailyRotateFile)({
      level: 'info',
      filename: '%DATE%.info.log',
      dirname: R.propOr('./logs', 'LOGGER_LOG_DIR', process.env),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: R.propOr('20m', 'LOGGER_MAX_SIZE', process.env),
      maxFiles: R.propOr('14d', 'LOGGER_MAX_FILES', process.env)
    }),
    new (winston.transports.DailyRotateFile)({
      level: 'error',
      filename: '%DATE%.error.log',
      dirname: R.propOr('./logs', 'LOGGER_LOG_DIR', process.env),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: R.propOr('20m', 'LOGGER_MAX_SIZE', process.env),
      maxFiles: R.propOr('14d', 'LOGGER_MAX_FILES', process.env)
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(
      simple()
    )
  }));
}

logger.on('logging', (transport, level, message, meta) => {
  if (meta.end && transport.sender && transport.sender.end) {
    transport.sender.end();
  }
});

module.exports = ({
  info: (message, meta = null) => logger.info(message, { meta }),
  error: (message, meta = null) => logger.error(message, { meta })
});