// esta capa habla directamente con MongoDB

const Session = require("../../data-model/Session");
const crypto = require("crypto");

async function createSession(userId) {

  const token = crypto.randomBytes(32).toString("hex");

  return await Session.create({
    userId: userId,
    token: token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h
  });
}

async function getSessionByToken(token) {
  return await Session.findOne({ token });
}

async function deleteSession(token) {
  return await Session.findOneAndDelete({ token });
}

async function deleteSessionsByUser(userId) {
  return await Session.deleteMany({ userId });
}

module.exports = {
  createSession,
  getSessionByToken,
  deleteSession,
  deleteSessionsByUser
};