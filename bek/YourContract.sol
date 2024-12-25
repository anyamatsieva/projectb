// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IntellectualPropertyRegistry {
    // Структура данных
    struct Work {
        address creator; // Адрес создателя работы
        uint256 registeredAt; // Время регистрации работы
        string workHash; // Хэш работы
    }

    // Сопоставление хэша работы с ее данными
    mapping(string => Work) private registry;

    // Добавление новой работы в реестр
    function addWork(string memory _workHash) public {
        require(bytes(_workHash).length > 0, "Work hash cannot be empty"); // Хэш должен быть указан
        require(registry[_workHash].creator == address(0), "This work is already registered"); // Работа должна быть новой

        // Сохранение данных о работе
        registry[_workHash] = Work({
            creator: msg.sender,
            registeredAt: block.timestamp,
            workHash: _workHash
        });
    }

    // Проверка существования работы в реестре
    function checkWork(string memory _workHash) public view returns (address creator, uint256 registeredAt) {
        require(bytes(_workHash).length > 0, "Work hash cannot be empty"); // Хэш должен быть указан

        Work memory work = registry[_workHash]; // Получение данных о работе
        require(work.creator != address(0), "This work is not registered"); // Работа должна быть зарегистрирована

        return (work.creator, work.registeredAt); // Возвращение данных о работе
    }

    // Передача прав на работу
    function transferRights(string memory _workHash, address _newOwner) public {
        require(bytes(_workHash).length > 0, "Work hash cannot be empty"); // Хэш должен быть указан
        require(_newOwner != address(0), "New owner cannot be the zero address"); // Новый владелец должен быть указан

        Work storage work = registry[_workHash]; // Получение данных о работе
        require(work.creator != address(0), "This work is not registered"); // Работа должна быть зарегистрирована
        require(work.creator == msg.sender, "Only the owner can transfer rights"); // Только владелец может передавать права

        work.creator = _newOwner; // Изменение владельца
    }
}
