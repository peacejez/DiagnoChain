const { expect } = require('chai');

describe('DiagnosisRegistry', function () {
  it('should add and count records', async function () {
    const Registry = await ethers.getContractFactory('DiagnosisRegistry');
    const registry = await Registry.deploy();
    await registry.waitForDeployment();

    await registry.addRecord('Flu', 'hash123');
    await registry.addRecord('Migraine', 'hash456');

    expect(await registry.count()).to.equal(2n);
  });
});
