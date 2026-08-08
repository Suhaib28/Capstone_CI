const test = require("node:test");
const assert = require("node:assert/strict");

const {
  DEFAULT_INACTIVITY_HOURS,
  getSessionStatus,
  hoursUntilInactive
} = require("../src/sessionPolicy");

const NOW = "2026-08-08T12:00:00-07:00";

test("default inactivity threshold is 36 hours", () => {
  assert.equal(DEFAULT_INACTIVITY_HOURS, 36);
});

test("session remains active before the 36-hour threshold", () => {
  assert.equal(
    getSessionStatus({
      lastMessageAt: "2026-08-07T12:01:00-07:00",
      now: NOW
    }),
    "active"
  );
});

test("session becomes inactive at the configured threshold", () => {
  assert.equal(
    getSessionStatus({
      lastMessageAt: "2026-08-07T00:00:00-07:00",
      now: NOW
    }),
    "inactive"
  );
});

test("future booking keeps the chat active after normal inactivity", () => {
  assert.equal(
    getSessionStatus({
      lastMessageAt: "2026-08-05T12:00:00-07:00",
      now: NOW,
      futureBookingDetected: true
    }),
    "active"
  );
});

test("custom inactivity threshold is supported", () => {
  assert.equal(
    getSessionStatus({
      lastMessageAt: "2026-08-08T02:00:00-07:00",
      now: NOW,
      inactivityHours: 8
    }),
    "inactive"
  );
});

test("hoursUntilInactive returns remaining time", () => {
  assert.equal(
    hoursUntilInactive({
      lastMessageAt: "2026-08-08T02:00:00-07:00",
      now: NOW
    }),
    26
  );
});

test("invalid dates are rejected", () => {
  assert.throws(
    () => getSessionStatus({ lastMessageAt: "not-a-date", now: NOW }),
    /valid date/
  );
});

test("future last-message timestamps are rejected", () => {
  assert.throws(
    () =>
      getSessionStatus({
        lastMessageAt: "2026-08-09T12:00:00-07:00",
        now: NOW
      }),
    /future/
  );
});
