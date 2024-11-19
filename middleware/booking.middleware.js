const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../jwt.util");
const BOOKINGS_PERMS = require("../permissions/bookings.perms");
// create
function bookingCreationGuard(req, res, next) {
  try {
    if (req.headers["token"]) {
      const token = jwt.verify(req.headers["token"], SECRET_KEY);
      if (
        token &&
        BOOKINGS_PERMS["CREATE_BOOKINGS"].PERMITTED_ROLES.includes(
          token.role.toUpperCase()
        )
      ) {
        next();
      } else {
        return res.status(401).json({
          message: "operation is not permitted ",
        });
      }
    } else {
      return res.status(403).json({
        message: " token is missing ",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message,
      message: "Token expired",
    });
  }
}
// delete
function bookingDeletionGuard(req, res, next) {
  try {
    if (req.headers["token"]) {
      const token = jwt.verify(req.headers["token"], SECRET_KEY);
      if (
        token &&
        BOOKINGS_PERMS["DELETE_BOOKINGS"].PERMITTED_ROLES.includes(
          token.role.toUpperCase()
        )
      ) {
        next();
      } else {
        return res.status(401).json({
          message: "operation is not permitted ",
        });
      }
    } else {
      return res.status(403).json({
        message: " token is missing ",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message,
      message: "Token expired",
    });
  }
}
// read
function bookingReadAllGuard(req, res, next) {
  try {
    if (req.headers["token"]) {
      const token = jwt.verify(req.headers["token"], SECRET_KEY);
      if (
        token &&
        BOOKINGS_PERMS["READ_BOOKINGS"].PERMITTED_ROLES.includes(
          token.role.toUpperCase()
        )
      ) {
        next();
      } else {
        return res.status(401).json({
          message: "operation is not permitted ",
        });
      }
    } else {
      return res.status(403).json({
        message: " token is missing ",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message,
      message: "Token expired",
    });
  }
}
module.exports = {
  bookingCreationGuard,
  bookingDeletionGuard,
  bookingReadAllGuard,
};
