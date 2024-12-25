import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployIntellectualPropertyRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre; // Получения объектов 'deployments' и 'getNamedAccounts' из среды выполнения
  const { deployer } = await getNamedAccounts(); // Получаем аккаунт, используемые для развертывания

  // Разворачиваем контракт "IntellectualPropertyRegistry" от имени деплоера с включенными логами
  await deployments.deploy("IntellectualPropertyRegistry", {
    from: deployer,
    log: true, // Включаем логирование процесса развертывания
  });
};

export default deployIntellectualPropertyRegistry;
