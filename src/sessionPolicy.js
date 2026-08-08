/**
 * Sport Sitters - Booking Chat Session Policy
 *
 * A small capstone-inspired module used to demonstrate automated testing
 * and continuous integration. The rule can be configured, but defaults
 * to 36 hours of inactivity before a session becomes inactive.
 */

const DEFAULT_INACTIVITY_HOURS = 36;

function assertValidDate(value, fieldName) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new TypeError(`${fieldName} must be a valid date/time`);
  }
  return date;
}

function getSessionStatus({
  lastMessageAt,
  now = new Date(),
  futureBookingDetected = false,
  inactivityHours = DEFAULT_INACTIVITY_HOURS
}) {
  const last = assertValidDate(lastMessageAt, "lastMessageAt");
  const current = assertValidDate(now, "now");

  if (!Number.isFinite(inactivityHours) || inactivityHours <= 0) {
    throw new RangeError("inactivityHours must be greater than 0");
  }

  const elapsedMs = current.getTime() - last.getTime();

  if (elapsedMs < 0) {
    throw new RangeError("lastMessageAt cannot be in the future");
  }

  // A future booking keeps the conversation relevant even if the normal
  // inactivity threshold has elapsed.
  if (futureBookingDetected) {
    return "active";
  }

  const elapsedHours = elapsedMs / (1000 * 60 * 60);
  return elapsedHours >= inactivityHours ? "inactive" : "active";
}

function hoursUntilInactive({
  lastMessageAt,
  now = new Date(),
  inactivityHours = DEFAULT_INACTIVITY_HOURS
}) {
  const last = assertValidDate(lastMessageAt, "lastMessageAt");
  const current = assertValidDate(now, "now");

  if (!Number.isFinite(inactivityHours) || inactivityHours <= 0) {
    throw new RangeError("inactivityHours must be greater than 0");
  }

  const elapsedHours = (current.getTime() - last.getTime()) / (1000 * 60 * 60);
  if (elapsedHours < 0) {
    throw new RangeError("lastMessageAt cannot be in the future");
  }

  return Math.max(0, inactivityHours - elapsedHours);
}

module.exports = {
  DEFAULT_INACTIVITY_HOURS,
  getSessionStatus,
  hoursUntilInactive
};
