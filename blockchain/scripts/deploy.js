const hre = require('hardhat');

async function main() {
  const Registry = await hre.ethers.getContractFactory('DiagnosisRegistry');
  const registry = await Registry.deploy();
  await registry.waitForDeployment();
  console.log('DiagnosisRegistry deployed to:', await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
