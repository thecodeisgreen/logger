## logger

Logger based on winston and winston-daily-rotate-file.

```
const logger = require("@thecodeisgreen/logger")

logger.info("saved", { data: { lastname: "Murray", firstname: "Bill" }});
logger.error("saved failed", { error: err.message });
```

### Env var
name             | description
-----------------|-------------
LOGGER_LOG_DIR   | log directory
LOGGER_MAX_SIZE  | check maxSize option in https://github.com/winstonjs/winston-daily-rotate-file#readme
LOGGER_MAX_FILES | check maxFiles option in https://github.com/winstonjs/winston-daily-rotate-file#readme

