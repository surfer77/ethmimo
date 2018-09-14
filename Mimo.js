const MimoStore = require('ethmimo-orbit');
const Web3 = require('web3');
const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

class Mimo {

  /**
   * Instantiates Mimo
   *
   * @param     {Web3}      web3          A web3 provider instance
   * @return    {Mimo}                    self
   */
  constructor(web3, ipfs) {
    if(!web3 instanceof Web3)) throw new Error('Web3 provider not provided');
    if(!(ipfs instanceof IPFS)) throw new Error('IPFS provider not provided');
    OrbitDB.addDatabaseType(MimoStore.type, MimoStore);
    this.orbitdb = new OrbitDB(ipfs);
    this.web3 = web3;
  }

  /**
   * Open an existing MimoStore
   *
   * @param     {String}      name         An ENS name
   * @return    {MimoStore}               The user instance for the given ENS name
   */
  async createProfile(name) {
    if (!(name instanceof String)) throw new Error('name must be a string');
    await this.orbitdb.create(name, MimoStore.type, {
      web3: this.web3,
      write: [*]
    });
  }

  /**
   * Open an existing MimoStore
   *
   * @param     {String}      name        An ENS name
   * @return    {MimoStore}               The user instance for the given ENS name
   */
  async openProfile(name) {
    if (!(name instanceof String)) throw new Error('name must be a string');
    this.web3.eth.ens.getMultihash(name).then(function (hash) {
      await orbitdb.open('/orbitdb/${hash}/${name}');
    });
  }

  /**
   * Save an existing MimoStore to the ENS resolver
   *
   * @param     {OrbitDB}     db           An OrbitDB instance
   * @param     {Web3Account} account      An Ethereum account
   */
  saveProfile(db, account) {
    if (!(db instanceof OrbitDB)) throw new Error('db must be an OrbitDB instance');
    let name = db.address.toString().substring(56);
    let hash = db.address.toString().substring(9, 55);
    this.web3.eth.ens.setMultihash(name, hash, { from: account });
  }

  /**
   * Get all logs in a MimoStore
   *
   * @param     {String}     name          An OrbitDB instance
   * @return    {Array}                    An array of JSON data
   */
  async getHistory(name) {
    if (!(name instanceof String)) throw new Error('name must be a string');
    await openProfile(name).then(db =>
      db.iterator()
      .collect()
      .map((e) => e.payload.value));
  }

  /**
   * Get all logs in a MimoStore
   *
   * @param     {OrbitDB}     db           An OrbitDB instance
   * @return    {Array}                    An array of JSON data
   */
  getHistory(db) {
    if (!(db instanceof OrbitDB)) throw new Error('db must be an OrbitDB instance');
    db.iterator()
      .collect()
      .map((e) => e.payload.value));
  }

}

module.exports = Mimo;
