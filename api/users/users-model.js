const db = require('./../../data/db-config');

function find() {
  return db('users').select('user_id', 'username').orderBy('user_id')
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  return db('users').where(filter).orderBy('user_id');
}

function findById(user_id) {
  return db('users').select('user_id', 'username').where('user_id', user_id).first();
}

async function add(user) {
  const newId = await db('users').insert(user);
  return findById(newId);
}

module.exports = {
  find,
  findBy,
  findById,
  add
}
