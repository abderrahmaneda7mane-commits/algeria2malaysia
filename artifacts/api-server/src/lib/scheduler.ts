import { logger } from "./logger.js";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function startDailyJob(name: string, job: () => Promise<void>): void {
  const run = async () => {
    try {
      logger.info(`[scheduler] running job: ${name}`);
      await job();
      logger.info(`[scheduler] finished job: ${name}`);
    } catch (err) {
      logger.error({ err }, `[scheduler] job failed: ${name}`);
    }
  };

  run().then(() => {
    setInterval(() => { void run(); }, ONE_DAY_MS);
  });
}
