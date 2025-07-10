// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://a48859e69ecd6bd1f5ce716ffc8cb967@o4509643964809216.ingest.de.sentry.io/4509643981062224",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});