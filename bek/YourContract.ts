import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { IntellectualPropertyRegistry } from "../typechain-types";

describe("IntellectualPropertyRegistry", function () {
  let registry: IntellectualPropertyRegistry;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory("IntellectualPropertyRegistry");
    registry = await contractFactory.deploy();
  });

  it("Должен зарегистрировать новую работу", async function () {
    const workHash = "0xabc123";

    await registry.addWork(workHash);
    const work = await registry.checkWork(workHash);

    expect(work[0]).to.equal(owner.address);
  });

  it("Не должен регистрировать одну и ту же работу дважды", async function () {
    const workHash = "0xabc123";

    await registry.addWork(workHash);
    await expect(registry.addWork(workHash)).to.be.revertedWith("This work is already registered");
  });

  it("Должен отклонить регистрацию с пустым хэшем", async function () {
    await expect(registry.addWork("")).to.be.revertedWith("Work hash cannot be empty");
  });

  it("Должен подтвердить существующую работу", async function () {
    const workHash = "0xabc123";

    await registry.addWork(workHash);
    const work = await registry.checkWork(workHash);

    expect(work[0]).to.equal(owner.address);
  });

  it("Должен отклонить проверку незарегистрированной работы", async function () {
    const workHash = "0xdef456";

    await expect(registry.checkWork(workHash)).to.be.revertedWith("This work is not registered");
  });

  it("Должен передать права новому владельцу", async function () {
    const workHash = "0xabc123";

    await registry.addWork(workHash);
    await registry.transferRights(workHash, addr1.address);

    const work = await registry.checkWork(workHash);
    expect(work[0]).to.equal(addr1.address);
  });

  it("Должен отклонить передачу прав, если вызывающий не является владельцем", async function () {
    const workHash = "0xabc123";

    await registry.addWork(workHash);
    await expect(registry.connect(addr1).transferRights(workHash, addr2.address)).to.be.revertedWith(
      "Only the owner can transfer rights",
    );
  });

  it("Должен отклонить передачу прав на нулевой адрес", async function () {
    const workHash = "0xabc123";

    await registry.addWork(workHash);
    await expect(registry.transferRights(workHash, ethers.ZeroAddress)).to.be.revertedWith(
      "New owner cannot be the zero address",
    );
  });
});
